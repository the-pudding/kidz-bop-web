import prepareSpan from "./utils/prepare-span";

/* global d3 */
function resize() {}

const $fwdTapDiv = d3.selectAll('#right')
const $bckTapDiv = d3.selectAll('#left')
let $lyricSpans = null

function spanSetup() {
  const $lyric1 = d3.select('#slide_3 .lyric-wrapper p')
  const $lyric2 = d3.select('#slide_4 .lyric-wrapper p')

  prepareSpan.prepare($lyric1)
  prepareSpan.prepare($lyric2)

  $lyricSpans = d3.selectAll('.lyric-wrapper span')
}

function spanCensor() {
  console.log('clicked')
}

function buttonSetup() {
  d3.selectAll('#left').classed('is-visible', false)
  d3.selectAll('#right').classed('solo', true)
}

function fwdTap() {
  let $currSlide = d3.selectAll('.is-visible-slide')
  let $currSlideID = ($currSlide.node().id).split('_')[1]
  let $nextSlideID = parseInt($currSlideID) + 1
  let $nextSlide = d3.selectAll(`#slide_${$nextSlideID}`)

  $currSlide.classed('is-visible-slide', false)
  $nextSlide.classed('is-visible-slide', true)

  if ($nextSlideID == 3) {
    d3.selectAll('#left').classed('is-visible', true)
    d3.selectAll('#right').classed('solo', false)
  }

  console.log('fwd', $currSlideID, $nextSlideID)
}

function bckTap() {
  let $currSlide = d3.selectAll('.is-visible-slide')
  let $currSlideID = ($currSlide.node().id).split('_')[1]
  let $prevSlideID = parseInt($currSlideID) - 1
  let $prevSlide = d3.selectAll(`#slide_${$prevSlideID}`)

  $currSlide.classed('is-visible-slide', false)
  $prevSlide.classed('is-visible-slide', true)

  if ($prevSlideID == 1) {
    d3.selectAll('#left').classed('is-visible', false)
    d3.selectAll('#right').classed('solo', true)
  }
  console.log('bck', $currSlideID, $prevSlideID)
}

function init() {
  spanSetup()
  buttonSetup()
  $fwdTapDiv.on('click', fwdTap)
  $bckTapDiv.on('click', bckTap)
  $lyricSpans.on('click', spanCensor)
}

export default { init, resize };
