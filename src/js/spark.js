import loadData from './load-data';
import './pudding-chart/spark-chart';

// selections
const $chart = d3.select('#spark-chart')
let chartSpark = null;

let data = [];

function findTotal(d) {
    const { censored } = d;
    const ent = censored.map(e => e.value);
    const sum = d3.sum(ent);
    return sum;
}

function cleanData(data) {
    // TODO transform data
    const cleaned = data
        .map(d => ({
            year: +d.year,
            censored: d3.entries({
                alcohol: +d.alcohol,
                sexual: +d.sexual,
                profanity: +d.profanity,
                violence: +d.violence,
                identity: +d.identity,
                other: +d.other,
            }),
        }))
        .map(d => ({
            ...d,
            total: findTotal(d),
        }));

    return cleaned;
}

function resize() {
}

function setupChart(data) {
    chartSpark = $chart 
        .datum(data)
        .sparkLine()
}

function init() {
    loadData('proportions.csv')
        .then(result => {
            data = cleanData(result);
            setupChart(data)
        })
        .catch(console.error);
}

export default { init, resize };
