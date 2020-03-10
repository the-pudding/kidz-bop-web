import loadData from './load-data';
import './pudding-chart/proportion-chart';

// selections
const $slides = d3.selectAll('[data-chart="bar"]');
const $containers = $slides.selectAll('.chart');

let data = [];

function findTotal(d) {
    const total =
        d.alcohol + d.sexual + d.profanity + d.violence + d.identity + d.other;
    return total;
}

function cleanData(data) {
    const cleaned = data
        .map(d => ({
            ...d,
            year: +d.year,
            alcohol: +d.alcohol,
            sexual: +d.sexual,
            profanity: +d.profanity,
            violence: +d.violence,
            identity: +d.identity,
            other: +d.other,
        }))
        .map(d => ({
            ...d,
            total: findTotal(d),
        }));

    return cleaned;
}

function resize() { }

function setup() {
    const charts = $containers.data(data).stackedBar();
}

function init() {
    loadData('proportions.csv')
        .then(result => {
            data = cleanData(result);
            setup();
        })
        .catch(console.error);
}

export default { init, resize };
