/* global d3 */

/*
 USAGE (example: line chart)
 1. c+p this template to a new file (line.js)
 2. change puddingChartName to puddingChartLine
 3. in graphic file: import './pudding-chart/line'
 4a. const charts = d3.selectAll('.thing').data(data).puddingChartLine();
 4b. const chart = d3.select('.thing').datum(datum).puddingChartLine();
*/

d3.selection.prototype.stackedBar = function init(options) {
    function createChart(el) {
        // dom elements
        const $chart = d3.select(el);
        const $svg = null;
        const $axis = null;
        const $vis = null;

        // data
        let data = $chart.datum();
        console.log({ data });

        // dimensions
        let width = 0;
        let height = 0;
        const MARGIN_TOP = 0;
        const MARGIN_BOTTOM = 0;
        const MARGIN_LEFT = 0;
        const MARGIN_RIGHT = 0;

        // scales
        const scaleX = d3.scaleLinear();
        const scaleY = null;

        // helper functions

        const Chart = {
            // called once at start
            init() {
                // add parent div for each year row
                $chart
                    .selectAll('.year')
                    .data(data, d => d.year)
                    .join(enter => {
                        const year = enter.append('div').attr('class', 'year');

                        // add a p element for the year
                        year
                            .append('p')
                            .attr('class', 'year__number')
                            .text(d => d.year);

                        // and another div to contain the bars
                        const container = year.append('div').attr('class', 'year__barCont');
                        return year;
                    });

                $chart;
            },
            // on resize, update new dimensions
            resize() {
                // defaults to grabbing dimensions from container element
                width = $chart.node().offsetWidth - MARGIN_LEFT - MARGIN_RIGHT;
                height = $chart.node().offsetHeight - MARGIN_TOP - MARGIN_BOTTOM;
                const max = d3.max(data, d => d.total);
                scaleX.domain([0, max]).range([0, width]);

                return Chart;
            },
            // update scales and render chart
            render() {
                const $barCont = $chart.selectAll('.year__barCont');

                const bar = $barCont
                    .selectAll('.bar')
                    .data(d => {
                        console.log({ cen: d.censored });
                        return d.censored;
                    })
                    .join(enter =>
                        enter
                            .append('div')
                            .attr('class', d => `bar bar--${d.key}`)
                            .style('width', d => `${scaleX(d.value)}px`)
                            .style('height', '10px')
                    );

                return Chart;
            },
            // get / set data
            data(val) {
                if (!arguments.length) return data;
                data = val;
                $chart.datum(data);
                return Chart;
            },
        };
        Chart.init();

        return Chart;
    }

    // create charts
    const charts = this.nodes().map(createChart);
    return charts.length > 1 ? charts : charts.pop();
};
