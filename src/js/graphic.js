import matches from './lyrics';
import prepareSpan from './utils/prepare-span';
import categories from './categories';
import percentages from './percentages';

/* global d3 */
function resize() {}

// SELECTIONS
const $slides = d3.selectAll('.slide');
const $methodOpen = d3.select('#method-button');
const $methodClose = d3.select('#method svg');
const $touch = d3.select('#touch');
const $fwdTapDiv = $touch.selectAll('#right');
const $bckTapDiv = $touch.selectAll('#left');
const $skipTapDiv = $touch.selectAll('#skipper');
const $beginTapDiv = $touch.selectAll('#begin');
const $categoryBars = d3.selectAll('.category-bar');
const $songCircles = d3.selectAll('.song-circle');
const $quizSlidesAll = $slides.filter((d, i, n) =>
  d3.select(n[i]).attr('data-quiz')
);
const $answerSlidesAll = $slides.filter((d, i, n) =>
  d3.select(n[i]).attr('data-answer')
);
const $count = d3.selectAll('#count');
const $quizDetails = d3.select('.quiz-details');
const $catSection = d3.select('#categories');
const $feedbackSentences = d3.selectAll('.quiz-feedback p');

let $lyricSpans = null;
let $currSlide = null;
let $currSlideID = null;
let $prevSlide = null;
let $nextSlide = null;
let $quizSlide = null;

// SETUP FUNCTIONS
function spanSetup() {
  // select all quiz slides then select the p element in each slide
  $quizSlidesAll.nodes().forEach(d => {
    const wrapper = d3.select(d).select('.lyric-wrapper p');
    // then convert them to spans
    prepareSpan.prepare(wrapper);
  });
  $lyricSpans = d3.selectAll('.lyric-wrapper span');
}

function spanHintSetup() {
  const firstQuizSlide = d3.selectAll('#slide_3');
  const firstLyrics = firstQuizSlide.selectAll('.lyric-wrapper p');
  const firstSpan = firstLyrics.selectAll('span');
  firstSpan.attr('class', function(d, i) { return i ? null : 'hintSpan';});
}

function slideSetup() {
  // create data attribute for each slide based on its index
  $slides.attr('data-slide', (d, i) => i + 1);
  updateSlideLocation();
}

function buttonSetup() {
  d3.selectAll('#left').classed('is-visible', false);
  d3.selectAll('#right').classed('solo', true);
}

function updateProgress(slideID) {
  const $progressBar = d3.selectAll('.progress-bar')
  const w = (slideID-1)/17 * 100
  $progressBar.style('width', `${w}%`)
}

// SLIDE UPDATE
function updateSlideLocation() {
  // sets the current slide to whichever is visible
  $currSlide = d3.select('.is-visible-slide');
  // find the ID of the current slide
  $currSlideID = +$currSlide.attr('data-slide');
  // is the user on an answer slide in the quiz section?
  const answerSlide = $currSlideID >= 3 && ($currSlideID + 1) % 2 !== 0;
  // select the previous slide
  // if currently on an answer slide, go back 2
  $prevSlide = $slides.filter((d, i, n) => d3.select(n[i]).attr('data-slide') === `${$currSlideID - 1}`);
  // select the global next slide
  $nextSlide = $slides.filter((d, i, n) => d3.select(n[i]).attr('data-slide') === `${$currSlideID + 1}`);

  // hide header
  if ($currSlideID == 1) {
    d3.select('header').classed('is-visible', true);
    d3.select('#right').classed('pulse', true);
  } else {
    d3.select('header').classed('is-visible', false);
    d3.select('#right').classed('pulse', false);
  }

  // hide/show category bars
  if ($currSlideID == 17) {
    $catSection.classed('is-visible', true).style('pointer-events', 'all');
    $categoryBars
      .classed('not-chosen', false)
      .classed('cat-chosen', false)
      .transition()
      .duration(250)
      .delay((d, i) => i * 25)
      .ease(d3.easeLinear)
      .style('transform', 'translate(0, 0)');
  } else if ($currSlideID < 17) { $catSection.classed('is-visible', false); }

  if (answerSlide) {
    $quizSlide = $slides.filter((d, i, n) => d3.select(n[i]).attr('data-slide') === `${$currSlideID - 1}`);
  }

  // update buttons
  updateButtons();

  // update progress bar
  updateProgress($currSlideID)
}

// QUIZ FUNCTIONALITY
function checkCensors(censoredIndeces) {
  // first, see if they censored everything on the previous slide
  const allWords = $quizSlide.selectAll('span');
  const allCensored = $quizSlide.selectAll('.censored');
  const currQuiz = $quizSlide.attr('data-quiz');

  // filter our pre-defined answers based on the current quiz id
  const thisMatch = matches.filter(d => d.quizID === +currQuiz)[0];

  // words the user didn't censor that should've been
  const missed = thisMatch.exact.filter(element => !censoredIndeces.includes(element));

  // words the user DID censor that didn't need to be
  const extraCensored = censoredIndeces.filter(element => !thisMatch.exact.includes(element));

  const selectedAll = allWords.size() === allCensored.size();

  const thisCircle = $songCircles.filter((d, i, n) => { return d3.select(n[i]).attr('data-quiz') === currQuiz; });

  const thisFeedbackSlide = d3.selectAll('.slide').filter((d, i, n) => { return d3.select(n[i]).attr('data-answer') === currQuiz; });

  const thisFeedbackSent = thisFeedbackSlide.selectAll('.compare-wrapper .quiz-feedback p');

  // were each of the main words censored?
  let mainWords = null;
  if (thisMatch.main) {
    mainWords = thisMatch.main.map(d => { return censoredIndeces.includes(d); });
  } else mainWords = ['true'];

  // add animations to feedback

  // Game Logic: if all words are censored, wrong and stop there
  // Else, see if they got an exact match, if so, Winner!
  // Else, see if at least main word is censored, if so, that's good, give it to them
  // Otherwise, loser

  if (selectedAll) {
    thisCircle.classed('is-wrong', true).classed('is-correct', false);
    thisFeedbackSent
      .classed('slide-in', true)
      .classed('is-wrong', true)
      .html(`<span>Whoa!</span><br> You can't censor it all.`);
  } else if (missed.length === 0 && extraCensored.length === 0) {
    // if they got an exact match, they win!
    thisCircle.classed('is-correct', true).classed('is-wrong', false);
    thisFeedbackSent
      .classed('slide-in', true)
      .classed('is-correct', true)
      .html(`<span>Correct!</span><br> Do you secretly have a Kidz Bop playlist?`);
  } else if (
    thisMatch.uncensored &&
    censoredIndeces.includes(thisMatch.uncensored)
  ) {
    // if they missed some words, but also censored one that you would expect to be censored (e.g., champagne)
    // but that wasn't censored in this instance, it's wrong.
    let wrongWord = d3.select(allWords.nodes()[thisMatch.uncensored]).text();
    wrongWord = wrongWord.replace(',','');

    thisCircle.classed('is-wrong', true).classed('is-correct', false);
    thisFeedbackSent
      .classed('slide-in', true)
      .classed('is-wrong', true)
      .html(`<span>Oops!</span><br> Kidz Bop didn't actually censor "${wrongWord}."`);
  } else if (missed.length > 0 && !mainWords.includes(false)) {
    // if they missed some words, but still got the main one, correct
    thisCircle.classed('is-correct', true).classed('is-wrong', false);
    thisFeedbackSent
      .classed('slide-in', true)
      .classed('is-correct', true)
      .html(`<span>This counts!</span><br> You found the main censored word.`);
  } else if (currQuiz == 3 && thisMatch.uncensored) {
    // if they censored anything that's not a 'bad word' in slide 3
    thisCircle.classed('is-wrong', true).classed('is-correct', false);
    thisFeedbackSent
      .classed('slide-in', true)
      .classed('is-wrong', true)
      .html(`<span>Oops!</span><br> Kidz Bop didn't actually censor anything here.`);
  } else {
    // it must be wrong
    thisCircle.classed('is-wrong', true).classed('is-correct', false);
    thisFeedbackSent
      .classed('slide-in', true)
      .classed('is-wrong', true)
      .html(`<span>Yikes!</span><br> This still needs a parental advisory label.`);
  }
}

function findCensored() {
  // select all censored spans
  const allCensored = $quizSlide.selectAll('.censored');

  // create empty array for all censored span indeces
  const censoredIndeces = [];

  // for each span that is censored, collect the index and push it to censoredIndeces
  allCensored.each(function pushIndeces() {
    const word = d3.select(this);
    const index = word.attr('data-index');
    censoredIndeces.push(+index);
  });

  checkCensors(censoredIndeces);
}

function spanCensor() {
  // select the word that was clicked
  const word = d3.select(this);

  // remove prompt
  $lyricSpans.classed('hintSpan', false);

  // is this word already censored?
  const isCensored = word.classed('censored');

  // if so, make it uncensored, if not, censor it
  word.classed('censored', !isCensored);
}

function findTotalCorrect() {
  const correct = $quizDetails.selectAll('.is-correct');
  const correctCount = correct.size();
  d3.select('.correct-count').text(correctCount);
  d3.select('.results-sentence').text(function() {
    if (correctCount <= 2) {
      return `Kids, earmuffs! Did you even really try?!`;
    }
    if (correctCount < 4 && correctCount > 2) {
      return `This might seem safe for the radio, but not for Kidz Bop.`;
    }
    return `The FCC has nothing on you!`;
  });
}

function updateButtons() {
  const $prompt = d3.selectAll('#prompt');
  const $left = d3.selectAll('#left');
  const $right = d3.selectAll('#right');
  const $rightText = $right.select('button p');
  // this will return true if a quiz or answer slide, and false if not
  const quizOrAnswer =
    $currSlide.attr('data-quiz') ||
    $currSlide.attr('data-answer') ||
    $currSlideID === 13;

  if ($currSlideID === 2) $rightText.text('Take the quiz');
  // if current slide is quiz slide, make it read Submit
  else if ($currSlide.attr('data-quiz')) $rightText.text(`I think I've got it`);
  // if current slide is answer slide (and isn't #12), make it read Next Song
  else if ($currSlide.attr('data-answer') && $currSlideID !== 12)
    $rightText.text('Next Song');
  else if ($currSlideID === 12) $rightText.text('Show my results');
  else if ($currSlideID === 13) $rightText.text('Tell me more');
  else if ($currSlideID === 1) $rightText.text(`Let's find out`);

  // if on slide 2, this will evaluate to true, otherwise false
  $skipTapDiv.classed('is-visible', [2].includes($currSlideID));
  $beginTapDiv.classed('is-visible', [18].includes($currSlideID));
  d3.selectAll('.bottom-fade').classed(
    'is-visible',
    [18].includes($currSlideID)
  );

  // toggling button visibility
  // if the current slide id is in the array, this should evaulate to true, otherwise false
  $left.classed('is-visible', [14, 15, 16, 18].includes($currSlideID));
  $right.classed('is-visible', ![17, 18].includes($currSlideID));
  $right.classed('solo', $currSlideID <= 13);
  $left.classed('solo', $currSlideID == 18);

  // show quiz details on quiz and answer slides
  $quizDetails.classed('is-visible', quizOrAnswer);

  // update count if on quiz slides
  if ($currSlide.attr('data-quiz')) {
    $count.text($currSlide.attr('data-quiz'));
  }

  // if on slide 12, count number of correct attempts
  if ($currSlideID === 13) {
    findTotalCorrect();
    $quizDetails.classed('total', true);
  }

  // if above slide 16, remove pointer events for touch
  if ($currSlideID > 16 && $currSlideID < 18) {
    $touch.style('pointer-events', 'none');
  } else $touch.style('pointer-events', 'all');
}

// TAPS
function fwdTap() {
  // is the current slide a quiz slide?
  const $currQuiz = $currSlide.attr('data-quiz');

  $currSlide.classed('is-visible-slide', false);
  $nextSlide.classed('is-visible-slide', true);

  // update current, previous, and next
  updateSlideLocation();

  // if the current slide is a quiz slide, evaluate answer on tap
  if ($currQuiz) { findCensored(); }
}

function methodOpen() {
  d3.select('#method').classed('is-visible', true)
  d3.selectAll('body').style('overflow', 'scroll')
}

function methodClose() {
  d3.select('#method').classed('is-visible', false)
  d3.selectAll('body').style('overflow', 'hidden')
}

function bckTap() {
  $currSlide.classed('is-visible-slide', false);
  $prevSlide.classed('is-visible-slide', true);

  // update current, previous, and next
  updateSlideLocation();
}

function skipTap() {
  // temporarily make all slides invisible
  $slides.classed('is-visible-slide', false);
  // select the first post-quiz slide and make it visible
  d3.select('[data-chart="bar"]').classed('is-visible-slide', true);
  // reset the current, previous, & next slides globally
  updateSlideLocation();
}

function beginTap() {
  // temporarily make all slides invisible
  $slides.classed('is-visible-slide', false);
  // select the first post-quiz slide and make it visible
  d3.select('#slide_1').classed('is-visible-slide', true);
  // reset the current, previous, & next slides globally
  updateSlideLocation();
  // resets quiz counting
  d3.selectAll('.censored').classed('censored', false);
  d3.selectAll('.song-circle').classed('is-wrong', false);
  d3.selectAll('.song-circle').classed('is-correct', false);
  d3.selectAll('.quiz-details').classed('total', false);
}

function handleCatBack(arrow) {
  const btnText = arrow.select('p');
  const direction = arrow.attr('data-direction');

  btnText.classed('is-visible', false);
  arrow
    .select('button')
    .transition()
    .duration(25)
    .delay(100)
    .ease(d3.easeLinear)
    .style('transform', `rotate(0deg)`);

  $categoryBars
    .classed('not-chosen', false)
    .classed('cat-chosen', false)
    .transition()
    .duration(250)
    .delay((d, i) => i * 25)
    .ease(d3.easeLinear)
    .style('transform', 'translate(0, 0)');

  // prevent catTap() from also being called
  if (direction === 'back') d3.event.stopPropagation();

  // arrow.attr('data-direction', 'forward');

  // trigger a tap back one slide
  bckTap();

  // adds pointer events back to section
  $catSection.style('pointer-events', 'all');
}

function setupArrowButton() {
  // const allArrows = $categoryBars.selectAll('.button-wrapper');
  const allArrows = $categoryBars;
  allArrows.on('click', function() {
    const bar = d3.select(this)
    const dir = bar.attr('data-cat')
    if (dir === 'back') handleCatBack(bar)
    else {
      catTap(bar);
    }
  });
}

function catTap(block) {
  const clickedCat = block.node().attr;
  const currCat = block.classed('cat-chosen', true);
  currCat.classed('not-chosen', false);
  const currBckText = currCat.select('.button-wrapper p');
  const currBckButton = currCat.select('.button-wrapper button');
  const notCat = d3.selectAll('.category-bar').filter(function() {
    return !this.classList.contains('cat-chosen');
  });

  notCat
    .transition()
    .duration(250)
    .delay((d, i) => i * 25)
    .ease(d3.easeLinear)
    .style('transform', 'translate(-100%)');

  currCat
    .transition()
    .duration(250)
    .delay(250)
    .ease(d3.easeLinear)
    .style('transform', 'translate(100%)');

  // replace category span on dropdown page
  const categoryAttr = currCat.node().getAttribute('data-cat');
  const categorySpan = d3.selectAll('#category-sent');
  categorySpan.text(function() {
    if (categoryAttr == 'alcohol') {
      return 'alcohol & drugs';
    }
    else if (categoryAttr == 'sexual') {
      return 'sexual references';
    }
    return categoryAttr;
  });
  categorySpan.attr('class', null);
  categorySpan.classed(`${categoryAttr}-sent`, true);

  // trigger a tap forward one slide
  fwdTap();

  // trigger a data update
  categories.filter(currCat.attr('data-cat'));

  // trigger the text to update
  const groupTextCat = categorySpan.text()
  percentages.populateGroupText(groupTextCat);

  // removes pointer events to allow for clicking on slide
  $catSection.style('pointer-events', 'none');
  currBckButton.style('pointer-events', 'all');
}

function init() {
  slideSetup();
  spanSetup();
  buttonSetup();
  setupArrowButton();
  spanHintSetup();
  $methodOpen.on('click', methodOpen)
  $methodClose.on('click', methodClose)
  d3.select('#method').on('click', methodClose)
  $fwdTapDiv.on('click', fwdTap);
  $bckTapDiv.on('click', bckTap);
  $skipTapDiv.on('click', skipTap);
  $beginTapDiv.on('click', beginTap);
  $lyricSpans.on('click', spanCensor);
}

export default { init, resize };
