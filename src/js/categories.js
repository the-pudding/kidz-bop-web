import loadData from './load-data';

let cwMap = null;
let data = [];

function cleanLyrics(lyr) {
    const cleaned = lyr.map(d => ({
        ...d,
        category: cwMap.get(d.word),
    }));

    return cleaned;
}

function filter(cat) {
    const filtered = data.filter(d => d.category === cat);
    const nested = d3
        .nest()
        .key(d => d.word)
        .entries(filtered);

    console.log({ nested });
}

function resize() { }
function init() {
    console.log('init');
    loadData(['cat_crosswalk.csv', 'cat_lyrics.csv'])
        .then(result => {
            const cw = result[0].map(d => [d.word, d.category]);
            cwMap = new Map(cw);
            data = cleanLyrics(result[1]);
        })
        .catch(console.error);
}

export default { init, resize, filter };
