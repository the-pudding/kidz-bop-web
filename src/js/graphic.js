import matches from './lyrics';
import prepareSpan from './utils/prepare-span';
import categories from './categories';

/* global d3 */
function resize() { }

const $slides = d3.selectAll('.slide');
const $touch = d3.select('#touch');
const $fwdTapDiv = $touch.selectAll('#right');
const $bckTapDiv = $touch.selectAll('#left');
const $skipTapDiv = $touch.selectAll('#skipper');
const $categoryBars = d3.selectAll('.category-bar');
const $songCircles = d3.selectAll('.song-circle');
const $quizSlidesAll = $slides.filter((d, i, n) =>
  d3.select(n[i]).attr('data-quiz')
);
const $count = d3.selectAll('#count');
const $quizDetails = d3.select('.quiz-details');
const $catSection = d3.select('#categories');

let $lyricSpans = null;

let $currSlide = null;
let $currSlideID = null;
let $prevSlide = null;
let $nextSlide = null;
let $quizSlide = null;

function spanSetup() {
  // select all quiz slides then select the p element in each slide
  $quizSlidesAll.nodes().forEach(d => {
    const wrapper = d3.select(d).select('.lyric-wrapper p');
    // then convert them to spans
    prepareSpan.prepare(wrapper);
  });

  $lyricSpans = d3.selectAll('.lyric-wrapper span');
}

function updateSlideLocation() {
  // sets the current slide to whichever is visible
  $currSlide = d3.select('.is-visible-slide');
  // find the ID of the current slide
  $currSlideID = +$currSlide.attr('data-slide');
  // is the user on an answer slide in the quiz section?
  const answerSlide = $currSlideID >= 3 && ($currSlideID + 1) % 2 !== 0;
  // select the previous slide
  // if currently on an answer slide, go back 2
  $prevSlide = $slides.filter(
    (d, i, n) => d3.select(n[i]).attr('data-slide') === `${$currSlideID - 1}`
  );
  // select the global next slide
  $nextSlide = $slides.filter(
    (d, i, n) => d3.select(n[i]).attr('data-slide') === `${$currSlideID + 1}`
  );

  // hide/show category bars
  if ($currSlideID == 17) {
    d3.select('#categories').classed('is-visible', true);
  }

  if (answerSlide) {
    $quizSlide = $slides.filter(
      (d, i, n) => d3.select(n[i]).attr('data-slide') === `${$currSlideID - 1}`
    );
  }

  // update buttons
  updateButtons();
}

function slideSetup() {
  // create data attribute for each slide based on its index
  $slides.attr('data-slide', (d, i) => i + 1);
  updateSlideLocation();
}

function checkCensors(censoredIndeces) {
  // first, see if they censored everything on the previous slide
  const allWords = $quizSlide.selectAll('span');
  const allCensored = $quizSlide.selectAll('.censored');
  const currQuiz = $quizSlide.attr('data-quiz');

  // filter our pre-defined answers based on the current quiz id
  const thisMatch = matches.filter(d => d.quizID === +currQuiz)[0];

  // words the user didn't censor that should've been
  const missed = thisMatch.exact.filter(
    element => !censoredIndeces.includes(element)
  );

  // words the user DID censor that didn't need to be
  const extraCensored = censoredIndeces.filter(
    element => !thisMatch.exact.includes(element)
  );

  const selectedAll = allWords.size() === allCensored.size();

  const thisCircle = $songCircles.filter((d, i, n) => {
    return d3.select(n[i]).attr('data-quiz') === currQuiz;
  });

  // Game Logic: if all words are censored, wrong and stop there
  // Else, see if they got an exact match, if so, Winner!
  // Else, see if at least main word is censored, if so, that's good, give it to them
  // Otherwise, loser

  if (selectedAll) {
    thisCircle.classed('is-wrong', true).classed('is-correct', false);
  } else if (missed.length === 0 && extraCensored.length === 0) {
    // if they got an exact match, they win!
    thisCircle.classed('is-correct', true).classed('is-wrong', false);
  } else if (missed.length > 0 && censoredIndeces.includes(thisMatch.main)) {
    // if they missed some words, but still got the main one, correct
    thisCircle.classed('is-correct', true).classed('is-wrong', false);
  } else thisCircle.classed('is-wrong', true).classed('is-correct', false);
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

  // is this word already censored?
  const isCensored = word.classed('censored');

  // if so, make it uncensored, if not, censor it
  word.classed('censored', !isCensored);
}

function buttonSetup() {
  d3.selectAll('#left').classed('is-visible', false);
  d3.selectAll('#right').classed('solo', true);
}

function findTotalCorrect() {
  const correct = $quizDetails.selectAll('.is-correct');
  const correctCount = correct.size();
  d3.select('.correct-count').text(correctCount);
}

function updateButtons() {
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
  else if ($currSlide.attr('data-quiz')) $rightText.text('Submit');
  // if current slide is answer slide (and isn't #12), make it read Next Song
  else if ($currSlide.attr('data-answer') && $currSlideID !== 12)
    $rightText.text('Next Song');
  else if ($currSlideID === 12) $rightText.text('Show my results');
  else if ($currSlideID === 13) $rightText.text('Tell me more');

  // if on slide 2, this will evaluate to true, otherwise false
  $skipTapDiv.classed('is-visible', $currSlideID === 2);

  // toggling button visibility
  // if the current slide id is in the array, this should evaulate to true, otherwise false
  $left.classed('is-visible', [14, 15, 16].includes($currSlideID));
  $right.classed('is-visible', ![17, 18].includes($currSlideID));
  $right.classed('solo', $currSlideID <= 13);

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
  if ($currSlideID > 16) {
    console.log({ $touch });
    $touch.style('pointer-events', 'none');
  } else $touch.style('pointer-events', 'all');
}

function fwdTap() {
  console.log({ $currSlide });
  // is the current slide a quiz slide?
  const $currQuiz = $currSlide.attr('data-quiz');

  $currSlide.classed('is-visible-slide', false);
  $nextSlide.classed('is-visible-slide', true);

  // update current, previous, and next
  updateSlideLocation();

  // if the current slide is a quiz slide, evaluate answer on tap
  if ($currQuiz) {
    findCensored();
  }
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
  const allArrows = $categoryBars.selectAll('.button-wrapper');
  allArrows.on('click', function () {
    const button = d3.select(this);
    const dir = button.attr('data-direction');
    console.log({ dir });
    if (dir === 'back') handleCatBack(button);
    else if (dir === 'forward') {
      const parent = d3.select(this.parentNode);
      d3.event.stopPropagation();
      catTap(parent);
    }

    // update direction
    button.attr('data-direction', dir === 'back' ? 'forward' : 'back');
  });
}

function catTap(block) {
  console.log('catTap');
  const clickedCat = block.node();
  const currCat = block.classed('cat-chosen', true);
  const currBckText = currCat.select('.button-wrapper p');
  const currBckButton = currCat.select('.button-wrapper button');
  currBckText.classed('is-visible', true);
  const notCat = $categoryBars
    .filter(function findNotCat() {
      return this !== clickedCat;
    })
    .classed('not-chosen', true);

  const currPos = block.node().getBoundingClientRect();

  console.log({ currCat, notCat });
  notCat
    .transition()
    .duration(250)
    .delay((d, i) => i * 25)
    .ease(d3.easeLinear)
    .style('transform', 'translate(-100%)');

  currCat
    .transition()
    .duration(250)
    .delay(100)
    .ease(d3.easeLinear)
    .style('transform', `translate(0, -${currPos.top -70}px)`);

  currBckButton
    .transition()
    .duration(25)
    .delay(100)
    .ease(d3.easeLinear)
    .style('transform', `rotate(-180deg)`);

  // set the new direction to back
  currBckButton.attr('data-direction', 'back');

  // trigger a tap forward one slide
  fwdTap();

  // trigger a data update
  categories.filter(currCat.attr('data-cat'));

  // removes pointer events to allow for clicking on slide
  $catSection.style('pointer-events', 'none');
  currBckButton.style('pointer-events', 'all');
}

function init() {
  slideSetup();
  spanSetup();
  buttonSetup();
  setupArrowButton();
  $fwdTapDiv.on('click', fwdTap);
  $bckTapDiv.on('click', bckTap);
  $skipTapDiv.on('click', skipTap);
  $lyricSpans.on('click', spanCensor);
  // $categoryBars.on('click', function () {
  //   const block = d3.select(this);
  //   catTap(block);
  // });
}

export default { init, resize };
