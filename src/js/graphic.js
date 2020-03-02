/* global d3 */
function resize() {}

const $fwdTapDiv = d3.selectAll('#right')
const $bckTapDiv = d3.selectAll('#left')

function fwdTap() {
  console.log('fwd')
}

function bckTap() {
  console.log('bck')
}

function init() {
  console.log('checking')
  $fwdTapDiv.on('click', fwdTap)
  $bckTapDiv.on('click', bckTap)
}

export default { init, resize };
