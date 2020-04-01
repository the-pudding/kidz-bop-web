import loadData from './load-data';

let wordData = [];
let groupData = [];

const $groupIN = d3.selectAll('#catIN')
const $groupCEN = d3.selectAll('#catCEN')
const $groupPCT = d3.selectAll('#catPCT')

const $wordIN = d3.selectAll('#wordIN')
const $wordCEN = d3.selectAll('#wordCEN')
const $wordPCT = d3.selectAll('#wordPCT')

function populateGroupText(category) {
  const filteredData = groupData.filter(d => d.category == category)
  const groupINData = filteredData[0].inSongs
  const groupCENData = filteredData[0].censored
  let groupPCTData = filteredData[0].pctCensored
  groupPCTData = Number(groupPCTData).toFixed(1)

  $groupIN.text(`${groupINData}`)
  $groupCEN.text(`${groupCENData}`)
  $groupPCT.text(`${groupPCTData}`)
}

function populateWordText(word) {
  const filteredData = wordData.filter(d => d.badword == word)
  const wordINData = filteredData[0].inSongs
  const wordCENData = filteredData[0].censored
  let wordPCTData = filteredData[0].pctCensored
  wordPCTData = Number(wordPCTData).toFixed(1)

  $wordIN.text(`${wordINData}`)
  $wordCEN.text(`${wordCENData}`)
  $wordPCT.text(`${wordPCTData}`)
}

function init() {
  loadData(['groupOverviewNumbers.csv', 'wordOverviewNumbers.csv'])
    .then(result => {
      groupData = result[0]
      wordData = result[1]
    })
    .catch(console.error);
}

export default { init , populateGroupText, populateWordText };
