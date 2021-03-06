/* global d3 */
import debounce from 'lodash.debounce';
import isMobile from './utils/is-mobile';
import linkFix from './utils/link-fix';
import graphic from './graphic';
// import footer from "./footer";
import proportion from './proportion';
import categories from './categories';
import percentages from './percentages';

const $body = d3.select('body');
let previousWidth = 0;

function setVH() {
  let h = window.innerHeight + 'px'
  d3.select('#content').style('height', `${h}`)
}

function resize() {
  // only do resize on width changes, not height
  // (remove the conditional if you want to trigger on height change)
  const width = $body.node().offsetWidth;
  if (previousWidth !== width) {
    previousWidth = width;
    graphic.resize();
    proportion.resize();
  }
}

function setupStickyHeader() {
  const $header = $body.select("header");
  if ($header.classed("is-sticky")) {
    const $menu = $body.select(".header__menu");
    const $toggle = $body.select(".header__toggle");
    $toggle.on("click", () => {
      const visible = $menu.classed("is-visible");
      $menu.classed("is-visible", !visible);
      $toggle.classed("is-visible", !visible);
    });
  }
}

function init() {
  // adds rel="noopener" to all target="_blank" links
  linkFix();
  setVH();
  // add mobile class to body tag
  $body.classed('is-mobile', isMobile.any());
  // setup resize event
  window.addEventListener('resize', debounce(resize, 150));
  // setup sticky header menu
  setupStickyHeader();
  // kick off graphic code
  graphic.init();
  proportion.init();
  categories.init();
  percentages.init();
  // load footer stories
  // footer.init();
}

init();
