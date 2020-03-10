import loadData from './load-data';
import './pudding-chart/proportion-chart';

// selections
const $slides = d3.selectAll('[data-chart="bar"]');
const $containers = $slides.selectAll('.chart');
const charts = [];

let data = [];

function findTotal(d) {
    const { censored } = d;
    const ent = censored.map(e => e.value);
    const sum = d3.sum(ent);
    return sum;
}

function cleanData(data) {
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
    charts.forEach(chart => chart.resize().render());
}

function setupCharts() {
    const $sel = d3.select(this);
    const chart = $sel.data([data]).stackedBar();
    chart.resize().render();
    charts.push(chart);
}

function init() {
    loadData('proportions.csv')
        .then(result => {
            data = cleanData(result);
            $containers.each(setupCharts);
        })
        .catch(console.error);
}

export default { init, resize };
