parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"or4r":[function(require,module,exports) {
var global = arguments[3];
var t=arguments[3],e="Expected a function",n=NaN,r="[object Symbol]",i=/^\s+|\s+$/g,o=/^[-+]0x[0-9a-f]+$/i,u=/^0b[01]+$/i,f=/^0o[0-7]+$/i,c=parseInt,a="object"==typeof t&&t&&t.Object===Object&&t,s="object"==typeof self&&self&&self.Object===Object&&self,v=a||s||Function("return this")(),l=Object.prototype,p=l.toString,b=Math.max,m=Math.min,y=function(){return v.Date.now()};function d(t,n,r){var i,o,u,f,c,a,s=0,v=!1,l=!1,p=!0;if("function"!=typeof t)throw new TypeError(e);function d(e){var n=i,r=o;return i=o=void 0,s=e,f=t.apply(r,n)}function g(t){var e=t-a;return void 0===a||e>=n||e<0||l&&t-s>=u}function O(){var t=y();if(g(t))return x(t);c=setTimeout(O,function(t){var e=n-(t-a);return l?m(e,u-(t-s)):e}(t))}function x(t){return c=void 0,p&&i?d(t):(i=o=void 0,f)}function T(){var t=y(),e=g(t);if(i=arguments,o=this,a=t,e){if(void 0===c)return function(t){return s=t,c=setTimeout(O,n),v?d(t):f}(a);if(l)return c=setTimeout(O,n),d(a)}return void 0===c&&(c=setTimeout(O,n)),f}return n=h(n)||0,j(r)&&(v=!!r.leading,u=(l="maxWait"in r)?b(h(r.maxWait)||0,n):u,p="trailing"in r?!!r.trailing:p),T.cancel=function(){void 0!==c&&clearTimeout(c),s=0,i=a=o=c=void 0},T.flush=function(){return void 0===c?f:x(y())},T}function j(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function g(t){return!!t&&"object"==typeof t}function O(t){return"symbol"==typeof t||g(t)&&p.call(t)==r}function h(t){if("number"==typeof t)return t;if(O(t))return n;if(j(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=j(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(i,"");var r=u.test(t);return r||f.test(t)?c(t.slice(2),r?2:8):o.test(t)?n:+t}module.exports=d;
},{}],"WEtf":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var r={android:function(){return navigator.userAgent.match(/Android/i)},blackberry:function(){return navigator.userAgent.match(/BlackBerry/i)},ios:function(){return navigator.userAgent.match(/iPhone|iPad|iPod/i)},opera:function(){return navigator.userAgent.match(/Opera Mini/i)},windows:function(){return navigator.userAgent.match(/IEMobile/i)},any:function(){return r.android()||r.blackberry()||r.ios()||r.opera()||r.windows()}},e=r;exports.default=e;
},{}],"hZBy":[function(require,module,exports) {
"use strict";function e(e){return r(e)||n(e)||t()}function t(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function n(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}function r(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}function o(e){return document.querySelector(e)}function s(t){return e((arguments.length>1&&void 0!==arguments[1]?arguments[1]:document).querySelectorAll(t))}function c(t,n){return e(t.querySelectorAll(n))}function a(e,t){e.classList?e.classList.remove(t):e.className=e.className.replace(new RegExp("(^|\\b)".concat(t.split(" ").join("|"),"(\\b|$)"),"gi")," ")}function l(e,t){e.classList?e.classList.add(t):e.className="".concat(e.className," ").concat(t)}function i(e,t){return e.classList?e.classList.contains(t):new RegExp("(^| )".concat(t,"( |$)"),"gi").test(e.className)}function u(e,t){t=t||0;var n=e.getBoundingClientRect().top+t,r=(window.pageYOffset||document.documentElement.scrollTop)+n;window.scrollTo(0,r)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.select=o,exports.selectAll=s,exports.find=c,exports.removeClass=a,exports.addClass=l,exports.hasClass=i,exports.jumpTo=u;
},{}],"U9xJ":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=t;var e=require("./dom");function t(){(0,e.selectAll)("[target='_blank']").forEach(function(e){return e.setAttribute("rel","noopener")})}
},{"./dom":"hZBy"}],"b9Lb":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=[{quizID:1,main:10,exact:[6,7,8,9,10]},{quizID:2,main:13,exact:[3,11,12,13]},{quizID:3,main:null,exact:[]},{quizID:4,main:12,exact:[0,1,2,4,9,12]},{quizID:5,main:5,exact:[5]}];exports.default=e;
},{}],"qa0R":[function(require,module,exports) {
"use strict";function e(e){if(!e.size())return!1;var t=e.html().split(" ").map(function(e,t){return"<span data-index=".concat(t,">").concat(e,"</span>")}).join(" ");return e.html(t),!0}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var t={prepare:e};exports.default=t;
},{}],"xZJw":[function(require,module,exports) {
"use strict";function t(t){return new Promise(function(e,n){var r=t.split(".").pop();"csv"===r?d3.csv("assets/data/".concat(t)).then(e).catch(n):"json"===r?d3.json("assets/data/".concat(t)).then(e).catch(n):n(new Error("unsupported file type for: ".concat(t)))})}function e(e){if("string"==typeof e)return t(e);var n=e.map(t);return Promise.all(n)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=e;
},{}],"MBJX":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=t(require("./load-data"));function t(e){return e&&e.__esModule?e:{default:e}}function r(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function n(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(n,!0).forEach(function(t){a(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var o=null,c=[],s=[],l=d3.select(".first-select"),i=d3.select("#slide_18").select(".compare-wrapper");function u(e){return e.map(function(e){return n({},e,{category:o.get(e.word)})})}function d(){var e=d3.select(this).select("input"),t=e.attr("checked"),r=d3.select(this.parentNode),n=d3.select(r.node().parentNode),a=d3.select(n.node().parentNode).select(".origLyric"),o=r.selectAll(".toggle-kb"),c=r.selectAll(".toggle-og");console.log(r),"true"===t?(a.transition().duration(100).delay(0).ease(d3.easeLinear).text(function(e){return e.original}),o.classed("toggle-on",!1),c.classed("toggle-on",!0)):(a.transition().duration(100).delay(0).ease(d3.easeLinear).text(function(e){return e.kb}),o.classed("toggle-on",!0),c.classed("toggle-on",!1)),"true"===e.attr("checked")?e.attr("checked","false"):e.attr("checked","true")}function p(e){var t=s.filter(function(t){return t.key===e})[0].values;i.selectAll(".lyric-set").data(t,function(e){return e?e.word:null}).join(function(e){var t=e.append("div").attr("class","lyric-set"),r=t.append("div").attr("class","lyric-head");t.append("p").attr("class","origLyric").text(function(e){return e.kb});var n=r.append("div").attr("class","deets");n.append("p").attr("class","song").text(function(e){return e.song}),n.append("p").attr("class","kb-deets").text(function(e){return e.kb_deets}),n.append("p").attr("class","orig-deets").text(function(e){return e.original_deets});var a=r.append("div").attr("class","toggle");a.append("p").attr("class","toggle-labels toggle-kb toggle-on").text("Kidz Bop");var o=a.append("label").attr("class","switch");o.append("input").attr("type","checkbox").attr("class","is-kb").attr("checked","true"),o.append("span").attr("class","slider round"),o.on("change",d),a.append("p").attr("class","toggle-labels toggle-og").text("Original")})}function f(){l.selectAll("option").data(s,function(e){return e.key}).join(function(e){return e.append("option").text(function(e){return e.key}).attr("value",function(e){return e.key})}),l.on("change",function(){p(d3.select(this).property("value"))})}function g(e){var t=c.filter(function(t){return t.category===e});(s=d3.nest().key(function(e){return e.word}).entries(t))&&(f(),p(s[0].key))}function y(){}function b(){(0,e.default)(["cat_crosswalk.csv","cat_lyrics.csv"]).then(function(e){var t=e[0].map(function(e){return[e.word,e.category]});o=new Map(t),c=u(e[1])}).catch(console.error)}var v={init:b,resize:y,filter:g};exports.default=v;
},{"./load-data":"xZJw"}],"TAPd":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=l(require("./lyrics")),t=l(require("./utils/prepare-span")),s=l(require("./categories"));function l(e){return e&&e.__esModule?e:{default:e}}function a(){}var i=d3.selectAll(".slide"),n=d3.select("#touch"),c=n.selectAll("#right"),r=n.selectAll("#left"),d=n.selectAll("#skipper"),o=n.selectAll("#begin"),u=d3.selectAll(".category-bar"),f=d3.selectAll(".song-circle"),p=i.filter(function(e,t,s){return d3.select(s[t]).attr("data-quiz")}),v=i.filter(function(e,t,s){return d3.select(s[t]).attr("data-answer")}),h=d3.selectAll("#count"),b=d3.select(".quiz-details"),y=d3.select("#categories"),A=d3.selectAll(".quiz-feedback p"),g=null,m=null,z=null,w=null,q=null,x=null;function k(){p.nodes().forEach(function(e){var s=d3.select(e).select(".lyric-wrapper p");t.default.prepare(s)}),g=d3.selectAll(".lyric-wrapper span")}function L(){d3.selectAll("#slide_3").selectAll(".lyric-wrapper p").selectAll("span").attr("class",function(e,t){return t?null:"hintSpan"})}function T(){m=d3.select(".is-visible-slide");var e=(z=+m.attr("data-slide"))>=3&&(z+1)%2!=0;w=i.filter(function(e,t,s){return d3.select(s[t]).attr("data-slide")==="".concat(z-1)}),q=i.filter(function(e,t,s){return d3.select(s[t]).attr("data-slide")==="".concat(z+1)}),1==z?d3.select("header").classed("is-visible",!0):d3.select("header").classed("is-visible",!1),17==z?(y.classed("is-visible",!0).style("pointer-events","all"),u.classed("not-chosen",!1).classed("cat-chosen",!1).transition().duration(250).delay(function(e,t){return 25*t}).ease(d3.easeLinear).style("transform","translate(0, 0)")):z<17&&y.classed("is-visible",!1),e&&(x=i.filter(function(e,t,s){return d3.select(s[t]).attr("data-slide")==="".concat(z-1)})),Y()}function _(){i.attr("data-slide",function(e,t){return t+1}),T()}function S(t){var s=x.selectAll("span"),l=x.selectAll(".censored"),a=x.attr("data-quiz"),i=e.default.filter(function(e){return e.quizID===+a})[0],n=i.exact.filter(function(e){return!t.includes(e)}),c=t.filter(function(e){return!i.exact.includes(e)}),r=s.size()===l.size(),d=f.filter(function(e,t,s){return d3.select(s[t]).attr("data-quiz")===a}),o=d3.selectAll(".slide").filter(function(e,t,s){return d3.select(s[t]).attr("data-answer")===a}).selectAll(".compare-wrapper .quiz-feedback p");r?(d.classed("is-wrong",!0).classed("is-correct",!1),o.classed("slide-in",!0).classed("is-wrong",!0).html("<span>Whoa!</span><br> You can't censor it all.")):0===n.length&&0===c.length?(d.classed("is-correct",!0).classed("is-wrong",!1),o.classed("slide-in",!0).classed("is-correct",!0).html("<span>Correct!</span><br> Do you secretly have a Kidz Bop playlist?")):n.length>0&&t.includes(i.main)?(d.classed("is-correct",!0).classed("is-wrong",!1),o.classed("slide-in",!0).classed("is-correct",!0).html("<span>This counts!</span><br> You found the main censored word.")):(d.classed("is-wrong",!0).classed("is-correct",!1),o.classed("slide-in",!0).classed("is-wrong",!0).html("<span>Yikes!</span><br> This still needs a parental advisory label."))}function C(){var e=x.selectAll(".censored"),t=[];e.each(function(){var e=d3.select(this).attr("data-index");t.push(+e)}),S(t)}function B(){var e=d3.select(this);g.classed("hintSpan",!1);var t=e.classed("censored");e.classed("censored",!t)}function D(){d3.selectAll("#left").classed("is-visible",!1),d3.selectAll("#right").classed("solo",!0)}function K(){var e=b.selectAll(".is-correct").size();d3.select(".correct-count").text(e),d3.select(".results-sentence").text(function(){return e<=2?"Kids, earmuffs! Did you even really try?!":e<4&&e>2?"This might seem safe for the radio, but not for Kidz Bop.":"The FCC has nothing on you!"})}function Y(){d3.selectAll("#prompt");var e=d3.selectAll("#left"),t=d3.selectAll("#right"),s=t.select("button p"),l=m.attr("data-quiz")||m.attr("data-answer")||13===z;2===z?s.text("Take the quiz"):m.attr("data-quiz")?s.text("Submit"):m.attr("data-answer")&&12!==z?s.text("Next Song"):12===z?s.text("Show my results"):13===z?s.text("Tell me more"):1===z&&s.text("Let's find out"),d.classed("is-visible",[2].includes(z)),o.classed("is-visible",[18].includes(z)),d3.selectAll(".bottom-fade").classed("is-visible",[18].includes(z)),e.classed("is-visible",[14,15,16,18].includes(z)),t.classed("is-visible",![17,18].includes(z)),t.classed("solo",z<=13),e.classed("solo",18==z),b.classed("is-visible",l),m.attr("data-quiz")&&h.text(m.attr("data-quiz")),13===z&&(K(),b.classed("total",!0)),z>16&&z<18?n.style("pointer-events","none"):n.style("pointer-events","all")}function M(){var e=m.attr("data-quiz");m.classed("is-visible-slide",!1),q.classed("is-visible-slide",!0),T(),e&&C()}function P(){m.classed("is-visible-slide",!1),w.classed("is-visible-slide",!0),T()}function j(){i.classed("is-visible-slide",!1),d3.select('[data-chart="bar"]').classed("is-visible-slide",!0),T()}function E(){i.classed("is-visible-slide",!1),d3.select("#slide_1").classed("is-visible-slide",!0),T(),d3.selectAll(".censored").classed("censored",!1),d3.selectAll(".song-circle").classed("is-wrong",!1),d3.selectAll(".song-circle").classed("is-correct",!1),d3.selectAll(".quiz-details").classed("total",!1)}function F(e){var t=e.select("p"),s=e.attr("data-direction");t.classed("is-visible",!1),e.select("button").transition().duration(25).delay(100).ease(d3.easeLinear).style("transform","rotate(0deg)"),u.classed("not-chosen",!1).classed("cat-chosen",!1).transition().duration(250).delay(function(e,t){return 25*t}).ease(d3.easeLinear).style("transform","translate(0, 0)"),"back"===s&&d3.event.stopPropagation(),P(),y.style("pointer-events","all")}function I(){u.on("click",function(){N(d3.select(this))})}function N(e){e.node().attr;var t=e.classed("cat-chosen",!0);t.classed("not-chosen",!1);t.select(".button-wrapper p");var l=t.select(".button-wrapper button"),a=d3.selectAll(".category-bar").filter(function(){return!this.classList.contains("cat-chosen")});e.node().getBoundingClientRect();a.transition().duration(250).delay(function(e,t){return 25*t}).ease(d3.easeLinear).style("transform","translate(-100%)"),t.transition().duration(250).delay(250).ease(d3.easeLinear).style("transform","translate(100%)");var i=t.node().getAttribute("data-cat"),n=d3.selectAll("#category-sent");n.text(function(){return"alcohol"==i?"alcohol & drugs":i}),n.classed("".concat(i,"-sent"),!0),M(),s.default.filter(t.attr("data-cat")),y.style("pointer-events","none"),l.style("pointer-events","all")}function O(){_(),k(),D(),I(),L(),c.on("click",M),r.on("click",P),d.on("click",j),o.on("click",E),g.on("click",B)}var R={init:O,resize:a};exports.default=R;
},{"./lyrics":"b9Lb","./utils/prepare-span":"qa0R","./categories":"MBJX"}],"lhDN":[function(require,module,exports) {
d3.selection.prototype.stackedBar=function(t){var n=this.nodes().map(function(t){var n=d3.select(t),e=n.datum(),r=0,a=d3.scaleLinear(),i={init:function(){n.selectAll(".year").data(e,function(t){return t.year}).join(function(t){var n=t.append("div").attr("class","year");return n.append("p").attr("class","year__number").text(function(t){return t.year}),n.append("div").attr("class","year__barCont"),n})},resize:function(){r=n.node().offsetWidth-50-0,n.node().offsetHeight;var t=d3.max(e,function(t){return t.total});return a.domain([0,t]).range([0,r]),i},render:function(){return n.selectAll(".year__barCont").selectAll(".bar").data(function(t){return t.censored}).join(function(t){return t.append("div").attr("class",function(t){return"bar bar--".concat(t.key)})}).style("width",function(t){return"".concat(a(t.value),"px")}).style("height","10px"),i},data:function(t){return arguments.length?(e=t,n.datum(e),i):e}};return i.init(),i});return n.length>1?n:n.pop()};
},{}],"JciQ":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=r(require("./load-data"));function r(e){return e&&e.__esModule?e:{default:e}}function t(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),t.push.apply(t,n)}return t}function n(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{};r%2?t(n,!0).forEach(function(r){o(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):t(n).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function o(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}require("./pudding-chart/proportion-chart");var c=d3.selectAll('[data-chart="bar"]'),i=c.selectAll(".chart"),a=[],u=[];function l(e){var r=e.censored.map(function(e){return e.value});return d3.sum(r)}function s(e){return e.map(function(e){return{year:+e.year,censored:d3.entries({alcohol:+e.alcohol,sexual:+e.sexual,profanity:+e.profanity,violence:+e.violence,identity:+e.identity,other:+e.other})}}).map(function(e){return n({},e,{total:l(e)})})}function f(){a.forEach(function(e){return e.resize().render()})}function p(){var e=d3.select(this).data([u]).stackedBar();e.resize().render(),a.push(e)}function d(){(0,e.default)("proportions-kb.csv").then(function(e){u=s(e),i.each(p)}).catch(console.error)}var b={init:d,resize:f};exports.default=b;
},{"./load-data":"xZJw","./pudding-chart/proportion-chart":"lhDN"}],"PhzB":[function(require,module,exports) {
d3.selection.prototype.sparkLine=function(t){var a=this.nodes().map(function(t){var a=d3.select(t),e=null,n=null,r=null,s=a.datum(),c=0,i=0,l=(d3.scaleLinear(),d3.scaleLinear(),{init:function(){console.log(s),e=a.append("svg").attr("class","spark-chart"),n=e.append("g").attr("class","g-axis");var t=e.append("g");t.attr("transform","translate(".concat(0,", ").concat(0,")")),n.append("g").attr("class","x axis"),n.append("g").attr("class","y axis"),r=t.append("g").attr("class","g-vis"),l.resize(),l.render()},resize:function(){return c=a.node().offsetWidth-0-0,i=a.node().offsetHeight-0-0,e.attr("width",c+0+0).attr("height",i+0+0),r.selectAll(".cat-path").data(s).enter().append("path").attr("class","cat-path"),l},render:function(){return l},data:function(t){return arguments.length?(s=t,a.datum(s),l.render,l):s}});return l.init(),l});return a.length>1?a:a.pop()};
},{}],"UNiJ":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=r(require("./load-data"));function r(e){return e&&e.__esModule?e:{default:e}}function t(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),t.push.apply(t,n)}return t}function n(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{};r%2?t(n,!0).forEach(function(r){o(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):t(n).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function o(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}require("./pudding-chart/spark-chart");var c=d3.select("#spark-chart"),i=null,u=[];function a(e){var r=e.censored.map(function(e){return e.value});return d3.sum(r)}function l(e){return e.map(function(e){return{year:+e.year,censored:d3.entries({alcohol:+e.alcohol,sexual:+e.sexual,profanity:+e.profanity,violence:+e.violence,identity:+e.identity,other:+e.other})}}).map(function(e){return n({},e,{total:a(e)})})}function f(){}function s(e){i=c.datum(e).sparkLine()}function p(){(0,e.default)("proportions.csv").then(function(e){s(u=l(e))}).catch(console.error)}var d={init:p,resize:f};exports.default=d;
},{"./load-data":"xZJw","./pudding-chart/spark-chart":"PhzB"}],"epB2":[function(require,module,exports) {
"use strict";var e=u(require("lodash.debounce")),i=u(require("./utils/is-mobile")),s=u(require("./utils/link-fix")),t=u(require("./graphic")),r=u(require("./proportion")),l=u(require("./categories")),a=u(require("./spark"));function u(e){return e&&e.__esModule?e:{default:e}}var d=d3.select("body"),n=0;function c(){var e=d.node().offsetWidth;n!==e&&(n=e,t.default.resize(),r.default.resize())}function o(){if(d.select("header").classed("is-sticky")){var e=d.select(".header__menu"),i=d.select(".header__toggle");i.on("click",function(){var s=e.classed("is-visible");e.classed("is-visible",!s),i.classed("is-visible",!s)})}}function f(){(0,s.default)(),d.classed("is-mobile",i.default.any()),window.addEventListener("resize",(0,e.default)(c,150)),o(),t.default.init(),r.default.init(),a.default.init(),l.default.init()}f();
},{"lodash.debounce":"or4r","./utils/is-mobile":"WEtf","./utils/link-fix":"U9xJ","./graphic":"TAPd","./proportion":"JciQ","./categories":"MBJX","./spark":"UNiJ"}]},{},["epB2"], null)