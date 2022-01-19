// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"sass/main.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"images/cart.png":[function(require,module,exports) {
module.exports = "/cart.6b493076.png";
},{}],"images/head.png":[function(require,module,exports) {
module.exports = "/head.3bdcaf92.png";
},{}],"images/lamp.png":[function(require,module,exports) {
module.exports = "/lamp.22916a3f.png";
},{}],"images/quotes.png":[function(require,module,exports) {
module.exports = "/quotes.13d917a9.png";
},{}],"images/pencil.png":[function(require,module,exports) {
module.exports = "/pencil.272bda6b.png";
},{}],"images/archive.png":[function(require,module,exports) {
module.exports = "/archive.d824c1fd.png";
},{}],"images/bin.png":[function(require,module,exports) {
module.exports = "/bin.1b663461.png";
},{}],"js/renderOperations.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.categoryMarkupEl = categoryMarkupEl;
exports.markupEl = markupEl;
exports.archivedMarkupEl = archivedMarkupEl;

var _cart = _interopRequireDefault(require("../images/cart.png"));

var _head = _interopRequireDefault(require("../images/head.png"));

var _lamp = _interopRequireDefault(require("../images/lamp.png"));

var _quotes = _interopRequireDefault(require("../images/quotes.png"));

var _pencil = _interopRequireDefault(require("../images/pencil.png"));

var _archive = _interopRequireDefault(require("../images/archive.png"));

var _bin = _interopRequireDefault(require("../images/bin.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function categoryMarkupEl(data, editNoteId, taskActiveEl, taskArchiivedEl, randomeActiveEl, randomeArchiivedEl, ideaActiveEl, ideaArchiivedEl, quoteActiveEl, quoteArchiivedEl) {
  var noteName = '';
  var activeEl = '';
  var archivedEl = '';
  return data.map(function (el) {
    switch (el) {
      case 'Task':
        noteName = _cart.default;
        activeEl = taskActiveEl.length;
        archivedEl = taskArchiivedEl.length;
        break;

      case 'Random Thought':
        noteName = _head.default;
        activeEl = randomeActiveEl.length;
        archivedEl = randomeArchiivedEl.length;
        break;

      case 'Idea':
        noteName = _lamp.default;
        activeEl = ideaActiveEl.length;
        archivedEl = ideaArchiivedEl.length;
        break;

      case 'Quote':
        noteName = _quotes.default;
        activeEl = quoteActiveEl.length;
        archivedEl = quoteArchiivedEl.length;
        break;

      default:
        noteName = _cart.default;
        break;
    }

    return "<tr id=\"".concat(el.id, "\" class='archived'>\n  <td><img class=\"noteIcon\" src='").concat(noteName, "' alt='noteName' width='30' height='30' /></td>\n  <td>").concat(el, "</td>\n  <td>").concat(activeEl, "</td>\n  <td>").concat(archivedEl, "</td>\n  \n  \n</tr>");
  }).join('');
}

function markupEl(data) {
  var noteName = '';
  var btnSub = document.getElementById('sbtBtn');
  btnSub.classList.remove('isHidden');
  return data.map(function (el) {
    switch (el.category) {
      case 'Task':
        noteName = _cart.default;
        break;

      case 'Random Thought':
        noteName = _head.default;
        break;

      case 'Idea':
        noteName = _lamp.default;
        break;

      case 'Quote':
        noteName = _quotes.default;
        break;

      default:
        noteName = _cart.default;
        break;
    }

    return "<tr id=\"".concat(el.id, "\" class='active'>\n  <td><img class=\"noteIcon\" src='").concat(noteName, "' alt='noteName' width='30' height='30' /></td>\n  <td>").concat(el.name, "</td>\n  <td>").concat(el.created, "</td>\n  <td>").concat(el.category, "</td>\n  <td>").concat(el.сontent, "</td>\n  <td>").concat(el.dates, "</td>\n  <td><img  src='").concat(_pencil.default, "' alt='pencil' width='30' height='30' /></td>\n  <td><img  src='").concat(_archive.default, "' alt='archive' width='30' height='30' /></td>\n  <td><img  src=\"").concat(_bin.default, "\" alt='bin' width='30' height='30' /></td>\n</tr>");
  }).join('');
}

function archivedMarkupEl(data) {
  var noteName = '';
  return data.map(function (el) {
    switch (el.category) {
      case 'Task':
        noteName = _cart.default;
        break;

      case 'Random Thought':
        noteName = _head.default;
        break;

      case 'Idea':
        noteName = _lamp.default;
        break;

      case 'Quote':
        noteName = _quotes.default;
        break;

      default:
        noteName = _cart.default;
        break;
    }

    return "<tr id=\"".concat(el.id, "\" class='archived'>\n  <td><img class=\"noteIcon\" src='").concat(noteName, "' alt='noteName' width='30' height='30' /></td>\n  <td>").concat(el.name, "</td>\n  <td>").concat(el.created, "</td>\n  <td>").concat(el.category, "</td>\n  <td>").concat(el.сontent, "</td>\n  <td>").concat(el.dates, "</td>\n  <td><img  src='").concat(_pencil.default, "' alt='pencil' width='30' height='30' /></td>\n  <td><img  src='").concat(_archive.default, "' alt='archive' width='30' height='30' />Archived</td>\n  <td><img  src=\"").concat(_bin.default, "\" alt='bin' width='30' height='30' /></td>\n</tr>");
  }).join('');
}
},{"../images/cart.png":"images/cart.png","../images/head.png":"images/head.png","../images/lamp.png":"images/lamp.png","../images/quotes.png":"images/quotes.png","../images/pencil.png":"images/pencil.png","../images/archive.png":"images/archive.png","../images/bin.png":"images/bin.png"}],"data.json":[function(require,module,exports) {
module.exports = [{
  "id": "1",
  "icon": "/images/cart.png",
  "name": "Shopping list",
  "category": "Task",
  "created": "April 20, 2021",
  "сontent": "Tomatoes, bread",
  "dates": [],
  "isActive": "true"
}, {
  "id": "2",
  "icon": "/cart.6b493076.png",
  "name": "The theory of evolution",
  "category": "Random Thought",
  "created": "April 27, 2021",
  "сontent": "The evolution...",
  "dates": ["3/05/2021, 5/05/2021"],
  "isActive": "true"
}, {
  "id": "3",
  "icon": "./images/cart.png",
  "name": "New Feature",
  "category": "Idea",
  "created": "May 05, 2021",
  "сontent": "Implement new...",
  "dates": [],
  "isActive": "true"
}, {
  "id": "4",
  "icon": "./images/cart.png",
  "name": "William Gaddis",
  "category": "Quote",
  "created": "May 07, 2022",
  "сontent": "Power doesn't co...",
  "dates": [],
  "isActive": "true"
}, {
  "id": "5",
  "icon": "./images/cart.png",
  "name": "Books",
  "category": "Task",
  "created": "May 15, 2021",
  "сontent": "The Lean Startup",
  "dates": [],
  "isActive": "true"
}, {
  "id": "6",
  "icon": "./images/cart.png",
  "name": "Parker",
  "category": "Task",
  "created": "May 17, 2021",
  "сontent": "Power doesn't co...",
  "dates": [],
  "isActive": "false"
}, {
  "id": "7",
  "icon": "./images/cart.png",
  "name": "Jordan",
  "category": "Quote",
  "created": "January 03, 2022",
  "сontent": "Implement new...",
  "dates": [],
  "isActive": "false"
}];
},{}],"js/getRefs.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getRefs;

function getRefs() {
  return {
    tbodyEl: document.querySelector('tbody'),
    form: document.querySelector('form'),
    createBtn: document.querySelector('.createBtn'),
    modal: document.querySelector('.backdrop'),
    categoryEl: document.querySelector('.categoryEl')
  };
}
},{}],"../node_modules/shortid/lib/random/random-from-seed.js":[function(require,module,exports) {
'use strict';

// Found this seed-based random generator somewhere
// Based on The Central Randomizer 1.3 (C) 1997 by Paul Houle (houle@msc.cornell.edu)

var seed = 1;

/**
 * return a random number based on a seed
 * @param seed
 * @returns {number}
 */
function getNextValue() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed/(233280.0);
}

function setSeed(_seed_) {
    seed = _seed_;
}

module.exports = {
    nextValue: getNextValue,
    seed: setSeed
};

},{}],"../node_modules/shortid/lib/alphabet.js":[function(require,module,exports) {
'use strict';

var randomFromSeed = require('./random/random-from-seed');

var ORIGINAL = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-';
var alphabet;
var previousSeed;

var shuffled;

function reset() {
    shuffled = false;
}

function setCharacters(_alphabet_) {
    if (!_alphabet_) {
        if (alphabet !== ORIGINAL) {
            alphabet = ORIGINAL;
            reset();
        }
        return;
    }

    if (_alphabet_ === alphabet) {
        return;
    }

    if (_alphabet_.length !== ORIGINAL.length) {
        throw new Error('Custom alphabet for shortid must be ' + ORIGINAL.length + ' unique characters. You submitted ' + _alphabet_.length + ' characters: ' + _alphabet_);
    }

    var unique = _alphabet_.split('').filter(function(item, ind, arr){
       return ind !== arr.lastIndexOf(item);
    });

    if (unique.length) {
        throw new Error('Custom alphabet for shortid must be ' + ORIGINAL.length + ' unique characters. These characters were not unique: ' + unique.join(', '));
    }

    alphabet = _alphabet_;
    reset();
}

function characters(_alphabet_) {
    setCharacters(_alphabet_);
    return alphabet;
}

function setSeed(seed) {
    randomFromSeed.seed(seed);
    if (previousSeed !== seed) {
        reset();
        previousSeed = seed;
    }
}

function shuffle() {
    if (!alphabet) {
        setCharacters(ORIGINAL);
    }

    var sourceArray = alphabet.split('');
    var targetArray = [];
    var r = randomFromSeed.nextValue();
    var characterIndex;

    while (sourceArray.length > 0) {
        r = randomFromSeed.nextValue();
        characterIndex = Math.floor(r * sourceArray.length);
        targetArray.push(sourceArray.splice(characterIndex, 1)[0]);
    }
    return targetArray.join('');
}

function getShuffled() {
    if (shuffled) {
        return shuffled;
    }
    shuffled = shuffle();
    return shuffled;
}

/**
 * lookup shuffled letter
 * @param index
 * @returns {string}
 */
function lookup(index) {
    var alphabetShuffled = getShuffled();
    return alphabetShuffled[index];
}

function get () {
  return alphabet || ORIGINAL;
}

module.exports = {
    get: get,
    characters: characters,
    seed: setSeed,
    lookup: lookup,
    shuffled: getShuffled
};

},{"./random/random-from-seed":"../node_modules/shortid/lib/random/random-from-seed.js"}],"../node_modules/shortid/lib/random/random-byte-browser.js":[function(require,module,exports) {
'use strict';

var crypto = typeof window === 'object' && (window.crypto || window.msCrypto); // IE 11 uses window.msCrypto

var randomByte;

if (!crypto || !crypto.getRandomValues) {
    randomByte = function(size) {
        var bytes = [];
        for (var i = 0; i < size; i++) {
            bytes.push(Math.floor(Math.random() * 256));
        }
        return bytes;
    };
} else {
    randomByte = function(size) {
        return crypto.getRandomValues(new Uint8Array(size));
    };
}

module.exports = randomByte;

},{}],"../node_modules/nanoid/format.browser.js":[function(require,module,exports) {
// This file replaces `format.js` in bundlers like webpack or Rollup,
// according to `browser` config in `package.json`.

module.exports = function (random, alphabet, size) {
  // We can’t use bytes bigger than the alphabet. To make bytes values closer
  // to the alphabet, we apply bitmask on them. We look for the closest
  // `2 ** x - 1` number, which will be bigger than alphabet size. If we have
  // 30 symbols in the alphabet, we will take 31 (00011111).
  // We do not use faster Math.clz32, because it is not available in browsers.
  var mask = (2 << Math.log(alphabet.length - 1) / Math.LN2) - 1
  // Bitmask is not a perfect solution (in our example it will pass 31 bytes,
  // which is bigger than the alphabet). As a result, we will need more bytes,
  // than ID size, because we will refuse bytes bigger than the alphabet.

  // Every hardware random generator call is costly,
  // because we need to wait for entropy collection. This is why often it will
  // be faster to ask for few extra bytes in advance, to avoid additional calls.

  // Here we calculate how many random bytes should we call in advance.
  // It depends on ID length, mask / alphabet size and magic number 1.6
  // (which was selected according benchmarks).

  // -~f => Math.ceil(f) if n is float number
  // -~i => i + 1 if n is integer number
  var step = -~(1.6 * mask * size / alphabet.length)
  var id = ''

  while (true) {
    var bytes = random(step)
    // Compact alternative for `for (var i = 0; i < step; i++)`
    var i = step
    while (i--) {
      // If random byte is bigger than alphabet even after bitmask,
      // we refuse it by `|| ''`.
      id += alphabet[bytes[i] & mask] || ''
      // More compact than `id.length + 1 === size`
      if (id.length === +size) return id
    }
  }
}

},{}],"../node_modules/shortid/lib/generate.js":[function(require,module,exports) {
'use strict';

var alphabet = require('./alphabet');
var random = require('./random/random-byte');
var format = require('nanoid/format');

function generate(number) {
    var loopCounter = 0;
    var done;

    var str = '';

    while (!done) {
        str = str + format(random, alphabet.get(), 1);
        done = number < (Math.pow(16, loopCounter + 1 ) );
        loopCounter++;
    }
    return str;
}

module.exports = generate;

},{"./alphabet":"../node_modules/shortid/lib/alphabet.js","./random/random-byte":"../node_modules/shortid/lib/random/random-byte-browser.js","nanoid/format":"../node_modules/nanoid/format.browser.js"}],"../node_modules/shortid/lib/build.js":[function(require,module,exports) {
'use strict';

var generate = require('./generate');
var alphabet = require('./alphabet');

// Ignore all milliseconds before a certain time to reduce the size of the date entropy without sacrificing uniqueness.
// This number should be updated every year or so to keep the generated id short.
// To regenerate `new Date() - 0` and bump the version. Always bump the version!
var REDUCE_TIME = 1567752802062;

// don't change unless we change the algos or REDUCE_TIME
// must be an integer and less than 16
var version = 7;

// Counter is used when shortid is called multiple times in one second.
var counter;

// Remember the last time shortid was called in case counter is needed.
var previousSeconds;

/**
 * Generate unique id
 * Returns string id
 */
function build(clusterWorkerId) {
    var str = '';

    var seconds = Math.floor((Date.now() - REDUCE_TIME) * 0.001);

    if (seconds === previousSeconds) {
        counter++;
    } else {
        counter = 0;
        previousSeconds = seconds;
    }

    str = str + generate(version);
    str = str + generate(clusterWorkerId);
    if (counter > 0) {
        str = str + generate(counter);
    }
    str = str + generate(seconds);
    return str;
}

module.exports = build;

},{"./generate":"../node_modules/shortid/lib/generate.js","./alphabet":"../node_modules/shortid/lib/alphabet.js"}],"../node_modules/shortid/lib/is-valid.js":[function(require,module,exports) {
'use strict';
var alphabet = require('./alphabet');

function isShortId(id) {
    if (!id || typeof id !== 'string' || id.length < 6 ) {
        return false;
    }

    var nonAlphabetic = new RegExp('[^' +
      alphabet.get().replace(/[|\\{}()[\]^$+*?.-]/g, '\\$&') +
    ']');
    return !nonAlphabetic.test(id);
}

module.exports = isShortId;

},{"./alphabet":"../node_modules/shortid/lib/alphabet.js"}],"../node_modules/shortid/lib/util/cluster-worker-id-browser.js":[function(require,module,exports) {
'use strict';

module.exports = 0;

},{}],"../node_modules/shortid/lib/index.js":[function(require,module,exports) {
'use strict';

var alphabet = require('./alphabet');
var build = require('./build');
var isValid = require('./is-valid');

// if you are using cluster or multiple servers use this to make each instance
// has a unique value for worker
// Note: I don't know if this is automatically set when using third
// party cluster solutions such as pm2.
var clusterWorkerId = require('./util/cluster-worker-id') || 0;

/**
 * Set the seed.
 * Highly recommended if you don't want people to try to figure out your id schema.
 * exposed as shortid.seed(int)
 * @param seed Integer value to seed the random alphabet.  ALWAYS USE THE SAME SEED or you might get overlaps.
 */
function seed(seedValue) {
    alphabet.seed(seedValue);
    return module.exports;
}

/**
 * Set the cluster worker or machine id
 * exposed as shortid.worker(int)
 * @param workerId worker must be positive integer.  Number less than 16 is recommended.
 * returns shortid module so it can be chained.
 */
function worker(workerId) {
    clusterWorkerId = workerId;
    return module.exports;
}

/**
 *
 * sets new characters to use in the alphabet
 * returns the shuffled alphabet
 */
function characters(newCharacters) {
    if (newCharacters !== undefined) {
        alphabet.characters(newCharacters);
    }

    return alphabet.shuffled();
}

/**
 * Generate unique id
 * Returns string id
 */
function generate() {
  return build(clusterWorkerId);
}

// Export all other functions as properties of the generate function
module.exports = generate;
module.exports.generate = generate;
module.exports.seed = seed;
module.exports.worker = worker;
module.exports.characters = characters;
module.exports.isValid = isValid;

},{"./alphabet":"../node_modules/shortid/lib/alphabet.js","./build":"../node_modules/shortid/lib/build.js","./is-valid":"../node_modules/shortid/lib/is-valid.js","./util/cluster-worker-id":"../node_modules/shortid/lib/util/cluster-worker-id-browser.js"}],"../node_modules/shortid/index.js":[function(require,module,exports) {
'use strict';
module.exports = require('./lib/index');

},{"./lib/index":"../node_modules/shortid/lib/index.js"}],"index.js":[function(require,module,exports) {
"use strict";

require("./sass/main.scss");

var _renderOperations = require("./js/renderOperations");

var _data = _interopRequireDefault(require("./data.json"));

var _getRefs = _interopRequireDefault(require("./js//getRefs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var shortid = require('shortid');

var activeNotes = [];
var archivedNotes = [];
var editId;
var taskItemActive = [];
var taskItemArch = [];
var randomeItemActive = [];
var randomeItemArch = [];
var ideaItemActive = [];
var ideaItemArch = [];
var quoteItemActive = [];
var quoteItemArch = [];
var on = 'true';
var refs = (0, _getRefs.default)();
refs.form.addEventListener('submit', onFormSubmit);
refs.createBtn.addEventListener('click', onCreateClick);
refs.tbodyEl.addEventListener('click', onFormClick);
window.addEventListener('click', onClick);

function filterByStatus(notes) {
  notes.map(function (el) {
    if (el.isActive === 'true') {
      activeNotes.push(el);
    } else {
      archivedNotes.push(el);
    }
  });
}

filterByStatus(_data.default);
var notesMarkup = (0, _renderOperations.markupEl)(activeNotes);
renderActiveNotes(notesMarkup);
filterByCategories(activeNotes, archivedNotes);

function filterByCategories(activeNotes, archivedNotes) {
  var mas = [].concat(_toConsumableArray(activeNotes), _toConsumableArray(archivedNotes));
  var result = mas.map(function (el) {
    return el.category;
  }).filter(function (item, index, arr) {
    return arr.indexOf(item) === index;
  });
  activeNotes.forEach(function (el) {
    switch (el.category) {
      case 'Task':
        taskItemActive.push(el);
        break;

      case 'Random Thought':
        randomeItemActive.push(el);
        break;

      case 'Idea':
        ideaItemActive.push(el);
        break;

      case 'Quote':
        quoteItemActive.push(el);
        break;

      default:
        break;
    }
  });
  archivedNotes.forEach(function (el) {
    switch (el.category) {
      case 'Task':
        taskItemArch.push(el);
        break;

      case 'Random Thought':
        randomeItemArch.push(el);
        break;

      case 'Idea':
        ideaItemArch.push(el);
        break;

      case 'Quote':
        quoteItemArch.push(el);
        break;

      default:
        break;
    }
  });
  var notesMarkup = (0, _renderOperations.categoryMarkupEl)(result, editId, taskItemActive, taskItemArch, randomeItemActive, randomeItemArch, ideaItemActive, ideaItemArch, quoteItemActive, quoteItemArch);
  renderCategories(notesMarkup);
}

function onFormSubmit(e) {
  e.preventDefault();
  makeEmptyAllArr();

  if (!editId) {
    activeNotes.push({
      id: shortid.generate(),
      name: e.target[0].value,
      category: e.target[1].value,
      created: new Date().toLocaleDateString(),
      сontent: e.target[2].value,
      dates: e.target[2].value.match(/\b\d+.|\/|-\d+.|\/|-\d+\b/g) ? [e.target[2].value.match(/\b\d+.|\/|-\d+.|\/|-\d+\b/g).join('')] : [],
      isActive: 'true'
    });
  }

  activeNotes.forEach(function (el) {
    if (el.id === editId) {
      el.name = document.getElementById('fname').value;
      el.category = document.getElementById('category').value;
      el.сontent = document.getElementById('сontent').value;
      var categDateValue = document.getElementById('сontent').value.match(/\b\d+.|\/|-\d+.|\/|-\d+\b/g);

      if (categDateValue) {
        el.dates.push(categDateValue.join(''));
      }
    }
  });
  var newNotesMarkup = (0, _renderOperations.markupEl)(activeNotes);
  renderActiveNotes(newNotesMarkup);
  filterByCategories(activeNotes, archivedNotes);
}

function onCreateClick() {
  editId = '';
  refs.modal.classList.add('isOpen');
}

function onFormClick(e) {
  if (!e.target.alt) {
    return;
  }

  switch (e.target.alt) {
    case 'pencil':
      onEditNote(e);
      break;

    case 'archive':
      onArchiveNote(e.target.parentElement.parentElement);
      break;

    case 'bin':
      onRemoveNote(e.target.parentElement.parentElement);
      break;

    default:
      break;
  }
}

function onEditNote(e) {
  editId = e.target.parentElement.parentElement.id.toString();
  document.getElementById('fname').value = e.target.parentElement.parentElement.children[1].textContent;
  document.getElementById('сontent').value = e.target.parentElement.parentElement.children[4].textContent;
  onOpenModal(e);
}

function onArchiveNote(e) {
  makeEmptyAllArr();

  if (e.className === 'active') {
    activeNotes.forEach(function (el, index) {
      if (el.id === e.id) {
        if (el.isActive === 'true') {
          el.isActive = 'false';
          archivedNotes.push(el);
          activeNotes.splice(index, 1);

          var _notesMarkup = (0, _renderOperations.markupEl)(activeNotes);

          renderActiveNotes(_notesMarkup);
        }
      }
    });
  }

  if (e.className === 'archived') {
    archivedNotes.forEach(function (el, index) {
      if (el.id === e.id) {
        if (el.isActive === 'false') {
          el.isActive = 'true';
          activeNotes.push(el);
          archivedNotes.splice(index, 1);

          var _notesMarkup2 = (0, _renderOperations.archivedMarkupEl)(archivedNotes);

          renderActiveNotes(_notesMarkup2);
        }
      }
    });
  }

  filterByCategories(activeNotes, archivedNotes);
}

function onRemoveNote(_ref) {
  var id = _ref.id;
  makeEmptyAllArr();
  var index = activeNotes.findIndex(function (el) {
    return el.id === id;
  });

  if (index !== -1) {
    activeNotes.splice(index, 1);
  }

  var delNotes = (0, _renderOperations.markupEl)(activeNotes);
  renderActiveNotes(delNotes);
  filterByCategories(activeNotes, archivedNotes);
}

function onClick(e) {
  if (e.target === refs.modal) {
    onCloseModal(e);
  }

  if (e.target === document.getElementById('archiveId')) {
    on === 'true' ? onArchiveRender(e) : onActiveRender(activeNotes);
  }
}

function onCloseModal(e) {
  refs.modal.classList.remove('isOpen');
}

function onOpenModal(e) {
  refs.modal.classList.add('isOpen');
}

function renderCategories(notesMarkup) {
  refs.categoryEl.innerHTML = '';
  refs.categoryEl.insertAdjacentHTML('beforeend', notesMarkup);
}

function onArchiveRender(e) {
  on = 'false';
  var btnSub = document.getElementById('sbtBtn');
  btnSub.classList.add('isHidden');
  var notesMarkup = (0, _renderOperations.archivedMarkupEl)(archivedNotes);
  renderActiveNotes(notesMarkup);
}

function onActiveRender(e) {
  on = 'true';
  var notesMarkup = (0, _renderOperations.markupEl)(activeNotes);
  renderActiveNotes(notesMarkup);
}

function renderActiveNotes(newNotesMarkup) {
  refs.tbodyEl.innerHTML = '';
  refs.tbodyEl.insertAdjacentHTML('beforeend', newNotesMarkup);
  onCloseModal();
}

function makeEmptyAllArr() {
  taskItemActive = [];
  taskItemArch = [];
  randomeItemActive = [];
  randomeItemArch = [];
  ideaItemActive = [];
  ideaItemArch = [];
  quoteItemActive = [];
  quoteItemArch = [];
}
},{"./sass/main.scss":"sass/main.scss","./js/renderOperations":"js/renderOperations.js","./data.json":"data.json","./js//getRefs":"js/getRefs.js","shortid":"../node_modules/shortid/index.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61321" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.js.map