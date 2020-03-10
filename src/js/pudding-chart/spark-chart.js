/* global d3 */

/*
 USAGE (example: line chart)
 1. c+p this template to a new file (line.js)
 2. change puddingChartName to puddingChartLine
 3. in graphic file: import './pudding-chart/line'
 4a. const charts = d3.selectAll('.thing').data(data).puddingChartLine();
 4b. const chart = d3.select('.thing').datum(datum).puddingChartLine();
*/

d3.selection.prototype.sparkLine = function init(options) {
    function createChart(el) {
        // dom elements
        let $sel = d3.select(el);
        let $svg = null;
        let $axis = null;
        let $vis = null;
        let $drawLines = null;

        // data
        let data = $sel.datum();

        // dimensions
        let width = 0;
        let height = 0;
        const MARGIN_TOP = 0;
        const MARGIN_BOTTOM = 0;
        const MARGIN_LEFT = 0;
        const MARGIN_RIGHT = 0;

        // scales
        let maxX = null;
		let minX = null;
		let maxY = null;
		let minY = null;
		let xScale = d3.scaleLinear()
		let xAxis = null;
		let xAxisGroup = null;
		let yScale = d3.scaleLinear()
		let yAxis = null;
		let yAxisGroup = null;
		let axisPadding = 15;

        // helper functions

        const Chart = {
            // called once at start
            init() {
                console.log(data)
                $svg = $sel.append('svg').attr('class', 'spark-chart')

                $axis = $svg.append('g').attr('class', 'g-axis')
                const $g = $svg.append('g');

                // offset chart for margins
                $g.attr('transform', `translate(${MARGIN_LEFT}, ${MARGIN_TOP})`);
                
                // create axis
				xAxisGroup = $axis.append('g').attr('class', 'x axis')
                yAxisGroup = $axis.append('g').attr('class', 'y axis')

                // creat viz group
                $vis = $g.append('g').attr('class', 'g-vis')

                Chart.resize();
				Chart.render();
            },
            // on resize, update new dimensions
            resize() {
                // defaults to grabbing dimensions from container element
                width = $sel.node().offsetWidth - MARGIN_LEFT - MARGIN_RIGHT;
                height = $sel.node().offsetHeight - MARGIN_TOP - MARGIN_BOTTOM;

                $svg
                    .attr('width', width + MARGIN_LEFT + MARGIN_RIGHT)
                    .attr('height', height + MARGIN_TOP + MARGIN_BOTTOM);
                
                $drawLines = $vis.selectAll('.cat-path')
                    .data(data)
                    .enter()
                    .append('path')
                    .attr('class', 'cat-path')

                return Chart;
            },
            // update scales and render chart
            render() {
                return Chart;
            },
            // get / set data
            data(val) {
                if (!arguments.length) return data;
                data = val;
                $sel.datum(data);
                Chart.render
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
