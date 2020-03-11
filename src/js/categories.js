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

function handleDropdown(val) {
    // generate new lyric sets for each song
    const singleWord = filteredData.filter(d => d.key === val)[0].values;
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
                .text(d => d.kb_deets);
            $deets
                .append('p')
                .attr('class', 'orig-deets')
                .text(d => d.original_deets);

            const $toggle = $head.append('div').attr('class', 'toggle');
            $toggle
                .append('p')
                .attr('class', 'toggle-labels toggle-on')
                .text('Kidz Bop');
            const $switch = $toggle.append('label').attr('class', 'switch');
            $switch
                .append('input')
                .attr('type', 'checkbox')
                .attr('class', 'is-faces');
            $switch.append('span').attr('class', 'slider round');
            $toggle
                .append('p')
                .attr('class', 'toggle-labels')
                .text('Original');
        });
}

function updateDropdown() {
    $dropdown
        .selectAll('option')
        .data(filteredData, d => {
            return d.key;
        })
        .join(enter =>
            enter
                .append('option')
                .text(d => d.key)
                .attr('value', d => d.key)
        );

    $dropdown.on('change', function () {
        const val = d3.select(this).property('value');
        handleDropdown(val);
    });
}

function filter(cat) {
    const filtered = data.filter(d => d.category === cat);
    filteredData = d3
        .nest()
        .key(d => d.word)
        .entries(filtered);

    if (filteredData) {
        updateDropdown();
        const first = filteredData[0].key;
        handleDropdown(first);
    }
}

function resize() { }
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
