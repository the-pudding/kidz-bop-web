import loadData from './load-data';

let cwMap = null;
let data = [];
let filteredData = [];

const $dropdown = d3.select('.first-select');
const $compare = d3.select('#slide_18').select('.compare-wrapper');

function cleanLyrics(lyr) {
  const cleaned = lyr.map(d => ({
    ...d,
    category: cwMap.get(d.word),
  }));

  return cleaned;
}

function handleToggle() {
  const container = d3.select(this);
  const thisSwitch = container.select('input');
  const checked = thisSwitch.attr('checked');
  const toggleParent = d3.select(this.parentNode);
  const headParent = d3.select(toggleParent.node().parentNode);
  const lyricParent = d3.select(headParent.node().parentNode);
  const lyrics = lyricParent.select('.origLyric');
  const thisToggleKB = toggleParent.selectAll('.toggle-kb');
  const thisToggleOG = toggleParent.selectAll('.toggle-og');

  // console.log({ parent, lyrics, lyricParent, checked });
  // console.log(toggleParent)

  if (checked === 'true') {
    lyrics
      .transition()
      .duration(100)
      .delay(0)
      .ease(d3.easeLinear)
      .text(d => d.original);
    thisToggleKB.classed('toggle-on', false);
    thisToggleOG.classed('toggle-on', true);
  } else {
    lyrics
      .transition()
      .duration(100)
      .delay(0)
      .ease(d3.easeLinear)
      .text(d => d.kb);
    thisToggleKB.classed('toggle-on', true);
    thisToggleOG.classed('toggle-on', false);
  }

  // console.log({ thisSwitch, checked });

  thisSwitch.attr('checked') === 'true'
    ? thisSwitch.attr('checked', 'false')
    : thisSwitch.attr('checked', 'true');
}

function handleDropdown(val) {
  // generate new lyric sets for each song
  const singleWord = filteredData
    .filter(d => d.key === val)[0]
    .values.sort((a, b) => d3.descending(+a.kb_deets, +b.kb_deets));

  $compare
    .selectAll('.lyric-set')
    .data(singleWord, d => {
      return d ? d.word : null;
    })
    .join(enter => {
      const $set = enter.append('div').attr('class', 'lyric-set');

      const $head = $set.append('div').attr('class', 'lyric-head');
      $set
        .append('p')
        .attr('class', 'origLyric')
        .text(d => d.kb);

      const $deets = $head.append('div').attr('class', 'deets');
      $deets
        .append('p')
        .attr('class', 'song')
        .text(d => d.song);
      $deets
        .append('p')
        .attr('class', 'kb-deets')
        .text(d => `Kidz Bop (${d.kb_deets})`);
      $deets
        .append('p')
        .attr('class', 'orig-deets')
        .text(d => d.original_deets);

      const $toggle = $head.append('div').attr('class', 'toggle');
      $toggle
        .append('p')
        .attr('class', 'toggle-labels toggle-kb toggle-on')
        .text('KB');
      const $switch = $toggle.append('label').attr('class', 'switch');
      $switch
        .append('input')
        .attr('type', 'checkbox')
        .attr('class', 'is-kb')
        .attr('checked', 'true');
      $switch.append('span').attr('class', 'slider round');

      $switch.on('change', handleToggle);
      $toggle
        .append('p')
        .attr('class', 'toggle-labels toggle-og')
        .text('OG');
    });
}

function updateDropdown() {
  const sortedData = filteredData.sort((a, b) =>
    d3.descending(a.length, b.length)
  );

  $dropdown
    .selectAll('option')
    .data(sortedData, d => {
      return d.key;
    })
    .join(enter =>
      enter
        .append('option')
        .text(d => d.key)
        .attr('value', d => d.key)
    );

  $dropdown.on('change', function() {
    const val = d3.select(this).property('value');
    handleDropdown(val);
  });
}

function filter(cat) {
  const filtered = data.filter(d => d.category === cat);
  filteredData = d3
    .nest()
    .key(d => d.word)
    .rollup(leaves => {
      const { length } = leaves;
      return { length, values: leaves };
    })
    .entries(filtered)
    .map(d => ({
      key: d.key,
      length: d.value.length,
      values: d.value.values,
    }));

  if (filteredData) {
    updateDropdown();
    const first = filteredData[0].key;
    handleDropdown(first);
  }
}

function resize() {}
function init() {
  loadData(['cat_crosswalk.csv', 'cat_lyrics.csv'])
    .then(result => {
      const cw = result[0].map(d => [d.word, d.category]);
      cwMap = new Map(cw);
      data = cleanLyrics(result[1]);
    })
    .catch(console.error);
}

export default { init, resize, filter };
