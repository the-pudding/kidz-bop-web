import loadData from './load-data';

let cwMap = null;

function resize() { }
function init() {
    console.log('init');
    loadData(['cat_crosswalk.csv', 'cat_lyrics.csv'])
        .then(result => {
            const cw = result[0].map(d => [d.word, d.category]);
            cwMap = new Map(cw);
        })
        .catch(console.error);
}

export default { init, resize };
