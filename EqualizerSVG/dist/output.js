/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./EqualizerSVG.js":
/*!*************************!*\
  !*** ./EqualizerSVG.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EqualizerSVG; });
/*

pxCore Copyright 2005-2018 John Robinson

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

Author: Hugh Fitzpatrick

*/

class EqualizerSVG
{
    constructor( scene, params)
    {
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        // READY
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - -

        this._ready = null;
        Object.defineProperty(this, "ready",
        {
            get: function ()    { return this._ready; },
        });

        if( scene.capabilities              == undefined ||
            scene.capabilities.graphics     == undefined ||
            scene.capabilities.graphics.svg == undefined)
        {
            this._ready = Promise.reject("Oh NO ... SVG is not supported in this build.");

            return this;
        }

        // - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        // PARENT
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - -

        this._parent = (params && params.parent) ? params.parent : null;
        Object.defineProperty(this, "parent",
        {
            set: function (val) { this._parent = val;  rootObj.parent = this._parent; },
            get: function ()    { return this._parent; },
        });

        if( this._parent == null)
        {
            this._ready = Promise.reject("Oh NO ... No Parent provided.");

            return this;
        }

        // - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        // ALPHA
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - -

        this._a = (params && params.a) ? params.a : 0;
        Object.defineProperty(this, "a",
        {
            set: function (val) { this._a = val;  rootObj.a = this._a; },
            get: function ()    { return this._a; },
        });

        // - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        // POSITION
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - -

        this._x = (params && params.x) ? params.x : 0;
        Object.defineProperty(this, "x",
        {
            set: function (val) { this._x = val;  rootObj.x = this._x; },
            get: function ()    { return this._x; },
        });

        this._y = (params && params.y) ? params.y : 0;
        Object.defineProperty(this, "y",
        {
            set: function (val) { this._y = val;  rootObj.y = this._y; },
            get: function ()    { return this._y; },
        });

        // - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        // DIMENSION
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - -

        this._w = (params && params.w) ? params.w : 800;
        Object.defineProperty(this, "w",
        {
            set: function (val) { this._w = val;  },
            get: function ()    { return this._w; },
        });

        this._h = (params && params.h) ? params.h : 200;
        Object.defineProperty(this, "h",
        {
            set: function (val) { this._h = val;  },
            get: function ()    { return this._h; },
        });

        // - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        // ROWS & COLS
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - -

        this._rows = (params && params.rows) ? params.rows : 10; // default
        Object.defineProperty(this, "rows",
        {
            set: function (val) { this._rows = val;  },
            get: function ()    { return this._rows; },
        });

        this._cols = (params && params.cols) ? params.cols : 40; // default
        Object.defineProperty(this, "cols",
        {
            set: function (val) { this._cols = val;  },
            get: function ()    { return this._cols; },
        });


        // - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        // ZERO
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - -

        var zz = (params && params.zero) ? params.zero : (this._rows - 1);
        this._zero = Math.min(Math.max(zz, 0), this._rows);

        Object.defineProperty(this, "zero",
        {
            set: function (val) { this._zero = Math.max(val, this._rows); rootObj.zero = this._zero; },
            get: function ()    { return this._zero; },
        });

        // - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        // SPEED
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - -

        this._t = (params && params.t) ? params.t : 140; // default
        Object.defineProperty(this, "t",
        {
            set: function (val) { this._t = val;  },
            get: function ()    { return this._t; },
        });

        // - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        // GRID
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - -

        this._grid = (params && params.grid) ? params.grid : 8; // default
        Object.defineProperty(this, "grid",
        {
            set: function (val) { this._grid = val;  },
            get: function ()    { return this._grid; },
        });

        // - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        // BACKGROUND
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - -

        this._bg = (params && params.bg) ? params.bg : "#111"; // default
        Object.defineProperty(this, "bg",
        {
            set: function (val) { this._bg = val;  },
            get: function ()    { return this._bg; },
        });

        // - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        // GRADIENT STOPS
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - -

        this._stops = (params && params.stops) ? params.stops : // defaults
        [
            { offset:   0, color: "#0f0"},
            { offset:  25, color: "#0f0"},
            { offset:  50, color: "#ff0"},
            { offset:  75, color: "#f80"},
            { offset: 100, color: "#f00"},
        ];

        Object.defineProperty(this, "stops",
        {
            set: function (val) { this._stops = val;  },
            get: function ()    { return this._stops; },
        });
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - -

        var timer          = null;
        var blocksObj      = null;
        var blackout       = [];
        var blackout_ready = [];

        var ww = this._w;  // WxH of the component
        var hh = this._h;

        var zero = this._zero;
        var rows = this._rows;
        var cols = this._cols;

        var dx = this._w / cols;  // WxH of the cells
        var dy = this._h / rows;

        var gg = this._grid;      // Grid stroke width
        var bg = this._bg;        // Background color

        var color_stops = "";

        this._stops.map( (o) => {
            color_stops += '<stop offset=  "'+o.offset+'%" style="stop-color:'+o.color+'; "/>"';
        })

        // Gradient images  GREEN > YELLOW > ORANGE > RED
        var gradient =  'data:image/svg,' + '<svg>'+
                        '<defs> "'+
                        '<linearGradient id="gg" x1="0%" y1="100%" x2="0%" y2="0%"> "'+
                        color_stops +
                        '</linearGradient> "'+
                        '</defs>"'+
                        '<rect x="0" y="0" width="'+ww+'" height="'+hh+'" fill="url(#gg)"/>"'+
                        '</svg>"';

        // Construct 'grid' to overlay the gradient image
        var grid = 'data:image/svg,' + "<svg>";

        grid += "<g><path d = '";
        for(var i = 0; i <= cols; i++ )
        {
            grid += " M" + (i*dx) + ",0 V " + hh; // VERTICAL LINES
        }
        grid += "' stroke='"+bg+"' stroke-width='"+gg+"'/></g>";

        grid += "<g><path d = '";
        for(var j = 0; j <= rows; j++ )
        {
            grid += " M 0," + (j*dy) + " H " + ww; // HORIZONTAL LINES
        }
        grid += "' stroke='"+bg+"' stroke-width='"+gg+"'/></g>";

        grid += "</svg>";

        // Construct:   compImg <-- [ gradImg + gridImg ]
        //
        // Construct final image (equalImg) with (gradImg) gradient and (gridImg) "window frame" over top.
        var rootObj = scene.create({ t: "object", parent: this._parent,    w: ww, h: hh });
        var compImg = scene.create({ t: "rect",   parent: rootObj, w: ww, h: hh, fillColor: bg });

        // Construct 'gradImg' with gradient image
        var gradRes = scene.create({ t: "imageResource", w: ww, h: hh, url: gradient });
        var gradImg = scene.create({ t: "image",  parent: compImg, resource: gradRes });

        // Construct 'gridImg' of "window frame" overlay.
        var gridRes = scene.create({ t: "imageResource", w: ww, h: hh, url: grid     });
        var gridImg = scene.create({ t: "image",  parent: compImg, resource: gridRes });

    if(false)
    { var halftone, y, x, halftoneRes, halftoneSVG, gridW, gridH; }

        var assets = [compImg.ready, gradRes.ready, gradImg.ready, gridRes.ready, gridImg.ready];

        var gradReady = Promise.all( assets ).then( function(o)
        {
            compImg.painting = false; // Create composite image
            gradImg.remove(); gradRes = gradImg = null; // ... dump the bits !
            gridImg.remove(); gridRes = gridImg = null; // ... dump the bits !

            assets = null;
        });

        // Create black rectangles to hide columns of 'equalImg'
        function createBlackout()
        {
            blocksObj = scene.create({ t: "object", parent: rootObj, x:0, y:0, w: ww, h: hh, draw: false });
            for(var i = 0; i < cols; i++ )
            {
                blackout[i] = scene.create({ t: "rect", parent: blocksObj, x: (dx * i), dy: 0, w: dx, h: dy * zero, fillColor: bg });
                blackout_ready.push( blackout[i].ready );
            }
            blocksObj.draw = true;
        }

        function randomInt(min, max)
        {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        // Randomly size black rectangles to hide columns of 'equalImg' from top-down
        function updateEqualizer()
        {
            if(blocksObj != undefined)
            {
                blocksObj.draw = false;
                for(var i = 0; i < cols; i++ )
                {
                    blackout[i].h = randomInt(1,rows - 1) * dy;
                }
                blocksObj.draw = true;
            }
        }

        createBlackout();

    // blackout_ready.push(gradReady);

        this._ready = Promise.all(blackout_ready);

        // Public Methods
        this.start = function()
        {
            timer = setInterval(updateEqualizer, this._t);
        };

        this.stop = function()
        {
            if(timer)
            {
                clearInterval(timer);
                timer = null;
            }
        };
    }//ctor

}//CLASS

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

//module.exports = EqualizerSVG;



/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EqualizerSVG__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EqualizerSVG */ "./EqualizerSVG.js");



px.import({
     scene: 'px:scene.1.js'
   // equSVG: 'root:EqualizerSVG.js'
}).then( function importsAreReady(imports)
{
    var scene = imports.scene;
    var root  = scene.root;

    var blues = [
        { offset:   0, color: "#00b"},
        { offset:  25, color: "#00b"},
        { offset:  50, color: "#44d"},
        { offset:  75, color: "#88e"},
        { offset: 100, color: "#abf"},
    ];

    var greens = [
        { offset:   0, color: "#0b0"},
        { offset:  25, color: "#0b0"},
        { offset:  50, color: "#4d4"},
        { offset:  75, color: "#8e8"},
        { offset: 100, color: "#fff"},
    ];

    var reds = [
        { offset: 100, color: "#b00"},
        { offset:  75, color: "#b00"},
        { offset:  50, color: "#d44"},
        { offset:  25, color: "#e88"},
        { offset:   0, color: "#fab"},
    ];

    var styles =
    [
       // { parent: root, x:   150, y:   2, w: 900, h: 600, t: 300, rows: 10, cols:  20, grid:  5, bg: "#101", zero: 1 },

        { parent: root, x:   2, y:   2, w: 422, h: 236, t: 300, rows: 10, cols:  20, grid:  5, bg: "#101" },
        { parent: root, x: 428, y:   2, w: 422, h: 236, t: 300, rows:  5, cols:   9, grid:  6, bg: "#222222" },
        { parent: root, x: 854, y:   2, w: 422, h: 236, t: 300, rows: 60, cols: 120, grid:  2, bg: "#111" },
        { parent: root, x:   2, y: 242, w: 422, h: 236, t: 300, rows: 20, cols:  40, grid:  5, bg: "#121" },
        { parent: root, x: 428, y: 242, w: 422, h: 236, t: 300, rows: 50, cols:  20, grid:  2, bg: "#202220" },
        { parent: root, x: 854, y: 242, w: 422, h: 236, t: 400, rows: 40, cols:  20, grid:  4, bg: "#101" },
        { parent: root, x:   2, y: 482, w: 422, h: 236, t: 300, rows: 5,  cols:   8, grid:  5, bg: "#449", stops: blues},
        { parent: root, x: 428, y: 482, w: 422, h: 236, t: 300, rows: 30, cols:  25, grid:  2, bg: "#595", stops: greens},
        { parent: root, x: 854, y: 482, w: 422, h: 236, t: 400, rows: 10, cols:   5, grid: 12, bg: "#966", stops: reds },
    ];

    styles.map( (s, i) =>
    {
        var equ = new _EqualizerSVG__WEBPACK_IMPORTED_MODULE_0__["default"](scene, s);

        equ.ready.then(
            (resolve) =>
            {
                equ.x = s.x;
                equ.y = s.y;

                equ.start();
            },
            (reject) =>
            {
                console.error("SVG >> Create of EqualizerSVG() failed - ", reject);
            }
        );
    })

}).catch( function importFailed(err)
{
    console.error("SVG >> Import failed for index.js: " + err);
});


/***/ }),

/***/ 0:
/*!************************!*\
  !*** multi ./index.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/hfitzp200/XRE2/fitzer_Examples/SparkExamples/EqualizerSVG/index.js */"./index.js");


/***/ })

/******/ });
//# sourceMappingURL=output.js.map