import matches from './lyrics';
import prepareSpan from './utils/prepare-span';

/* global d3 */
function resize() { }

const $slides = d3.selectAll('.slide');
const $fwdTapDiv = d3.selectAll('#right');
const $bckTapDiv = d3.selectAll('#left');
const $songCircles = d3.selectAll('.song-circle');
let $lyricSpans = null;

let $currSlide = null;
let $currSlideID = null;
let $prevSlide = null;
let $nextSlide = null;

function spanSetup() {
  const $lyric1 = d3.select('#slide_3 .lyric-wrapper p');
  const $lyric2 = d3.select('#slide_4 .lyric-wrapper p');

  prepareSpan.prepare($lyric1);
  prepareSpan.prepare($lyric2);

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
  $prevSlide = $slides.filter((d, i, n) =>
    answerSlide
      ? d3.select(n[i]).attr('data-slide') === `${$currSlideID - 2}`
      : d3.select(n[i]).attr('data-slide') === `${$currSlideID - 1}`
  );
  // select the global next slide
  $nextSlide = $slides.filter(
    (d, i, n) => d3.select(n[i]).attr('data-slide') === `${$currSlideID + 1}`
  );
}

function slideSetup() {
  // create data attribute for each slide based on its index
  $slides.attr('data-slide', (d, i) => i + 1);
  updateSlideLocation();
}

function checkCensors(censoredIndeces) {
  // first, see if they censored everything on the previous slide
  const allWords = $prevSlide.selectAll('span');
  const allCensored = $prevSlide.selectAll('.censored');
  const currQuiz = $prevSlide.attr('data-quiz');

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
  const allCensored = $prevSlide.selectAll('.censored');

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

function fwdTap() {
  const $nextSlideID = $nextSlide.attr('data-slide');

  // is the current slide a quiz slide?
  const $currQuiz = $currSlide.attr('data-quiz');

  $currSlide.classed('is-visible-slide', false);
  $nextSlide.classed('is-visible-slide', true);

  if ($nextSlideID == 3) {
    d3.selectAll('#left').classed('is-visible', true);
    d3.selectAll('#right').classed('solo', false);
    d3.select('.quiz-details').classed('is-visible', true);
  }

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
  }

  if ($prevSlideID > 2 && $currSlideID % 2 !== 0) {
    let $currCount = d3.selectAll('#count').text();
    $currCount = parseInt($currCount) - 1;
    d3.selectAll('#count').text(`${$currCount}`);
  }

  // update current, previous, and next
  updateSlideLocation();
}

function init() {
  slideSetup();
  spanSetup();
  buttonSetup();
  $fwdTapDiv.on('click', fwdTap);
  $bckTapDiv.on('click', bckTap);
  $lyricSpans.on('click', spanCensor);
}

export default { init, resize };
