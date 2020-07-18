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
})({"js/view/dom-elements.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  form: document.getElementById('submit-form'),
  type: document.getElementById('type'),
  description: document.getElementById('description'),
  amount: document.getElementById('amount'),
  tableBody: document.getElementById('table-body'),
  table: document.getElementById('table'),
  total: document.getElementById('total'),
  login: document.getElementById('login'),
  logout: document.getElementById('logout'),
  user: document.getElementById('user')
};
exports.default = _default;
},{}],"js/model/table-model.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _domElements = _interopRequireDefault(require("../view/dom-elements"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TableRow = /*#__PURE__*/function () {
  function TableRow(type, description, amount) {
    _classCallCheck(this, TableRow);

    this.type = type;
    this.description = description;
    this.amount = amount;
  }

  _createClass(TableRow, [{
    key: "appendRow",
    value: function appendRow(state) {
      var rowMarkup = "\n      <tr data-id=".concat((Math.random() * 1000000000000).toFixed(), " class=\" ").concat(this.type === 'expense' ? 'negative' : 'positive', "\">\n        <td>").concat(this.type, "</td>\n        <td>").concat(this.description, "</td>\n        <td class=\"relative\">\n          <span class=\"amount\">").concat(this.type === 'income' ? '+' : '-', " $").concat(new Intl.NumberFormat().format(this.amount), "</span>\n        <button class='remove-button row-button ui button red'>remove</button>\n        </td>\n      </tr>\n    ");
      state.markUp.push(rowMarkup);

      _domElements.default.tableBody.insertAdjacentHTML('beforeend', rowMarkup);
    }
  }]);

  return TableRow;
}();

exports.default = TableRow;
},{"../view/dom-elements":"js/view/dom-elements.js"}],"js/controller/form-controller.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderState = renderState;
exports.clearFields = clearFields;
exports.showUser = showUser;
exports.hideUser = hideUser;
exports.updateUser = updateUser;
exports.startApp = startApp;

var _domElements = _interopRequireDefault(require("../view/dom-elements"));

var _tableModel = _interopRequireDefault(require("../model/table-model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var state = {
  markUp: []
};

function saveLocalStorage(obj) {
  localStorage.setItem("".concat(state.user.Ea, " - ").concat(state.user.Qt.Bd), JSON.stringify(obj));
}

function updateTotal() {
  var amountElements = document.querySelectorAll('.amount');
  var amounts = Array.from(amountElements).map(function (el) {
    return el.innerText;
  });
  var total = amounts.reduce(function (acc, cur) {
    var curNumber = +cur.replace(',', '').slice(3);

    if (cur.startsWith('+')) {
      return acc + curNumber;
    }

    return acc - curNumber;
  }, 0);
  _domElements.default.total.innerText = "$".concat(new Intl.NumberFormat().format(total));
  state = _objectSpread(_objectSpread({}, state), {}, {
    total: total
  });
}

function RemoveFeature(idString) {
  var removeButtons = document.querySelectorAll('.remove-button');
  removeButtons.forEach(function (i) {
    i.addEventListener('click', function (e) {
      var rowIndex = e.target.parentElement.parentElement.rowIndex;

      if (rowIndex > -1) {
        _domElements.default.table.deleteRow(rowIndex);

        updateTotal();
        var id = e.target.parentElement.parentElement.getAttribute('data-id'); // update state

        var filteredMarkup = state.markUp.filter(function (row) {
          return !row.includes("data-id=".concat(id));
        });
        state = _objectSpread(_objectSpread({}, state), {}, {
          markUp: filteredMarkup
        }); // update local storage state

        localStorage.setItem(idString, JSON.stringify(state));
      }
    });
  });
}

function renderState(appState, idString) {
  state = _objectSpread({}, appState);
  appState.markUp.forEach(function (item) {
    _domElements.default.tableBody.insertAdjacentHTML('beforeend', item);
  });
  _domElements.default.total.innerText = state.total;
  RemoveFeature(idString);
  updateTotal();
}

function addError(el) {
  el.parentElement.parentElement.classList.add('error');
}

function removeError(el) {
  el.parentElement.parentElement.classList.remove('error');
}

function clearFields() {
  _domElements.default.description.value = '';
  _domElements.default.amount.value = '';
}

function addItem(idString) {
  var type = _domElements.default.type,
      description = _domElements.default.description,
      amount = _domElements.default.amount;
  var Row = new _tableModel.default(type.value, description.value, amount.value);

  if (description.value === '') {
    addError(description);
  }

  if (amount.value === '') {
    addError(amount);
  }

  if (description.value === '' || amount.value === '') {
    return;
  }

  if (amount.value !== '') {
    removeError(amount);
  }

  if (description.value !== '') {
    removeError(description);
  }

  Row.appendRow(state);
  RemoveFeature(idString);
  updateTotal();
  saveLocalStorage(state);
}

function showUser() {
  _domElements.default.user.innerText = "".concat(state.user.Qt.Bd, " - loged in");
}

function hideUser() {
  _domElements.default.user.innerText = '';
}

function updateUser(oauth) {
  state = _objectSpread(_objectSpread({}, state), {}, {
    user: oauth.currentUser.get()
  });
  showUser();
} //               START APP ------------------------


function startApp(oauth) {
  if (oauth.isSignedIn.get('')) {
    var _oauth$currentUser$ge = oauth.currentUser.get(),
        id = _oauth$currentUser$ge.Ea,
        name = _oauth$currentUser$ge.Qt.Bd;

    var idString = "".concat(id, " - ").concat(name);
    var appState = JSON.parse(localStorage.getItem(idString));

    if (appState && appState.markUp) {
      renderState(appState, idString);
    }

    state = _objectSpread(_objectSpread({}, state), {}, {
      user: oauth.currentUser.get()
    });
  }

  _domElements.default.form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (oauth.isSignedIn.get()) {
      var _oauth$currentUser$ge2 = oauth.currentUser.get(),
          _id = _oauth$currentUser$ge2.Ea,
          _name = _oauth$currentUser$ge2.Qt.Bd;

      var _idString = "".concat(_id, " - ").concat(_name);

      addItem(_idString);
      showUser();
    } else {
      alert('please sign in');
      clearFields();
    }
  });
} //               START APP -----------------------
},{"../view/dom-elements":"js/view/dom-elements.js","../model/table-model":"js/model/table-model.js"}],"js/googleAuth.js":[function(require,module,exports) {
"use strict";

var _domElements = _interopRequireDefault(require("./view/dom-elements"));

var _formController = require("./controller/form-controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var clientId = '52903164096-g27rl2a8tbbsutfeidohcj1cdgbqbj0d.apps.googleusercontent.com';

function CheckSignedIn(signedIn) {
  if (signedIn) {
    _domElements.default.logout.style.display = 'block';
    _domElements.default.login.style.display = 'none';
  } else {
    _domElements.default.login.style.display = 'block';
    _domElements.default.logout.style.display = 'none';
    (0, _formController.hideUser)();
    _domElements.default.tableBody.innerHTML = '';
    _domElements.default.total.innerText = '';
  }
}

window.gapi.load('client:auth2', function () {
  window.gapi.client.init({
    clientId: clientId,
    scope: 'email'
  }).then(function () {
    var instance = window.gapi.auth2.getAuthInstance();
    CheckSignedIn(instance.isSignedIn.get());

    _domElements.default.login.addEventListener('click', function () {
      instance.signIn().then(function () {
        (0, _formController.updateUser)(instance);
        (0, _formController.startApp)(instance);
      }).catch(function (err) {
        console.log(err);
      });
    });

    _domElements.default.logout.addEventListener('click', function () {
      instance.signOut();
    });

    instance.isSignedIn.listen(function (signedIn) {
      (0, _formController.clearFields)();
      CheckSignedIn(signedIn);
    });
    (0, _formController.startApp)(instance);
  });
});
},{"./view/dom-elements":"js/view/dom-elements.js","./controller/form-controller":"js/controller/form-controller.js"}],"js/index.js":[function(require,module,exports) {
"use strict";

require("./googleAuth");

require("./controller/form-controller");
},{"./googleAuth":"js/googleAuth.js","./controller/form-controller":"js/controller/form-controller.js"}],"../node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60113" + '/');

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
},{}]},{},["../node_modules/parcel/src/builtins/hmr-runtime.js","js/index.js"], null)
//# sourceMappingURL=/js.00a46daa.js.map