import matches from './lyrics';
import prepareSpan from './utils/prepare-span';

/* global d3 */
function resize() { }

const $slides = d3.selectAll('.slide');
const $fwdTapDiv = d3.selectAll('#right');
const $bckTapDiv = d3.selectAll('#left');
const $skipTapDiv = d3.selectAll('#skipper');
const $categoryBars = d3.selectAll('.category-bar');
const $songCircles = d3.selectAll('.song-circle');
const $quizSlidesAll = $slides.filter((d, i, n) =>
  d3.select(n[i]).attr('data-quiz')
);
const $quizDetails = d3.select('.quiz-details');

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

function updateButtons() {
  const $left = d3.selectAll('#left');
  const $right = d3.selectAll('#right');
  const $rightText = $right.select('button p');

  if ($currSlideID === 2) $rightText.text('Take the quiz');
  // if current slide is quiz slide, make it read Submit
  else if ($currSlide.attr('data-quiz')) $rightText.text('Submit');
  // if current slide is answer slide, make it read Next Song
  else if ($currSlide.attr('data-answer')) $rightText.text('Next Song');
  else if ($currSlideID === 12) $rightText.text('Show my results');
  else if ($currSlideID === 13) $rightText.text('Tell me more');

  // if on slide 2, this will evaluate to true, otherwise false
  $skipTapDiv.classed('is-visible', $currSlideID === 2);

  // toggling button visibility
  // if the current slide id is in the array, this should evaulate to true, otherwise false
  $left.classed('is-visible', [13, 14, 15].includes($currSlideID));
  $right.classed('is-visible', ![16, 17].includes($currSlideID));
  $right.classed('solo', $currSlideID < 13);

  // show quiz details on quiz and answer slides
  $quizDetails.classed(
    'is-visible',
    $currSlide.attr('data-quiz') || $currSlide.attr('data-answer')
  );
}

function fwdTap() {
  const $nextSlideID = $nextSlide.attr('data-slide');

  // is the current slide a quiz slide?
  const $currQuiz = $currSlide.attr('data-quiz');

  $currSlide.classed('is-visible-slide', false);
  $nextSlide.classed('is-visible-slide', true);

  // // selects the button text
  // const $buttonText = d3.select('#right button p');

  // changes button text
  // if ($nextSlideID == 2) {
  //   $buttonText.text('Take the quiz');
  // }
  // if (
  //   $nextSlideID == 3 ||
  //   $nextSlideID == 5 ||
  //   $nextSlideID == 7 ||
  //   $nextSlideID == 9 ||
  //   $nextSlideID == 11
  // ) {
  //   $buttonText.text('Submit');
  // }
  // if (
  //   $nextSlideID == 4 ||
  //   $nextSlideID == 6 ||
  //   $nextSlideID == 8 ||
  //   $nextSlideID == 10
  // ) {
  //   $buttonText.text('Next song');
  // }
  // if ($nextSlideID == 12) {
  //   $buttonText.text('Show my results');
  // }
  // if ($nextSlideID == 13) {
  //   $buttonText.text('Tell me more');
  // }

  // if ($nextSlideID == 2) {
  //   d3.select('#skipper').classed('is-visible', true);
  // }

  // if ($nextSlideID == 3) {
  //   d3.selectAll('#left').classed('is-visible', false);
  //   d3.selectAll('#right').classed('solo', true);
  //   d3.select('.quiz-details').classed('is-visible', true);
  //   d3.select('#skipper').classed('is-visible', false);
  // }

  // if ($nextSlideID == 14) {
  //   d3.selectAll('#left').classed('is-visible', true);
  //   d3.selectAll('#right').classed('solo', false);
  //   d3.select('.quiz-details').classed('is-visible', false);
  // }

  // if ($nextSlideID >= 17 || $currSlideID == 17) {
  //   d3.selectAll('#left').classed('is-visible', false);
  //   d3.selectAll('#right').classed('is-visible', false);
  // }

  if ($nextSlideID > 3 && $currSlideID % 2 == 0) {
    let $currCount = d3.selectAll('#count').text();
    $currCount = parseInt($currCount) + 1;
    d3.selectAll('#count').text(`${$currCount}`);
  }

  // update current, previous, and next
  updateSlideLocation();

  // if the current slide is a quiz slide, evaluate answer on tap
  if ($currQuiz) {
    findCensored();
  }
}

function bckTap() {
  const $prevSlideID = $prevSlide.attr('data-slide');

  $currSlide.classed('is-visible-slide', false);
  $prevSlide.classed('is-visible-slide', true);

  if ($prevSlideID == 1) {
    d3.selectAll('#left').classed('is-visible', false);
    d3.selectAll('#right').classed('solo', true);
    d3.select('.quiz-details').classed('is-visible', false);
  }
  if ($prevSlideID == 2) {
    d3.select('.quiz-details').classed('is-visible', false);
    d3.select('#skipper').classed('is-visible', true);
  }

  if ($prevSlideID > 2 && $currSlideID % 2 !== 0) {
    let $currCount = d3.selectAll('#count').text();
    $currCount = parseInt($currCount) - 1;
    d3.selectAll('#count').text(`${$currCount}`);
  }

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

function catTap() {
  const clickedCat = this;
  const currCat = d3.select(clickedCat).classed('cat-chosen', true);
  const notCat = d3
    .selectAll('.category-bar')
    .filter(function (d, i) {
      return this !== clickedCat;
    })
    .classed('not-chosen', true);

  const currPos = clickedCat.getBoundingClientRect();
  console.log(currPos.top, currPos.right, currPos.bottom, currPos.left);

  currCat
    .transition()
    .duration(500)
    .delay(100)
    .ease(d3.easeLinear)
    .style('transform', `translate(0, -${currPos.top}px)`);

  notCat
    .transition()
    .duration(250)
    .delay((d, i) => i * 25)
    .ease(d3.easeLinear)
    .style('transform', 'translate(-100%)');
}

function init() {
  slideSetup();
  spanSetup();
  buttonSetup();
  $fwdTapDiv.on('click', fwdTap);
  $bckTapDiv.on('click', bckTap);
  $skipTapDiv.on('click', skipTap);
  $lyricSpans.on('click', spanCensor);
  $categoryBars.on('click', catTap);
}

export default { init, resize };
