// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, cache, entry, mainEntry, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject.parcelRequire === 'function' &&
    globalObject.parcelRequire;
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof parcelRequire === 'function' && parcelRequire;
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

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
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
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  globalObject.parcelRequire = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})(
  {
    ufS1p: [
      function (require, module, exports) {
        var global = arguments[3];
        var HMR_HOST = null;
        var HMR_PORT = 1234;
        var HMR_ENV_HASH = 'd751713988987e9331980363e24189ce';
        module.bundle.HMR_BUNDLE_ID = '899adfd83f01e228e2d715c48975b657';
        /* global HMR_HOST, HMR_PORT, HMR_ENV_HASH */

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
            },
          };
          module.bundle.hotData = null;
        }

        module.bundle.Module = Module;
        var checkedAssets, assetsToAccept, acceptedAssets; // eslint-disable-next-line no-redeclare

        var parent = module.bundle.parent;

        if (
          (!parent || !parent.isParcelRequire) &&
          typeof WebSocket !== 'undefined'
        ) {
          var hostname =
            HMR_HOST ||
            (location.protocol.indexOf('http') === 0
              ? location.hostname
              : 'localhost');
          var port = HMR_PORT || location.port;
          var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
          var ws = new WebSocket(
            protocol + '://' + hostname + (port ? ':' + port : '') + '/'
          );

          ws.onmessage = function (event) {
            checkedAssets = {};
            assetsToAccept = [];
            acceptedAssets = {};
            var data = JSON.parse(event.data);

            if (data.type === 'update') {
              // Remove error overlay if there is one
              removeErrorOverlay();
              let assets = data.assets.filter(
                asset => asset.envHash === HMR_ENV_HASH
              ); // Handle HMR Update

              var handled = false;
              assets.forEach(asset => {
                var didAccept =
                  asset.type === 'css' ||
                  hmrAcceptCheck(global.parcelRequire, asset.id);

                if (didAccept) {
                  handled = true;
                }
              });

              if (handled) {
                console.clear();
                assets.forEach(function (asset) {
                  hmrApply(global.parcelRequire, asset);
                });

                for (var i = 0; i < assetsToAccept.length; i++) {
                  var id = assetsToAccept[i][1];

                  if (!acceptedAssets[id]) {
                    hmrAcceptRun(assetsToAccept[i][0], id);
                  }
                }
              } else {
                window.location.reload();
              }
            }

            if (data.type === 'error') {
              // Log parcel errors to console
              for (let ansiDiagnostic of data.diagnostics.ansi) {
                let stack = ansiDiagnostic.codeframe
                  ? ansiDiagnostic.codeframe
                  : ansiDiagnostic.stack;
                console.error(
                  '🚨 [parcel]: ' +
                    ansiDiagnostic.message +
                    '\n' +
                    stack +
                    '\n\n' +
                    ansiDiagnostic.hints.join('\n')
                );
              } // Render the fancy html overlay

              removeErrorOverlay();
              var overlay = createErrorOverlay(data.diagnostics.html);
              document.body.appendChild(overlay);
            }
          };

          ws.onerror = function (e) {
            console.error(e.message);
          };

          ws.onclose = function (e) {
            console.warn('[parcel] 🚨 Connection to the HMR server was lost');
          };
        }

        function removeErrorOverlay() {
          var overlay = document.getElementById(OVERLAY_ID);

          if (overlay) {
            overlay.remove();
            console.log('[parcel] ✨ Error resolved');
          }
        }

        function createErrorOverlay(diagnostics) {
          var overlay = document.createElement('div');
          overlay.id = OVERLAY_ID;
          let errorHTML =
            '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';

          for (let diagnostic of diagnostics) {
            let stack = diagnostic.codeframe
              ? diagnostic.codeframe
              : diagnostic.stack;
            errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
          }

          errorHTML += '</div>';
          overlay.innerHTML = errorHTML;
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

              if (
                dep === id ||
                (Array.isArray(dep) && dep[dep.length - 1] === id)
              ) {
                parents.push([bundle, k]);
              }
            }
          }

          if (bundle.parent) {
            parents = parents.concat(getParents(bundle.parent, id));
          }

          return parents;
        }

        function updateLink(link) {
          var newLink = link.cloneNode();

          newLink.onload = function () {
            if (link.parentNode !== null) {
              link.parentNode.removeChild(link);
            }
          };

          newLink.setAttribute(
            'href',
            link.getAttribute('href').split('?')[0] + '?' + Date.now()
          );
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
              var href = links[i].getAttribute('href');
              var absolute =
                /^https?:\/\//i.test(href) &&
                href.indexOf(window.location.origin) !== 0;

              if (!absolute) {
                updateLink(links[i]);
              }
            }

            cssTimeout = null;
          }, 50);
        }

        function hmrApply(bundle, asset) {
          var modules = bundle.modules;

          if (!modules) {
            return;
          }

          if (modules[asset.id] || !bundle.parent) {
            if (asset.type === 'css') {
              reloadCSS();
            } else {
              var fn = new Function(
                'require',
                'module',
                'exports',
                asset.output
              );
              modules[asset.id] = [
                fn,
                asset.depsByBundle[bundle.HMR_BUNDLE_ID],
              ];
            }
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

          return getParents(global.parcelRequire, id).some(function (v) {
            return hmrAcceptCheck(v[0], v[1]);
          });
        }

        function hmrAcceptRun(bundle, id) {
          var cached = bundle.cache[id];
          bundle.hotData = {};

          if (cached && cached.hot) {
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
              var assetsToAlsoAccept = cb(function () {
                return getParents(global.parcelRequire, id);
              });

              if (assetsToAlsoAccept && assetsToAccept.length) {
                assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
              }
            });
          }

          acceptedAssets[id] = true;
        }
      },
      {},
    ],
    '4iKEs': [
      function (require, module, exports) {
        require('./bundle-manifest').register(
          JSON.parse(
            '{"4bEJ3":"index.899adfd8.js","674lE":"icons.c8e35105.svg"}'
          )
        );
      },
      { './bundle-manifest': '5G1rV' },
    ],
    '5G1rV': [
      function (require, module, exports) {
        'use strict';

        var mapping = {};

        function register(pairs) {
          var keys = Object.keys(pairs);

          for (var i = 0; i < keys.length; i++) {
            mapping[keys[i]] = pairs[keys[i]];
          }
        }

        function resolve(id) {
          var resolved = mapping[id];

          if (resolved == null) {
            throw new Error('Could not resolve bundle with id ' + id);
          }

          return resolved;
        }

        module.exports.register = register;
        module.exports.resolve = resolve;
      },
      {},
    ],
    I5Uh7: [
      function (require, module, exports) {
        'use strict';

        require('core-js/modules/web.immediate.js');

        var _recipeView = _interopRequireDefault(
          require('./views/recipeView.js')
        );

        var _searchView = _interopRequireDefault(
          require('./views/searchView.js')
        );

        var model = _interopRequireWildcard(require('./model.js'));

        require('regenerator-runtime');

        var _resultsView = _interopRequireDefault(
          require('./views/resultsView.js')
        );

        function _getRequireWildcardCache(nodeInterop) {
          if (typeof WeakMap !== 'function') return null;
          var cacheBabelInterop = new WeakMap();
          var cacheNodeInterop = new WeakMap();
          return (_getRequireWildcardCache = function (nodeInterop) {
            return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
          })(nodeInterop);
        }

        function _interopRequireWildcard(obj, nodeInterop) {
          if (!nodeInterop && obj && obj.__esModule) {
            return obj;
          }
          if (
            obj === null ||
            (typeof obj !== 'object' && typeof obj !== 'function')
          ) {
            return { default: obj };
          }
          var cache = _getRequireWildcardCache(nodeInterop);
          if (cache && cache.has(obj)) {
            return cache.get(obj);
          }
          var newObj = {};
          var hasPropertyDescriptor =
            Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var key in obj) {
            if (
              key !== 'default' &&
              Object.prototype.hasOwnProperty.call(obj, key)
            ) {
              var desc = hasPropertyDescriptor
                ? Object.getOwnPropertyDescriptor(obj, key)
                : null;
              if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
              } else {
                newObj[key] = obj[key];
              }
            }
          }
          newObj.default = obj;
          if (cache) {
            cache.set(obj, newObj);
          }
          return newObj;
        }

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        const controlRecipes = async function () {
          try {
            const id = window.location.hash.slice(1);
            if (!id) return;

            _recipeView.default.renderSpinner(); // Load the recipe:

            await model.loadRecipe(id); // rendering recipe

            _recipeView.default.render(model.state.recipe);
          } catch (err) {
            _recipeView.default.renderError();
          }
        };

        const controllSearchResult = async function () {
          try {
            _resultsView.default.renderSpinner();

            const input = _searchView.default.getQueryInput();

            console.log(input);
            if (!input) return;
            await model.loadSearchResults(input);
          } catch (err) {}
        };

        const init = function () {
          _recipeView.default.addHandlerRender(controlRecipes);

          _searchView.default.addHandlerSearch(controllSearchResult);
        };

        init();
      },
      {
        'core-js/modules/web.immediate.js': 'BQdWp',
        './views/recipeView.js': '5K27E',
        './views/searchView.js': '61k0n',
        './model.js': '5cc2Y',
        'regenerator-runtime': '6Rcwf',
        './views/resultsView.js': '794dY',
      },
    ],
    BQdWp: [
      function (require, module, exports) {
        var $ = require('../internals/export');

        var global = require('../internals/global');

        var task = require('../internals/task');

        var FORCED = !global.setImmediate || !global.clearImmediate; // http://w3c.github.io/setImmediate/

        $(
          {
            global: true,
            bind: true,
            enumerable: true,
            forced: FORCED,
          },
          {
            // `setImmediate` method
            // http://w3c.github.io/setImmediate/#si-setImmediate
            setImmediate: task.set,
            // `clearImmediate` method
            // http://w3c.github.io/setImmediate/#si-clearImmediate
            clearImmediate: task.clear,
          }
        );
      },
      {
        '../internals/export': 'udQu1',
        '../internals/global': '3QE6y',
        '../internals/task': '6JyaN',
      },
    ],
    udQu1: [
      function (require, module, exports) {
        var global = require('../internals/global');

        var getOwnPropertyDescriptor =
          require('../internals/object-get-own-property-descriptor').f;

        var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');

        var redefine = require('../internals/redefine');

        var setGlobal = require('../internals/set-global');

        var copyConstructorProperties = require('../internals/copy-constructor-properties');

        var isForced = require('../internals/is-forced');
        /*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
  options.name        - the .name of the function if it does not match the key
*/

        module.exports = function (options, source) {
          var TARGET = options.target;
          var GLOBAL = options.global;
          var STATIC = options.stat;
          var FORCED, target, key, targetProperty, sourceProperty, descriptor;

          if (GLOBAL) {
            target = global;
          } else if (STATIC) {
            target = global[TARGET] || setGlobal(TARGET, {});
          } else {
            target = (global[TARGET] || {}).prototype;
          }

          if (target)
            for (key in source) {
              sourceProperty = source[key];

              if (options.noTargetGet) {
                descriptor = getOwnPropertyDescriptor(target, key);
                targetProperty = descriptor && descriptor.value;
              } else targetProperty = target[key];

              FORCED = isForced(
                GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key,
                options.forced
              ); // contained in target

              if (!FORCED && targetProperty !== undefined) {
                if (typeof sourceProperty == typeof targetProperty) continue;
                copyConstructorProperties(sourceProperty, targetProperty);
              } // add a flag to not completely full polyfills

              if (options.sham || (targetProperty && targetProperty.sham)) {
                createNonEnumerableProperty(sourceProperty, 'sham', true);
              } // extend global

              redefine(target, key, sourceProperty, options);
            }
        };
      },
      {
        '../internals/global': '3QE6y',
        '../internals/object-get-own-property-descriptor': '2Ryil',
        '../internals/create-non-enumerable-property': '5vRca',
        '../internals/redefine': '5CYSz',
        '../internals/set-global': '3QhVN',
        '../internals/copy-constructor-properties': '6NTsM',
        '../internals/is-forced': '3pmgM',
      },
    ],
    '3QE6y': [
      function (require, module, exports) {
        var global = arguments[3];

        var check = function (it) {
          return it && it.Math == Math && it;
        }; // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028

        module.exports = // eslint-disable-next-line es/no-global-this -- safe
          check(typeof globalThis == 'object' && globalThis) ||
          check(typeof window == 'object' && window) || // eslint-disable-next-line no-restricted-globals -- safe
          check(typeof self == 'object' && self) ||
          check(typeof global == 'object' && global) || // eslint-disable-next-line no-new-func -- fallback
          (function () {
            return this;
          })() ||
          Function('return this')();
      },
      {},
    ],
    '2Ryil': [
      function (require, module, exports) {
        var DESCRIPTORS = require('../internals/descriptors');
        var call = require('../internals/function-call');
        var propertyIsEnumerableModule = require('../internals/object-property-is-enumerable');
        var createPropertyDescriptor = require('../internals/create-property-descriptor');
        var toIndexedObject = require('../internals/to-indexed-object');
        var toPropertyKey = require('../internals/to-property-key');
        var hasOwn = require('../internals/has-own-property');
        var IE8_DOM_DEFINE = require('../internals/ie8-dom-define');

        // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
        var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

        // `Object.getOwnPropertyDescriptor` method
        // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
        exports.f = DESCRIPTORS
          ? $getOwnPropertyDescriptor
          : function getOwnPropertyDescriptor(O, P) {
              O = toIndexedObject(O);
              P = toPropertyKey(P);
              if (IE8_DOM_DEFINE)
                try {
                  return $getOwnPropertyDescriptor(O, P);
                } catch (error) {
                  /* empty */
                }
              if (hasOwn(O, P))
                return createPropertyDescriptor(
                  !call(propertyIsEnumerableModule.f, O, P),
                  O[P]
                );
            };
      },
      {
        '../internals/descriptors': '3PLe7',
        '../internals/function-call': '3xJQY',
        '../internals/object-property-is-enumerable': '3kqXl',
        '../internals/create-property-descriptor': '4gNUQ',
        '../internals/to-indexed-object': '6MjLM',
        '../internals/to-property-key': '6N772',
        '../internals/has-own-property': '6CnZP',
        '../internals/ie8-dom-define': '6P7bK',
      },
    ],
    '3PLe7': [
      function (require, module, exports) {
        var fails = require('../internals/fails');

        // Detect IE8's incomplete defineProperty implementation
        module.exports = !fails(function () {
          // eslint-disable-next-line es/no-object-defineproperty -- required for testing
          return (
            Object.defineProperty({}, 1, {
              get: function () {
                return 7;
              },
            })[1] != 7
          );
        });
      },
      { '../internals/fails': '6RolC' },
    ],
    '6RolC': [
      function (require, module, exports) {
        module.exports = function (exec) {
          try {
            return !!exec();
          } catch (error) {
            return true;
          }
        };
      },
      {},
    ],
    '3xJQY': [
      function (require, module, exports) {
        var call = Function.prototype.call;

        module.exports = call.bind
          ? call.bind(call)
          : function () {
              return call.apply(call, arguments);
            };
      },
      {},
    ],
    '3kqXl': [
      function (require, module, exports) {
        'use strict';
        var $propertyIsEnumerable = {}.propertyIsEnumerable;
        // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
        var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

        // Nashorn ~ JDK8 bug
        var NASHORN_BUG =
          getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

        // `Object.prototype.propertyIsEnumerable` method implementation
        // https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
        exports.f = NASHORN_BUG
          ? function propertyIsEnumerable(V) {
              var descriptor = getOwnPropertyDescriptor(this, V);
              return !!descriptor && descriptor.enumerable;
            }
          : $propertyIsEnumerable;
      },
      {},
    ],
    '4gNUQ': [
      function (require, module, exports) {
        module.exports = function (bitmap, value) {
          return {
            enumerable: !(bitmap & 1),
            configurable: !(bitmap & 2),
            writable: !(bitmap & 4),
            value: value,
          };
        };
      },
      {},
    ],
    '6MjLM': [
      function (require, module, exports) {
        // toObject with fallback for non-array-like ES3 strings
        var IndexedObject = require('../internals/indexed-object');
        var requireObjectCoercible = require('../internals/require-object-coercible');

        module.exports = function (it) {
          return IndexedObject(requireObjectCoercible(it));
        };
      },
      {
        '../internals/indexed-object': '1Dim5',
        '../internals/require-object-coercible': '2CseM',
      },
    ],
    '1Dim5': [
      function (require, module, exports) {
        var global = require('../internals/global');

        var uncurryThis = require('../internals/function-uncurry-this');

        var fails = require('../internals/fails');

        var classof = require('../internals/classof-raw');

        var Object = global.Object;
        var split = uncurryThis(''.split); // fallback for non-array-like ES3 and non-enumerable old V8 strings

        module.exports = fails(function () {
          // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
          // eslint-disable-next-line no-prototype-builtins -- safe
          return !Object('z').propertyIsEnumerable(0);
        })
          ? function (it) {
              return classof(it) == 'String' ? split(it, '') : Object(it);
            }
          : Object;
      },
      {
        '../internals/global': '3QE6y',
        '../internals/function-uncurry-this': '5DJz1',
        '../internals/fails': '6RolC',
        '../internals/classof-raw': '4nWLu',
      },
    ],
    '5DJz1': [
      function (require, module, exports) {
        var FunctionPrototype = Function.prototype;
        var bind = FunctionPrototype.bind;
        var call = FunctionPrototype.call;
        var callBind = bind && bind.bind(call);

        module.exports = bind
          ? function (fn) {
              return fn && callBind(call, fn);
            }
          : function (fn) {
              return (
                fn &&
                function () {
                  return call.apply(fn, arguments);
                }
              );
            };
      },
      {},
    ],
    '4nWLu': [
      function (require, module, exports) {
        var uncurryThis = require('../internals/function-uncurry-this');

        var toString = uncurryThis({}.toString);
        var stringSlice = uncurryThis(''.slice);

        module.exports = function (it) {
          return stringSlice(toString(it), 8, -1);
        };
      },
      { '../internals/function-uncurry-this': '5DJz1' },
    ],
    '2CseM': [
      function (require, module, exports) {
        var global = require('../internals/global');

        var TypeError = global.TypeError; // `RequireObjectCoercible` abstract operation
        // https://tc39.es/ecma262/#sec-requireobjectcoercible

        module.exports = function (it) {
          if (it == undefined) throw TypeError("Can't call method on " + it);
          return it;
        };
      },
      { '../internals/global': '3QE6y' },
    ],
    '6N772': [
      function (require, module, exports) {
        var toPrimitive = require('../internals/to-primitive');
        var isSymbol = require('../internals/is-symbol');

        // `ToPropertyKey` abstract operation
        // https://tc39.es/ecma262/#sec-topropertykey
        module.exports = function (argument) {
          var key = toPrimitive(argument, 'string');
          return isSymbol(key) ? key : key + '';
        };
      },
      {
        '../internals/to-primitive': '1ibJ6',
        '../internals/is-symbol': '3yMvb',
      },
    ],
    '1ibJ6': [
      function (require, module, exports) {
        var global = require('../internals/global');

        var call = require('../internals/function-call');

        var isObject = require('../internals/is-object');

        var isSymbol = require('../internals/is-symbol');

        var getMethod = require('../internals/get-method');

        var ordinaryToPrimitive = require('../internals/ordinary-to-primitive');

        var wellKnownSymbol = require('../internals/well-known-symbol');

        var TypeError = global.TypeError;
        var TO_PRIMITIVE = wellKnownSymbol('toPrimitive'); // `ToPrimitive` abstract operation
        // https://tc39.es/ecma262/#sec-toprimitive

        module.exports = function (input, pref) {
          if (!isObject(input) || isSymbol(input)) return input;
          var exoticToPrim = getMethod(input, TO_PRIMITIVE);
          var result;

          if (exoticToPrim) {
            if (pref === undefined) pref = 'default';
            result = call(exoticToPrim, input, pref);
            if (!isObject(result) || isSymbol(result)) return result;
            throw TypeError("Can't convert object to primitive value");
          }

          if (pref === undefined) pref = 'number';
          return ordinaryToPrimitive(input, pref);
        };
      },
      {
        '../internals/global': '3QE6y',
        '../internals/function-call': '3xJQY',
        '../internals/is-object': '5Vzhx',
        '../internals/is-symbol': '3yMvb',
        '../internals/get-method': '2xu8c',
        '../internals/ordinary-to-primitive': '5NSzy',
        '../internals/well-known-symbol': '6NW33',
      },
    ],
    '5Vzhx': [
      function (require, module, exports) {
        var isCallable = require('../internals/is-callable');

        module.exports = function (it) {
          return typeof it == 'object' ? it !== null : isCallable(it);
        };
      },
      { '../internals/is-callable': '1thi8' },
    ],
    '1thi8': [
      function (require, module, exports) {
        // `IsCallable` abstract operation
        // https://tc39.es/ecma262/#sec-iscallable
        module.exports = function (argument) {
          return typeof argument == 'function';
        };
      },
      {},
    ],
    '3yMvb': [
      function (require, module, exports) {
        var global = require('../internals/global');

        var getBuiltIn = require('../internals/get-built-in');

        var isCallable = require('../internals/is-callable');

        var isPrototypeOf = require('../internals/object-is-prototype-of');

        var USE_SYMBOL_AS_UID = require('../internals/use-symbol-as-uid');

        var Object = global.Object;
        module.exports = USE_SYMBOL_AS_UID
          ? function (it) {
              return typeof it == 'symbol';
            }
          : function (it) {
              var $Symbol = getBuiltIn('Symbol');
              return (
                isCallable($Symbol) &&
                isPrototypeOf($Symbol.prototype, Object(it))
              );
            };
      },
      {
        '../internals/global': '3QE6y',
        '../internals/get-built-in': '58IGb',
        '../internals/is-callable': '1thi8',
        '../internals/object-is-prototype-of': '2z5yx',
        '../internals/use-symbol-as-uid': '77JS8',
      },
    ],
    '58IGb': [
      function (require, module, exports) {
        var global = require('../internals/global');

        var isCallable = require('../internals/is-callable');

        var aFunction = function (argument) {
          return isCallable(argument) ? argument : undefined;
        };

        module.exports = function (namespace, method) {
          return arguments.length < 2
            ? aFunction(global[namespace])
            : global[namespace] && global[namespace][method];
        };
      },
      { '../internals/global': '3QE6y', '../internals/is-callable': '1thi8' },
    ],
    '2z5yx': [
      function (require, module, exports) {
        var uncurryThis = require('../internals/function-uncurry-this');

        module.exports = uncurryThis({}.isPrototypeOf);
      },
      { '../internals/function-uncurry-this': '5DJz1' },
    ],
    '77JS8': [
      function (require, module, exports) {
        /* eslint-disable es/no-symbol -- required for testing */
        var NATIVE_SYMBOL = require('../internals/native-symbol');

        module.exports =
          NATIVE_SYMBOL && !Symbol.sham && typeof Symbol.iterator == 'symbol';
      },
      { '../internals/native-symbol': '7rSLB' },
    ],
    '7rSLB': [
      function (require, module, exports) {
        /* eslint-disable es/no-symbol -- required for testing */
        var V8_VERSION = require('../internals/engine-v8-version');
        var fails = require('../internals/fails');

        // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
        module.exports =
          !!Object.getOwnPropertySymbols &&
          !fails(function () {
            var symbol = Symbol();
            // Chrome 38 Symbol has incorrect toString conversion
            // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
            return (
              !String(symbol) ||
              !(Object(symbol) instanceof Symbol) ||
              // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
              (!Symbol.sham && V8_VERSION && V8_VERSION < 41)
            );
          });
      },
      {
        '../internals/engine-v8-version': '6SQie',
        '../internals/fails': '6RolC',
      },
    ],
    '6SQie': [
      function (require, module, exports) {
        var global = require('../internals/global');

        var userAgent = require('../internals/engine-user-agent');

        var process = global.process;
        var Deno = global.Deno;
        var versions = (process && process.versions) || (Deno && Deno.version);
        var v8 = versions && versions.v8;
        var match, version;

        if (v8) {
          match = v8.split('.'); // in old Chrome, versions of V8 isn't V8 = Chrome / 10
          // but their correct versions are not interesting for us

          version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
        } // BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
        // so check `userAgent` even if `.v8` exists, but 0

        if (!version && userAgent) {
          match = userAgent.match(/Edge\/(\d+)/);

          if (!match || match[1] >= 74) {
            match = userAgent.match(/Chrome\/(\d+)/);
            if (match) version = +match[1];
          }
        }

        module.exports = version;
      },
      {
        '../internals/global': '3QE6y',
        '../internals/engine-user-agent': 'CbkQs',
      },
    ],
    CbkQs: [
      function (require, module, exports) {
        var getBuiltIn = require('../internals/get-built-in');

        module.exports = getBuiltIn('navigator', 'userAgent') || '';
      },
      { '../internals/get-built-in': '58IGb' },
    ],
    '2xu8c': [
      function (require, module, exports) {
        var aCallable = require('../internals/a-callable');

        // `GetMethod` abstract operation
        // https://tc39.es/ecma262/#sec-getmethod
        module.exports = function (V, P) {
          var func = V[P];
          return func == null ? undefined : aCallable(func);
        };
      },
      { '../internals/a-callable': '6tRnO' },
    ],
    '6tRnO': [
      function (require, module, exports) {
        var global = require('../internals/global');

        var isCallable = require('../internals/is-callable');

        var tryToString = require('../internals/try-to-string');

        var TypeError = global.TypeError; // `Assert: IsCallable(argument) is true`

        module.exports = function (argument) {
          if (isCallable(argument)) return argument;
          throw TypeError(tryToString(argument) + ' is not a function');
        };
      },
      {
        '../internals/global': '3QE6y',
        '../internals/is-callable': '1thi8',
        '../internals/try-to-string': '1WdHx',
      },
    ],
    '1WdHx': [
      function (require, module, exports) {
        var global = require('../internals/global');

        var String = global.String;

        module.exports = function (argument) {
          try {
            return String(argument);
          } catch (error) {
            return 'Object';
          }
        };
      },
      { '../internals/global': '3QE6y' },
    ],
    '5NSzy': [
      function (require, module, exports) {
        var global = require('../internals/global');

        var call = require('../internals/function-call');

        var isCallable = require('../internals/is-callable');

        var isObject = require('../internals/is-object');

        var TypeError = global.TypeError; // `OrdinaryToPrimitive` abstract operation
        // https://tc39.es/ecma262/#sec-ordinarytoprimitive

        module.exports = function (input, pref) {
          var fn, val;
          if (
            pref === 'string' &&
            isCallable((fn = input.toString)) &&
            !isObject((val = call(fn, input)))
          )
            return val;
          if (
            isCallable((fn = input.valueOf)) &&
            !isObject((val = call(fn, input)))
          )
            return val;
          if (
            pref !== 'string' &&
            isCallable((fn = input.toString)) &&
            !isObject((val = call(fn, input)))
          )
            return val;
          throw TypeError("Can't convert object to primitive value");
        };
      },
      {
        '../internals/global': '3QE6y',
        '../internals/function-call': '3xJQY',
        '../internals/is-callable': '1thi8',
        '../internals/is-object': '5Vzhx',
      },
    ],
    '6NW33': [
      function (require, module, exports) {
        var global = require('../internals/global');

        var shared = require('../internals/shared');

        var hasOwn = require('../internals/has-own-property');

        var uid = require('../internals/uid');

        var NATIVE_SYMBOL = require('../internals/native-symbol');

        var USE_SYMBOL_AS_UID = require('../internals/use-symbol-as-uid');

        var WellKnownSymbolsStore = shared('wks');
        var Symbol = global.Symbol;
        var symbolFor = Symbol && Symbol['for'];
        var createWellKnownSymbol = USE_SYMBOL_AS_UID
          ? Symbol
          : (Symbol && Symbol.withoutSetter) || uid;

        module.exports = function (name) {
          if (
            !hasOwn(WellKnownSymbolsStore, name) ||
            !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')
          ) {
            var description = 'Symbol.' + name;

            if (NATIVE_SYMBOL && hasOwn(Symbol, name)) {
              WellKnownSymbolsStore[name] = Symbol[name];
            } else if (USE_SYMBOL_AS_UID && symbolFor) {
              WellKnownSymbolsStore[name] = symbolFor(description);
            } else {
              WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
            }
          }

          return WellKnownSymbolsStore[name];
        };
      },
      {
        '../internals/global': '3QE6y',
        '../internals/shared': 'LLN6U',
        '../internals/has-own-property': '6CnZP',
        '../internals/uid': '6vhpp',
        '../internals/native-symbol': '7rSLB',
        '../internals/use-symbol-as-uid': '77JS8',
      },
    ],
    LLN6U: [
      function (require, module, exports) {
        var IS_PURE = require('../internals/is-pure');
        var store = require('../internals/shared-store');

        (module.exports = function (key, value) {
          return store[key] || (store[key] = value !== undefined ? value : {});
        })('versions', []).push({
          version: '3.19.1',
          mode: IS_PURE ? 'pure' : 'global',
          copyright: '© 2021 Denis Pushkarev (zloirock.ru)',
        });
      },
      { '../internals/is-pure': '7wQwG', '../internals/shared-store': '9xRnt' },
    ],
    '7wQwG': [
      function (require, module, exports) {
        module.exports = false;
      },
      {},
    ],
    '9xRnt': [
      function (require, module, exports) {
        var global = require('../internals/global');

        var setGlobal = require('../internals/set-global');

        var SHARED = '__core-js_shared__';
        var store = global[SHARED] || setGlobal(SHARED, {});
        module.exports = store;
      },
      { '../internals/global': '3QE6y', '../internals/set-global': '3QhVN' },
    ],
    '3QhVN': [
      function (require, module, exports) {
        var global = require('../internals/global'); // eslint-disable-next-line es/no-object-defineproperty -- safe

        var defineProperty = Object.defineProperty;

        module.exports = function (key, value) {
          try {
            defineProperty(global, key, {
              value: value,
              configurable: true,
              writable: true,
            });
          } catch (error) {
            global[key] = value;
          }

          return value;
        };
      },
      { '../internals/global': '3QE6y' },
    ],
    '6CnZP': [
      function (require, module, exports) {
        var uncurryThis = require('../internals/function-uncurry-this');
        var toObject = require('../internals/to-object');

        var hasOwnProperty = uncurryThis({}.hasOwnProperty);

        // `HasOwnProperty` abstract operation
        // https://tc39.es/ecma262/#sec-hasownproperty
        module.exports =
          Object.hasOwn ||
          function hasOwn(it, key) {
            return hasOwnProperty(toObject(it), key);
          };
      },
      {
        '../internals/function-uncurry-this': '5DJz1',
        '../internals/to-object': '1a5sF',
      },
    ],
    '1a5sF': [
      function (require, module, exports) {
        var global = require('../internals/global');

        var requireObjectCoercible = require('../internals/require-object-coercible');

        var Object = global.Object; // `ToObject` abstract operation
        // https://tc39.es/ecma262/#sec-toobject

        module.exports = function (argument) {
          return Object(requireObjectCoercible(argument));
        };
      },
      {
        '../internals/global': '3QE6y',
        '../internals/require-object-coercible': '2CseM',
      },
    ],
    '6vhpp': [
      function (require, module, exports) {
        var uncurryThis = require('../internals/function-uncurry-this');

        var id = 0;
        var postfix = Math.random();
        var toString = uncurryThis((1.0).toString);

        module.exports = function (key) {
          return (
            'Symbol(' +
            (key === undefined ? '' : key) +
            ')_' +
            toString(++id + postfix, 36)
          );
        };
      },
      { '../internals/function-uncurry-this': '5DJz1' },
    ],
    '6P7bK': [
      function (require, module, exports) {
        var DESCRIPTORS = require('../internals/descriptors');
        var fails = require('../internals/fails');
        var createElement = require('../internals/document-create-element');

        // Thank's IE8 for his funny defineProperty
        module.exports =
          !DESCRIPTORS &&
          !fails(function () {
            // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
            return (
              Object.defineProperty(createElement('div'), 'a', {
                get: function () {
                  return 7;
                },
              }).a != 7
            );
          });
      },
      {
        '../internals/descriptors': '3PLe7',
        '../internals/fails': '6RolC',
        '../internals/document-create-element': '6cJR6',
      },
    ],
    '6cJR6': [
      function (require, module, exports) {
        var global = require('../internals/global');

        var isObject = require('../internals/is-object');

        var document = global.document; // typeof document.createElement is 'object' in old IE

        var EXISTS = isObject(document) && isObject(document.createElement);

        module.exports = function (it) {
          return EXISTS ? document.createElement(it) : {};
        };
      },
      { '../internals/global': '3QE6y', '../internals/is-object': '5Vzhx' },
    ],
    '5vRca': [
      function (require, module, exports) {
        var DESCRIPTORS = require('../internals/descriptors');
        var definePropertyModule = require('../internals/object-define-property');
        var createPropertyDescriptor = require('../internals/create-property-descriptor');

        module.exports = DESCRIPTORS
          ? function (object, key, value) {
              return definePropertyModule.f(
                object,
                key,
                createPropertyDescriptor(1, value)
              );
            }
          : function (object, key, value) {
              object[key] = value;
              return object;
            };
      },
      {
        '../internals/descriptors': '3PLe7',
        '../internals/object-define-property': '33oDq',
        '../internals/create-property-descriptor': '4gNUQ',
      },
    ],
    '33oDq': [
      function (require, module, exports) {
        var global = require('../internals/global');

        var DESCRIPTORS = require('../internals/descriptors');

        var IE8_DOM_DEFINE = require('../internals/ie8-dom-define');

        var anObject = require('../internals/an-object');

        var toPropertyKey = require('../internals/to-property-key');

        var TypeError = global.TypeError; // eslint-disable-next-line es/no-object-defineproperty -- safe

        var $defineProperty = Object.defineProperty; // `Object.defineProperty` method
        // https://tc39.es/ecma262/#sec-object.defineproperty

        exports.f = DESCRIPTORS
          ? $defineProperty
          : function defineProperty(O, P, Attributes) {
              anObject(O);
              P = toPropertyKey(P);
              anObject(Attributes);
              if (IE8_DOM_DEFINE)
                try {
                  return $defineProperty(O, P, Attributes);
                } catch (error) {
                  /* empty */
                }
              if ('get' in Attributes || 'set' in Attributes)
                throw TypeError('Accessors not supported');
              if ('value' in Attributes) O[P] = Attributes.value;
              return O;
            };
      },
      {
        '../internals/global': '3QE6y',
        '../internals/descriptors': '3PLe7',
        '../internals/ie8-dom-define': '6P7bK',
        '../internals/an-object': '2pjt0',
        '../internals/to-property-key': '6N772',
      },
    ],
    '2pjt0': [
      function (require, module, exports) {
        var global = require('../internals/global');

        var isObject = require('../internals/is-object');

        var String = global.String;
        var TypeError = global.TypeError; // `Assert: Type(argument) is Object`

        module.exports = function (argument) {
          if (isObject(argument)) return argument;
          throw TypeError(String(argument) + ' is not an object');
        };
      },
      { '../internals/global': '3QE6y', '../internals/is-object': '5Vzhx' },
    ],
    '5CYSz': [
      function (require, module, exports) {
        var global = require('../internals/global');

        var isCallable = require('../internals/is-callable');

        var hasOwn = require('../internals/has-own-property');

        var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');

        var setGlobal = require('../internals/set-global');

        var inspectSource = require('../internals/inspect-source');

        var InternalStateModule = require('../internals/internal-state');

        var CONFIGURABLE_FUNCTION_NAME =
          require('../internals/function-name').CONFIGURABLE;

        var getInternalState = InternalStateModule.get;
        var enforceInternalState = InternalStateModule.enforce;
        var TEMPLATE = String(String).split('String');
        (module.exports = function (O, key, value, options) {
          var unsafe = options ? !!options.unsafe : false;
          var simple = options ? !!options.enumerable : false;
          var noTargetGet = options ? !!options.noTargetGet : false;
          var name = options && options.name !== undefined ? options.name : key;
          var state;

          if (isCallable(value)) {
            if (String(name).slice(0, 7) === 'Symbol(') {
              name =
                '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
            }

            if (
              !hasOwn(value, 'name') ||
              (CONFIGURABLE_FUNCTION_NAME && value.name !== name)
            ) {
              createNonEnumerableProperty(value, 'name', name);
            }

            state = enforceInternalState(value);

            if (!state.source) {
              state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
            }
          }

          if (O === global) {
            if (simple) O[key] = value;
            else setGlobal(key, value);
            return;
          } else if (!unsafe) {
            delete O[key];
          } else if (!noTargetGet && O[key]) {
            simple = true;
          }

          if (simple) O[key] = value;
          else createNonEnumerableProperty(O, key, value); // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
        })(Function.prototype, 'toString', function toString() {
          return (
            (isCallable(this) && getInternalState(this).source) ||
            inspectSource(this)
          );
        });
      },
      {
        '../internals/global': '3QE6y',
        '../internals/is-callable': '1thi8',
        '../internals/has-own-property': '6CnZP',
        '../internals/create-non-enumerable-property': '5vRca',
        '../internals/set-global': '3QhVN',
        '../internals/inspect-source': '1a4XO',
        '../internals/internal-state': '4fsLu',
        '../internals/function-name': '4hjkn',
      },
    ],
    '1a4XO': [
      function (require, module, exports) {
        var uncurryThis = require('../internals/function-uncurry-this');
        var isCallable = require('../internals/is-callable');
        var store = require('../internals/shared-store');

        var functionToString = uncurryThis(Function.toString);

        // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
        if (!isCallable(store.inspectSource)) {
          store.inspectSource = function (it) {
            return functionToString(it);
          };
        }

        module.exports = store.inspectSource;
      },
      {
        '../internals/function-uncurry-this': '5DJz1',
        '../internals/is-callable': '1thi8',
        '../internals/shared-store': '9xRnt',
      },
    ],
    '4fsLu': [
      function (require, module, exports) {
        var NATIVE_WEAK_MAP = require('../internals/native-weak-map');

        var global = require('../internals/global');

        var uncurryThis = require('../internals/function-uncurry-this');

        var isObject = require('../internals/is-object');

        var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');

        var hasOwn = require('../internals/has-own-property');

        var shared = require('../internals/shared-store');

        var sharedKey = require('../internals/shared-key');

        var hiddenKeys = require('../internals/hidden-keys');

        var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
        var TypeError = global.TypeError;
        var WeakMap = global.WeakMap;
        var set, get, has;

        var enforce = function (it) {
          return has(it) ? get(it) : set(it, {});
        };

        var getterFor = function (TYPE) {
          return function (it) {
            var state;

            if (!isObject(it) || (state = get(it)).type !== TYPE) {
              throw TypeError('Incompatible receiver, ' + TYPE + ' required');
            }

            return state;
          };
        };

        if (NATIVE_WEAK_MAP || shared.state) {
          var store = shared.state || (shared.state = new WeakMap());
          var wmget = uncurryThis(store.get);
          var wmhas = uncurryThis(store.has);
          var wmset = uncurryThis(store.set);

          set = function (it, metadata) {
            if (wmhas(store, it))
              throw new TypeError(OBJECT_ALREADY_INITIALIZED);
            metadata.facade = it;
            wmset(store, it, metadata);
            return metadata;
          };

          get = function (it) {
            return wmget(store, it) || {};
          };

          has = function (it) {
            return wmhas(store, it);
          };
        } else {
          var STATE = sharedKey('state');
          hiddenKeys[STATE] = true;

          set = function (it, metadata) {
            if (hasOwn(it, STATE))
              throw new TypeError(OBJECT_ALREADY_INITIALIZED);
            metadata.facade = it;
            createNonEnumerableProperty(it, STATE, metadata);
            return metadata;
          };

          get = function (it) {
            return hasOwn(it, STATE) ? it[STATE] : {};
          };

          has = function (it) {
            return hasOwn(it, STATE);
          };
        }

        module.exports = {
          set: set,
          get: get,
          has: has,
          enforce: enforce,
          getterFor: getterFor,
        };
      },
      {
        '../internals/native-weak-map': '1Ehb6',
        '../internals/global': '3QE6y',
        '../internals/function-uncurry-this': '5DJz1',
        '../internals/is-object': '5Vzhx',
        '../internals/create-non-enumerable-property': '5vRca',
        '../internals/has-own-property': '6CnZP',
        '../internals/shared-store': '9xRnt',
        '../internals/shared-key': 'L8HwJ',
        '../internals/hidden-keys': '3NPgD',
      },
    ],
    '1Ehb6': [
      function (require, module, exports) {
        var global = require('../internals/global');

        var isCallable = require('../internals/is-callable');

        var inspectSource = require('../internals/inspect-source');

        var WeakMap = global.WeakMap;
        module.exports =
          isCallable(WeakMap) && /native code/.test(inspectSource(WeakMap));
      },
      {
        '../internals/global': '3QE6y',
        '../internals/is-callable': '1thi8',
        '../internals/inspect-source': '1a4XO',
      },
    ],
    L8HwJ: [
      function (require, module, exports) {
        var shared = require('../internals/shared');
        var uid = require('../internals/uid');

        var keys = shared('keys');

        module.exports = function (key) {
          return keys[key] || (keys[key] = uid(key));
        };
      },
      { '../internals/shared': 'LLN6U', '../internals/uid': '6vhpp' },
    ],
    '3NPgD': [
      function (require, module, exports) {
        module.exports = {};
      },
      {},
    ],
    '4hjkn': [
      function (require, module, exports) {
        var DESCRIPTORS = require('../internals/descriptors');
        var hasOwn = require('../internals/has-own-property');

        var FunctionPrototype = Function.prototype;
        // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
        var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

        var EXISTS = hasOwn(FunctionPrototype, 'name');
        // additional protection from minified / mangled / dropped function names
        var PROPER =
          EXISTS &&
          function something() {
            /* empty */
          }.name === 'something';
        var CONFIGURABLE =
          EXISTS &&
          (!DESCRIPTORS ||
            (DESCRIPTORS &&
              getDescriptor(FunctionPrototype, 'name').configurable));

        module.exports = {
          EXISTS: EXISTS,
          PROPER: PROPER,
          CONFIGURABLE: CONFIGURABLE,
        };
      },
      {
        '../internals/descriptors': '3PLe7',
        '../internals/has-own-property': '6CnZP',
      },
    ],
    '6NTsM': [
      function (require, module, exports) {
        var hasOwn = require('../internals/has-own-property');
        var ownKeys = require('../internals/own-keys');
        var getOwnPropertyDescriptorModule = require('../internals/object-get-own-property-descriptor');
        var definePropertyModule = require('../internals/object-define-property');

        module.exports = function (target, source) {
          var keys = ownKeys(source);
          var defineProperty = definePropertyModule.f;
          var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
          for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (!hasOwn(target, key))
              defineProperty(
                target,
                key,
                getOwnPropertyDescriptor(source, key)
              );
          }
        };
      },
      {
        '../internals/has-own-property': '6CnZP',
        '../internals/own-keys': '59YUT',
        '../internals/object-get-own-property-descriptor': '2Ryil',
        '../internals/object-define-property': '33oDq',
      },
    ],
    '59YUT': [
      function (require, module, exports) {
        var getBuiltIn = require('../internals/get-built-in');
        var uncurryThis = require('../internals/function-uncurry-this');
        var getOwnPropertyNamesModule = require('../internals/object-get-own-property-names');
        var getOwnPropertySymbolsModule = require('../internals/object-get-own-property-symbols');
        var anObject = require('../internals/an-object');

        var concat = uncurryThis([].concat);

        // all object keys, includes non-enumerable and symbols
        module.exports =
          getBuiltIn('Reflect', 'ownKeys') ||
          function ownKeys(it) {
            var keys = getOwnPropertyNamesModule.f(anObject(it));
            var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
            return getOwnPropertySymbols
              ? concat(keys, getOwnPropertySymbols(it))
              : keys;
          };
      },
      {
        '../internals/get-built-in': '58IGb',
        '../internals/function-uncurry-this': '5DJz1',
        '../internals/object-get-own-property-names': '5tUuN',
        '../internals/object-get-own-property-symbols': '7wKea',
        '../internals/an-object': '2pjt0',
      },
    ],
    '5tUuN': [
      function (require, module, exports) {
        var internalObjectKeys = require('../internals/object-keys-internal');
        var enumBugKeys = require('../internals/enum-bug-keys');

        var hiddenKeys = enumBugKeys.concat('length', 'prototype');

        // `Object.getOwnPropertyNames` method
        // https://tc39.es/ecma262/#sec-object.getownpropertynames
        // eslint-disable-next-line es/no-object-getownpropertynames -- safe
        exports.f =
          Object.getOwnPropertyNames ||
          function getOwnPropertyNames(O) {
            return internalObjectKeys(O, hiddenKeys);
          };
      },
      {
        '../internals/object-keys-internal': '48gRc',
        '../internals/enum-bug-keys': '7AHWq',
      },
    ],
    '48gRc': [
      function (require, module, exports) {
        var uncurryThis = require('../internals/function-uncurry-this');
        var hasOwn = require('../internals/has-own-property');
        var toIndexedObject = require('../internals/to-indexed-object');
        var indexOf = require('../internals/array-includes').indexOf;
        var hiddenKeys = require('../internals/hidden-keys');

        var push = uncurryThis([].push);

        module.exports = function (object, names) {
          var O = toIndexedObject(object);
          var i = 0;
          var result = [];
          var key;
          for (key in O)
            !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
          // Don't enum bug & hidden keys
          while (names.length > i)
            if (hasOwn(O, (key = names[i++]))) {
              ~indexOf(result, key) || push(result, key);
            }
          return result;
        };
      },
      {
        '../internals/function-uncurry-this': '5DJz1',
        '../internals/has-own-property': '6CnZP',
        '../internals/to-indexed-object': '6MjLM',
        '../internals/array-includes': '4i8hc',
        '../internals/hidden-keys': '3NPgD',
      },
    ],
    '4i8hc': [
      function (require, module, exports) {
        var toIndexedObject = require('../internals/to-indexed-object');
        var toAbsoluteIndex = require('../internals/to-absolute-index');
        var lengthOfArrayLike = require('../internals/length-of-array-like');

        // `Array.prototype.{ indexOf, includes }` methods implementation
        var createMethod = function (IS_INCLUDES) {
          return function ($this, el, fromIndex) {
            var O = toIndexedObject($this);
            var length = lengthOfArrayLike(O);
            var index = toAbsoluteIndex(fromIndex, length);
            var value;
            // Array#includes uses SameValueZero equality algorithm
            // eslint-disable-next-line no-self-compare -- NaN check
            if (IS_INCLUDES && el != el)
              while (length > index) {
                value = O[index++];
                // eslint-disable-next-line no-self-compare -- NaN check
                if (value != value) return true;
                // Array#indexOf ignores holes, Array#includes - not
              }
            else
              for (; length > index; index++) {
                if ((IS_INCLUDES || index in O) && O[index] === el)
                  return IS_INCLUDES || index || 0;
              }
            return !IS_INCLUDES && -1;
          };
        };

        module.exports = {
          // `Array.prototype.includes` method
          // https://tc39.es/ecma262/#sec-array.prototype.includes
          includes: createMethod(true),
          // `Array.prototype.indexOf` method
          // https://tc39.es/ecma262/#sec-array.prototype.indexof
          indexOf: createMethod(false),
        };
      },
      {
        '../internals/to-indexed-object': '6MjLM',
        '../internals/to-absolute-index': '7Mj9C',
        '../internals/length-of-array-like': '6UvA6',
      },
    ],
    '7Mj9C': [
      function (require, module, exports) {
        var toIntegerOrInfinity = require('../internals/to-integer-or-infinity');

        var max = Math.max;
        var min = Math.min;

        // Helper for a popular repeating case of the spec:
        // Let integer be ? ToInteger(index).
        // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
        module.exports = function (index, length) {
          var integer = toIntegerOrInfinity(index);
          return integer < 0 ? max(integer + length, 0) : min(integer, length);
        };
      },
      { '../internals/to-integer-or-infinity': '19tSc' },
    ],
    '19tSc': [
      function (require, module, exports) {
        var ceil = Math.ceil;
        var floor = Math.floor;

        // `ToIntegerOrInfinity` abstract operation
        // https://tc39.es/ecma262/#sec-tointegerorinfinity
        module.exports = function (argument) {
          var number = +argument;
          // eslint-disable-next-line no-self-compare -- safe
          return number !== number || number === 0
            ? 0
            : (number > 0 ? floor : ceil)(number);
        };
      },
      {},
    ],
    '6UvA6': [
      function (require, module, exports) {
        var toLength = require('../internals/to-length');

        // `LengthOfArrayLike` abstract operation
        // https://tc39.es/ecma262/#sec-lengthofarraylike
        module.exports = function (obj) {
          return toLength(obj.length);
        };
      },
      { '../internals/to-length': '3bF3Y' },
    ],
    '3bF3Y': [
      function (require, module, exports) {
        var toIntegerOrInfinity = require('../internals/to-integer-or-infinity');

        var min = Math.min;

        // `ToLength` abstract operation
        // https://tc39.es/ecma262/#sec-tolength
        module.exports = function (argument) {
          return argument > 0
            ? min(toIntegerOrInfinity(argument), 0x1fffffffffffff)
            : 0; // 2 ** 53 - 1 == 9007199254740991
        };
      },
      { '../internals/to-integer-or-infinity': '19tSc' },
    ],
    '7AHWq': [
      function (require, module, exports) {
        // IE8- don't enum bug keys
        module.exports = [
          'constructor',
          'hasOwnProperty',
          'isPrototypeOf',
          'propertyIsEnumerable',
          'toLocaleString',
          'toString',
          'valueOf',
        ];
      },
      {},
    ],
    '7wKea': [
      function (require, module, exports) {
        // eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
        exports.f = Object.getOwnPropertySymbols;
      },
      {},
    ],
    '3pmgM': [
      function (require, module, exports) {
        var fails = require('../internals/fails');
        var isCallable = require('../internals/is-callable');

        var replacement = /#|\.prototype\./;

        var isForced = function (feature, detection) {
          var value = data[normalize(feature)];
          return value == POLYFILL
            ? true
            : value == NATIVE
            ? false
            : isCallable(detection)
            ? fails(detection)
            : !!detection;
        };

        var normalize = (isForced.normalize = function (string) {
          return String(string).replace(replacement, '.').toLowerCase();
        });

        var data = (isForced.data = {});
        var NATIVE = (isForced.NATIVE = 'N');
        var POLYFILL = (isForced.POLYFILL = 'P');

        module.exports = isForced;
      },
      { '../internals/fails': '6RolC', '../internals/is-callable': '1thi8' },
    ],
    '6JyaN': [
      function (require, module, exports) {
        var global = require('../internals/global');

        var apply = require('../internals/function-apply');

        var bind = require('../internals/function-bind-context');

        var isCallable = require('../internals/is-callable');

        var hasOwn = require('../internals/has-own-property');

        var fails = require('../internals/fails');

        var html = require('../internals/html');

        var arraySlice = require('../internals/array-slice');

        var createElement = require('../internals/document-create-element');

        var IS_IOS = require('../internals/engine-is-ios');

        var IS_NODE = require('../internals/engine-is-node');

        var set = global.setImmediate;
        var clear = global.clearImmediate;
        var process = global.process;
        var Dispatch = global.Dispatch;
        var Function = global.Function;
        var MessageChannel = global.MessageChannel;
        var String = global.String;
        var counter = 0;
        var queue = {};
        var ONREADYSTATECHANGE = 'onreadystatechange';
        var location, defer, channel, port;

        try {
          // Deno throws a ReferenceError on `location` access without `--location` flag
          location = global.location;
        } catch (error) {
          /* empty */
        }

        var run = function (id) {
          if (hasOwn(queue, id)) {
            var fn = queue[id];
            delete queue[id];
            fn();
          }
        };

        var runner = function (id) {
          return function () {
            run(id);
          };
        };

        var listener = function (event) {
          run(event.data);
        };

        var post = function (id) {
          // old engines have not location.origin
          global.postMessage(
            String(id),
            location.protocol + '//' + location.host
          );
        }; // Node.js 0.9+ & IE10+ has setImmediate, otherwise:

        if (!set || !clear) {
          set = function setImmediate(fn) {
            var args = arraySlice(arguments, 1);

            queue[++counter] = function () {
              apply(isCallable(fn) ? fn : Function(fn), undefined, args);
            };

            defer(counter);
            return counter;
          };

          clear = function clearImmediate(id) {
            delete queue[id];
          }; // Node.js 0.8-

          if (IS_NODE) {
            defer = function (id) {
              process.nextTick(runner(id));
            }; // Sphere (JS game engine) Dispatch API
          } else if (Dispatch && Dispatch.now) {
            defer = function (id) {
              Dispatch.now(runner(id));
            }; // Browsers with MessageChannel, includes WebWorkers
            // except iOS - https://github.com/zloirock/core-js/issues/624
          } else if (MessageChannel && !IS_IOS) {
            channel = new MessageChannel();
            port = channel.port2;
            channel.port1.onmessage = listener;
            defer = bind(port.postMessage, port); // Browsers with postMessage, skip WebWorkers
            // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
          } else if (
            global.addEventListener &&
            isCallable(global.postMessage) &&
            !global.importScripts &&
            location &&
            location.protocol !== 'file:' &&
            !fails(post)
          ) {
            defer = post;
            global.addEventListener('message', listener, false); // IE8-
          } else if (ONREADYSTATECHANGE in createElement('script')) {
            defer = function (id) {
              html.appendChild(createElement('script'))[ONREADYSTATECHANGE] =
                function () {
                  html.removeChild(this);
                  run(id);
                };
            }; // Rest old browsers
          } else {
            defer = function (id) {
              setTimeout(runner(id), 0);
            };
          }
        }

        module.exports = {
          set: set,
          clear: clear,
        };
      },
      {
        '../internals/global': '3QE6y',
        '../internals/function-apply': '52pOj',
        '../internals/function-bind-context': '7ByAM',
        '../internals/is-callable': '1thi8',
        '../internals/has-own-property': '6CnZP',
        '../internals/fails': '6RolC',
        '../internals/html': 'Lmakp',
        '../internals/array-slice': '6uUbQ',
        '../internals/document-create-element': '6cJR6',
        '../internals/engine-is-ios': '1v6lt',
        '../internals/engine-is-node': '220bn',
      },
    ],
    '52pOj': [
      function (require, module, exports) {
        var FunctionPrototype = Function.prototype;
        var apply = FunctionPrototype.apply;
        var bind = FunctionPrototype.bind;
        var call = FunctionPrototype.call;

        // eslint-disable-next-line es/no-reflect -- safe
        module.exports =
          (typeof Reflect == 'object' && Reflect.apply) ||
          (bind
            ? call.bind(apply)
            : function () {
                return call.apply(apply, arguments);
              });
      },
      {},
    ],
    '7ByAM': [
      function (require, module, exports) {
        var uncurryThis = require('../internals/function-uncurry-this');
        var aCallable = require('../internals/a-callable');

        var bind = uncurryThis(uncurryThis.bind);

        // optional / simple context binding
        module.exports = function (fn, that) {
          aCallable(fn);
          return that === undefined
            ? fn
            : bind
            ? bind(fn, that)
            : function (/* ...args */) {
                return fn.apply(that, arguments);
              };
        };
      },
      {
        '../internals/function-uncurry-this': '5DJz1',
        '../internals/a-callable': '6tRnO',
      },
    ],
    Lmakp: [
      function (require, module, exports) {
        var getBuiltIn = require('../internals/get-built-in');

        module.exports = getBuiltIn('document', 'documentElement');
      },
      { '../internals/get-built-in': '58IGb' },
    ],
    '6uUbQ': [
      function (require, module, exports) {
        var uncurryThis = require('../internals/function-uncurry-this');

        module.exports = uncurryThis([].slice);
      },
      { '../internals/function-uncurry-this': '5DJz1' },
    ],
    '1v6lt': [
      function (require, module, exports) {
        var userAgent = require('../internals/engine-user-agent');

        module.exports = /(?:ipad|iphone|ipod).*applewebkit/i.test(userAgent);
      },
      { '../internals/engine-user-agent': 'CbkQs' },
    ],
    '220bn': [
      function (require, module, exports) {
        var classof = require('../internals/classof-raw');

        var global = require('../internals/global');

        module.exports = classof(global.process) == 'process';
      },
      { '../internals/classof-raw': '4nWLu', '../internals/global': '3QE6y' },
    ],
    '5K27E': [
      function (require, module, exports) {
        'use strict';

        Object.defineProperty(exports, '__esModule', {
          value: true,
        });
        exports.default = void 0;

        var _View = _interopRequireDefault(require('./View.js'));

        var _icons = _interopRequireDefault(require('url:../../img/icons.svg'));

        var _fractional = _interopRequireDefault(require('fractional'));

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        class RecipeView extends _View.default {
          _parentElement = document.querySelector('.recipe');
          _data;
          _errorMessage = `Sorry, We could not find the recipe. Please find another one.`;
          _messageSucces = '';

          render(data) {
            this._data = data;

            const markup = this._generateMarkup();

            this._clear();

            this._parentElement.insertAdjacentHTML('afterbegin', markup);
          }

          _clear() {
            this._parentElement.innerHTML = '';
          }

          renderSpinner() {
            const markup = `
            <div class="spinner">
                    <svg>
                      <use href="${_icons.default}_icon-loader"></use>
                    </svg>
                  </div>
            `;

            this._clear();

            this._parentElement.insertAdjacentHTML('afterbegin', markup);
          }

          renderSucces() {
            let message =
              arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : this._messageSucces;
            const markup = `
    <div class="messages">
      <div>
        <svg>
          <use href="${_icons.default}_icon-icon-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;

            this._clear();

            this._parentElement.insertAdjacentHTML('afterbegin', markup);
          }

          renderError() {
            let message =
              arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : this._errorMessage;
            const markup = `<div class="error">
      <div>
        <svg>
          <use href='${_icons.default}_icon-alert-triangle'></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;

            this._clear();

            this._parentElement.insertAdjacentHTML('afterbegin', markup);
          }

          addHandlerRender(handler) {
            ['hashchange', 'load'].forEach(ev =>
              window.addEventListener(ev, handler)
            );
          }

          _generateMarkup() {
            return `<figure class="recipe__fig">
    <img src="${this._data.image}" alt="Tomato" class="recipe__img" />
    <h1 class="recipe__title">
      <span>${this._data.title}/span>
    </h1>
  </figure>

  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${_icons.default}_icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${
        this._data.cooking_Time
      }</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${_icons.default}_icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${
        this._data.servings
      }</span>
      <span class="recipe__info-text">servings</span>

      <div class="recipe__info-buttons">
        <button class="btn--tiny btn--increase-servings">
          <svg>
            <use href="${_icons.default}_icon-minus-circle"></use>
          </svg>
        </button>
        <button class="btn--tiny btn--increase-servings">
          <svg>
            <use href="${_icons.default}_icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>

    <div class="recipe__user-generated">
      <svg>
        <use href="${_icons.default}_icon-user"></use>
      </svg>
    </div>
    <button class="btn--round">
      <svg class="">
        <use href="${_icons.default}_icon-bookmark-fill"></use>
      </svg>
    </button>
  </div>

  <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">
      
      ${this._data.ingredients.map(this._generateMarkupIngredient).join('')}
      </ul>
      
  </div>
 
  <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${
        this._data.publisher
      }</span>. Please check out
      directions at their website.
    </p>
    <a
      class="btn--small recipe__btn"
      href="${this._data.sourceUrl}"
      target="_blank"
    >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="${_icons.default}_icon-arrow-right"></use>
      </svg>
    </a>
  </div>`;
          }

          _generateMarkupIngredient(ing) {
            return ` <li class="recipe__ingredient">
    <svg class="recipe__icon">
      <use href="${_icons.default}_icon-check"></use>
    </svg>
    <div class="recipe__quantity">${
      ing.quantity ? new _fractional.default.Fraction(ing.quantity) : ''
    }</div>
    <div class="recipe__description">
      <span class="recipe__unit">${ing.unit}</span>
      ${ing.description}
    </div>
  </li>`;
          }
        }

        var _default = new RecipeView();

        exports.default = _default;
      },
      {
        './View.js': '2YoaS',
        'url:../../img/icons.svg': '7wuzf',
        fractional: '6Kpg2',
      },
    ],
    '2YoaS': [
      function (require, module, exports) {
        'use strict';

        Object.defineProperty(exports, '__esModule', {
          value: true,
        });
        exports.default = void 0;

        var _icons = _interopRequireDefault(require('url:../../img/icons.svg'));

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        class View {
          _data;

          render(data) {
            this._data = data;

            const markup = this._generateMarkup();

            this._clear();

            this._parentElement.insertAdjacentHTML('afterbegin', markup);
          }

          _clear() {
            this._parentElement.innerHTML = '';
          }

          renderSpinner() {
            console.log('ledio');
            const markup = `
            <div class="spinner">
                    <svg>
                      <use href="${_icons.default}#icon-search"></use>
                    </svg>
                  </div>
            `;

            this._clear();

            this._parentElement.insertAdjacentHTML('afterbegin', markup);
          }

          renderSucces() {
            let message =
              arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : this._messageSucces;
            const markup = `
    <div class="messages">
      <div>
        <svg>
          <use href="${_icons.default}_icon-icon-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;

            this._clear();

            this._parentElement.insertAdjacentHTML('afterbegin', markup);
          }

          renderError() {
            let message =
              arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : this._errorMessage;
            const markup = `<div class="error">
      <div>
        <svg>
        <use href="${_icons.default}#icon-search"></use>
          
        </svg>
      </div>
      <p>${message}</p>
    </div>`;

            this._clear();

            this._parentElement.insertAdjacentHTML('afterbegin', markup);
          }
        }

        exports.default = View;
      },
      { 'url:../../img/icons.svg': '7wuzf' },
    ],
    '7wuzf': [
      function (require, module, exports) {
        module.exports =
          require('./bundle-url').getBundleURL() +
          require('./relative-path')('4bEJ3', '674lE');
      },
      { './bundle-url': '10N7P', './relative-path': 'Q4PMS' },
    ],
    '10N7P': [
      function (require, module, exports) {
        'use strict';

        /* globals document:readonly */
        var bundleURL = null;

        function getBundleURLCached() {
          if (!bundleURL) {
            bundleURL = getBundleURL();
          }

          return bundleURL;
        }

        function getBundleURL() {
          try {
            throw new Error();
          } catch (err) {
            var matches = ('' + err.stack).match(
              /(https?|file|ftp):\/\/[^)\n]+/g
            );

            if (matches) {
              return getBaseURL(matches[0]);
            }
          }

          return '/';
        }

        function getBaseURL(url) {
          return (
            ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') +
            '/'
          );
        } // TODO: Replace uses with `new URL(url).origin` when ie11 is no longer supported.

        function getOrigin(url) {
          let matches = ('' + url).match(/(https?|file|ftp):\/\/[^/]+/);

          if (!matches) {
            throw new Error('Origin not found');
          }

          return matches[0];
        }

        exports.getBundleURL = getBundleURLCached;
        exports.getBaseURL = getBaseURL;
        exports.getOrigin = getOrigin;
      },
      {},
    ],
    Q4PMS: [
      function (require, module, exports) {
        'use strict';

        var resolve = require('./bundle-manifest').resolve;

        module.exports = function (fromId, toId) {
          return relative(dirname(resolve(fromId)), resolve(toId));
        };

        function dirname(_filePath) {
          if (_filePath === '') {
            return '.';
          }

          var filePath =
            _filePath[_filePath.length - 1] === '/'
              ? _filePath.slice(0, _filePath.length - 1)
              : _filePath;
          var slashIndex = filePath.lastIndexOf('/');
          return slashIndex === -1 ? '.' : filePath.slice(0, slashIndex);
        }

        function relative(from, to) {
          if (from === to) {
            return '';
          }

          var fromParts = from.split('/');

          if (fromParts[0] === '.') {
            fromParts.shift();
          }

          var toParts = to.split('/');

          if (toParts[0] === '.') {
            toParts.shift();
          } // Find where path segments diverge.

          var i;
          var divergeIndex;

          for (
            i = 0;
            (i < toParts.length || i < fromParts.length) &&
            divergeIndex == null;
            i++
          ) {
            if (fromParts[i] !== toParts[i]) {
              divergeIndex = i;
            }
          } // If there are segments from "from" beyond the point of divergence,
          // return back up the path to that point using "..".

          var parts = [];

          for (i = 0; i < fromParts.length - divergeIndex; i++) {
            parts.push('..');
          } // If there are segments from "to" beyond the point of divergence,
          // continue using the remaining segments.

          if (toParts.length > divergeIndex) {
            parts.push.apply(parts, toParts.slice(divergeIndex));
          }

          return parts.join('/');
        }

        module.exports._dirname = dirname;
        module.exports._relative = relative;
      },
      { './bundle-manifest': '5G1rV' },
    ],
    '6Kpg2': [
      function (require, module, exports) {
        /*
fraction.js
A Javascript fraction library.

Copyright (c) 2009  Erik Garrison <erik@hypervolu.me>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

        /* Fractions */
        /*
         *
         * Fraction objects are comprised of a numerator and a denomenator.  These
         * values can be accessed at fraction.numerator and fraction.denomenator.
         *
         * Fractions are always returned and stored in lowest-form normalized format.
         * This is accomplished via Fraction.normalize.
         *
         * The following mathematical operations on fractions are supported:
         *
         * Fraction.equals
         * Fraction.add
         * Fraction.subtract
         * Fraction.multiply
         * Fraction.divide
         *
         * These operations accept both numbers and fraction objects.  (Best results
         * are guaranteed when the input is a fraction object.)  They all return a new
         * Fraction object.
         *
         * Usage:
         *
         * TODO
         *
         */

        /*
         * The Fraction constructor takes one of:
         *   an explicit numerator (integer) and denominator (integer),
         *   a string representation of the fraction (string),
         *   or a floating-point number (float)
         *
         * These initialization methods are provided for convenience.  Because of
         * rounding issues the best results will be given when the fraction is
         * constructed from an explicit integer numerator and denomenator, and not a
         * decimal number.
         *
         *
         * e.g. new Fraction(1, 2) --> 1/2
         *      new Fraction('1/2') --> 1/2
         *      new Fraction('2 3/4') --> 11/4  (prints as 2 3/4)
         *
         */
        Fraction = function (numerator, denominator) {
          /* double argument invocation */
          if (typeof numerator !== 'undefined' && denominator) {
            if (
              typeof numerator === 'number' &&
              typeof denominator === 'number'
            ) {
              this.numerator = numerator;
              this.denominator = denominator;
            } else if (
              typeof numerator === 'string' &&
              typeof denominator === 'string'
            ) {
              // what are they?
              // hmm....
              // assume they are ints?
              this.numerator = parseInt(numerator);
              this.denominator = parseInt(denominator);
            }
            /* single-argument invocation */
          } else if (typeof denominator === 'undefined') {
            num = numerator; // swap variable names for legibility
            if (typeof num === 'number') {
              // just a straight number init
              this.numerator = num;
              this.denominator = 1;
            } else if (typeof num === 'string') {
              var a, b; // hold the first and second part of the fraction, e.g. a = '1' and b = '2/3' in 1 2/3
              // or a = '2/3' and b = undefined if we are just passed a single-part number
              var arr = num.split(' ');
              if (arr[0]) a = arr[0];
              if (arr[1]) b = arr[1];
              /* compound fraction e.g. 'A B/C' */
              //  if a is an integer ...
              if (a % 1 === 0 && b && b.match('/')) {
                return new Fraction(a).add(new Fraction(b));
              } else if (a && !b) {
                /* simple fraction e.g. 'A/B' */
                if (typeof a === 'string' && a.match('/')) {
                  // it's not a whole number... it's actually a fraction without a whole part written
                  var f = a.split('/');
                  this.numerator = f[0];
                  this.denominator = f[1];
                  /* string floating point */
                } else if (typeof a === 'string' && a.match('.')) {
                  return new Fraction(parseFloat(a));
                  /* whole number e.g. 'A' */
                } else {
                  // just passed a whole number as a string
                  this.numerator = parseInt(a);
                  this.denominator = 1;
                }
              } else {
                return undefined; // could not parse
              }
            }
          }
          this.normalize();
        };

        Fraction.prototype.clone = function () {
          return new Fraction(this.numerator, this.denominator);
        };

        /* pretty-printer, converts fractions into whole numbers and fractions */
        Fraction.prototype.toString = function () {
          if (this.denominator === 'NaN') return 'NaN';
          var wholepart =
            this.numerator / this.denominator > 0
              ? Math.floor(this.numerator / this.denominator)
              : Math.ceil(this.numerator / this.denominator);
          var numerator = this.numerator % this.denominator;
          var denominator = this.denominator;
          var result = [];
          if (wholepart != 0) result.push(wholepart);
          if (numerator != 0)
            result.push(
              (wholepart === 0 ? numerator : Math.abs(numerator)) +
                '/' +
                denominator
            );
          return result.length > 0 ? result.join(' ') : 0;
        };

        /* destructively rescale the fraction by some integral factor */
        Fraction.prototype.rescale = function (factor) {
          this.numerator *= factor;
          this.denominator *= factor;
          return this;
        };

        Fraction.prototype.add = function (b) {
          var a = this.clone();
          if (b instanceof Fraction) {
            b = b.clone();
          } else {
            b = new Fraction(b);
          }
          td = a.denominator;
          a.rescale(b.denominator);
          b.rescale(td);

          a.numerator += b.numerator;

          return a.normalize();
        };

        Fraction.prototype.subtract = function (b) {
          var a = this.clone();
          if (b instanceof Fraction) {
            b = b.clone(); // we scale our argument destructively, so clone
          } else {
            b = new Fraction(b);
          }
          td = a.denominator;
          a.rescale(b.denominator);
          b.rescale(td);

          a.numerator -= b.numerator;

          return a.normalize();
        };

        Fraction.prototype.multiply = function (b) {
          var a = this.clone();
          if (b instanceof Fraction) {
            a.numerator *= b.numerator;
            a.denominator *= b.denominator;
          } else if (typeof b === 'number') {
            a.numerator *= b;
          } else {
            return a.multiply(new Fraction(b));
          }
          return a.normalize();
        };

        Fraction.prototype.divide = function (b) {
          var a = this.clone();
          if (b instanceof Fraction) {
            a.numerator *= b.denominator;
            a.denominator *= b.numerator;
          } else if (typeof b === 'number') {
            a.denominator *= b;
          } else {
            return a.divide(new Fraction(b));
          }
          return a.normalize();
        };

        Fraction.prototype.equals = function (b) {
          if (!(b instanceof Fraction)) {
            b = new Fraction(b);
          }
          // fractions that are equal should have equal normalized forms
          var a = this.clone().normalize();
          var b = b.clone().normalize();
          return a.numerator === b.numerator && a.denominator === b.denominator;
        };

        /* Utility functions */

        /* Destructively normalize the fraction to its smallest representation.
         * e.g. 4/16 -> 1/4, 14/28 -> 1/2, etc.
         * This is called after all math ops.
         */
        Fraction.prototype.normalize = (function () {
          var isFloat = function (n) {
            return (
              typeof n === 'number' &&
              ((n > 0 && n % 1 > 0 && n % 1 < 1) ||
                (n < 0 && n % -1 < 0 && n % -1 > -1))
            );
          };

          var roundToPlaces = function (n, places) {
            if (!places) {
              return Math.round(n);
            } else {
              var scalar = Math.pow(10, places);
              return Math.round(n * scalar) / scalar;
            }
          };

          return function () {
            // XXX hackish.  Is there a better way to address this issue?
            //
            /* first check if we have decimals, and if we do eliminate them
             * multiply by the 10 ^ number of decimal places in the number
             * round the number to nine decimal places
             * to avoid js floating point funnies
             */
            if (isFloat(this.denominator)) {
              var rounded = roundToPlaces(this.denominator, 9);
              var scaleup = Math.pow(
                10,
                rounded.toString().split('.')[1].length
              );
              this.denominator = Math.round(this.denominator * scaleup); // this !!! should be a whole number
              //this.numerator *= scaleup;
              this.numerator *= scaleup;
            }
            if (isFloat(this.numerator)) {
              var rounded = roundToPlaces(this.numerator, 9);
              var scaleup = Math.pow(
                10,
                rounded.toString().split('.')[1].length
              );
              this.numerator = Math.round(this.numerator * scaleup); // this !!! should be a whole number
              //this.numerator *= scaleup;
              this.denominator *= scaleup;
            }
            var gcf = Fraction.gcf(this.numerator, this.denominator);
            this.numerator /= gcf;
            this.denominator /= gcf;
            if (
              (this.numerator < 0 && this.denominator < 0) ||
              (this.numerator > 0 && this.denominator < 0)
            ) {
              this.numerator *= -1;
              this.denominator *= -1;
            }
            return this;
          };
        })();

        /* Takes two numbers and returns their greatest common factor.
         */
        Fraction.gcf = function (a, b) {
          var common_factors = [];
          var fa = Fraction.primeFactors(a);
          var fb = Fraction.primeFactors(b);
          // for each factor in fa
          // if it's also in fb
          // put it into the common factors
          fa.forEach(function (factor) {
            var i = fb.indexOf(factor);
            if (i >= 0) {
              common_factors.push(factor);
              fb.splice(i, 1); // remove from fb
            }
          });

          if (common_factors.length === 0) return 1;

          var gcf = (function () {
            var r = common_factors[0];
            var i;
            for (i = 1; i < common_factors.length; i++) {
              r = r * common_factors[i];
            }
            return r;
          })();

          return gcf;
        };

        // Adapted from:
        // http://www.btinternet.com/~se16/js/factor.htm
        Fraction.primeFactors = function (n) {
          var num = Math.abs(n);
          var factors = [];
          var _factor = 2; // first potential prime factor

          while (_factor * _factor <= num) {
            // should we keep looking for factors?
            if (num % _factor === 0) {
              // this is a factor
              factors.push(_factor); // so keep it
              num = num / _factor; // and divide our search point by it
            } else {
              _factor++; // and increment
            }
          }

          if (num != 1) {
            // If there is anything left at the end...
            // ...this must be the last prime factor
            factors.push(num); //    so it too should be recorded
          }

          return factors; // Return the prime factors
        };

        module.exports.Fraction = Fraction;
      },
      {},
    ],
    '61k0n': [
      function (require, module, exports) {
        'use strict';

        Object.defineProperty(exports, '__esModule', {
          value: true,
        });
        exports.default = void 0;

        class SearchView {
          _parentElement = document.querySelector('.search');

          getQueryInput() {
            return this._parentElement.querySelector('.search__field').value;
          }

          addHandlerSearch(handler) {
            this._parentElement.addEventListener('submit', function (e) {
              e.preventDefault();
              handler();
            });
          }
        }

        var _default = new SearchView();

        exports.default = _default;
      },
      {},
    ],
    '5cc2Y': [
      function (require, module, exports) {
        'use strict';

        Object.defineProperty(exports, '__esModule', {
          value: true,
        });
        exports.state = exports.loadSearchResults = exports.loadRecipe = void 0;

        var _regeneratorRuntime = require('regenerator-runtime');

        var _config = require('./config.js');

        var _helpers = require('./helpers.js');

        const state = {
          recipe: {},
          search: {
            input: '',
            result: [],
          },
        };
        exports.state = state;

        const loadRecipe = async function (id) {
          try {
            const data = await (0, _helpers.getJSON)(
              `${_config.API_URL}/${id}`
            );
            const { recipe } = data.data;
            state.recipe = {
              id: recipe.id,
              title: recipe.title,
              publisher: recipe.publisher,
              sourceUrl: recipe.source_Url,
              image: recipe.image_url,
              servings: recipe.servings,
              cookingTime: recipe.cooking_time,
              ingredients: recipe.ingredients,
            };
          } catch (error) {
            throw err;
          }
        };

        exports.loadRecipe = loadRecipe;

        const loadSearchResults = async function (input) {
          try {
            state.search.input = input;
            const data = await (0, _helpers.getJSON)(
              `https://forkify-api.herokuapp.com/api/search?q=${input}`
            );
            state.search.result = data.recipes.map(rec => {
              return {
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url,
              };
            });
            console.log(state.search);
          } catch (err) {
            console.log(err);
            throw err;
          }
        };

        exports.loadSearchResults = loadSearchResults;
      },
      {
        'regenerator-runtime': '6Rcwf',
        './config.js': 'he5L7',
        './helpers.js': 'rsHc2',
      },
    ],
    '6Rcwf': [
      function (require, module, exports) {
        /**
         * Copyright (c) 2014-present, Facebook, Inc.
         *
         * This source code is licensed under the MIT license found in the
         * LICENSE file in the root directory of this source tree.
         */

        var runtime = (function (exports) {
          'use strict';

          var Op = Object.prototype;
          var hasOwn = Op.hasOwnProperty;
          var undefined; // More compressible than void 0.
          var $Symbol = typeof Symbol === 'function' ? Symbol : {};
          var iteratorSymbol = $Symbol.iterator || '@@iterator';
          var asyncIteratorSymbol = $Symbol.asyncIterator || '@@asyncIterator';
          var toStringTagSymbol = $Symbol.toStringTag || '@@toStringTag';

          function define(obj, key, value) {
            Object.defineProperty(obj, key, {
              value: value,
              enumerable: true,
              configurable: true,
              writable: true,
            });
            return obj[key];
          }
          try {
            // IE 8 has a broken Object.defineProperty that only works on DOM objects.
            define({}, '');
          } catch (err) {
            define = function (obj, key, value) {
              return (obj[key] = value);
            };
          }

          function wrap(innerFn, outerFn, self, tryLocsList) {
            // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
            var protoGenerator =
              outerFn && outerFn.prototype instanceof Generator
                ? outerFn
                : Generator;
            var generator = Object.create(protoGenerator.prototype);
            var context = new Context(tryLocsList || []);

            // The ._invoke method unifies the implementations of the .next,
            // .throw, and .return methods.
            generator._invoke = makeInvokeMethod(innerFn, self, context);

            return generator;
          }
          exports.wrap = wrap;

          // Try/catch helper to minimize deoptimizations. Returns a completion
          // record like context.tryEntries[i].completion. This interface could
          // have been (and was previously) designed to take a closure to be
          // invoked without arguments, but in all the cases we care about we
          // already have an existing method we want to call, so there's no need
          // to create a new function object. We can even get away with assuming
          // the method takes exactly one argument, since that happens to be true
          // in every case, so we don't have to touch the arguments object. The
          // only additional allocation required is the completion record, which
          // has a stable shape and so hopefully should be cheap to allocate.
          function tryCatch(fn, obj, arg) {
            try {
              return { type: 'normal', arg: fn.call(obj, arg) };
            } catch (err) {
              return { type: 'throw', arg: err };
            }
          }

          var GenStateSuspendedStart = 'suspendedStart';
          var GenStateSuspendedYield = 'suspendedYield';
          var GenStateExecuting = 'executing';
          var GenStateCompleted = 'completed';

          // Returning this object from the innerFn has the same effect as
          // breaking out of the dispatch switch statement.
          var ContinueSentinel = {};

          // Dummy constructor functions that we use as the .constructor and
          // .constructor.prototype properties for functions that return Generator
          // objects. For full spec compliance, you may wish to configure your
          // minifier not to mangle the names of these two functions.
          function Generator() {}
          function GeneratorFunction() {}
          function GeneratorFunctionPrototype() {}

          // This is a polyfill for %IteratorPrototype% for environments that
          // don't natively support it.
          var IteratorPrototype = {};
          define(IteratorPrototype, iteratorSymbol, function () {
            return this;
          });

          var getProto = Object.getPrototypeOf;
          var NativeIteratorPrototype =
            getProto && getProto(getProto(values([])));
          if (
            NativeIteratorPrototype &&
            NativeIteratorPrototype !== Op &&
            hasOwn.call(NativeIteratorPrototype, iteratorSymbol)
          ) {
            // This environment has a native %IteratorPrototype%; use it instead
            // of the polyfill.
            IteratorPrototype = NativeIteratorPrototype;
          }

          var Gp =
            (GeneratorFunctionPrototype.prototype =
            Generator.prototype =
              Object.create(IteratorPrototype));
          GeneratorFunction.prototype = GeneratorFunctionPrototype;
          define(Gp, 'constructor', GeneratorFunctionPrototype);
          define(GeneratorFunctionPrototype, 'constructor', GeneratorFunction);
          GeneratorFunction.displayName = define(
            GeneratorFunctionPrototype,
            toStringTagSymbol,
            'GeneratorFunction'
          );

          // Helper for defining the .next, .throw, and .return methods of the
          // Iterator interface in terms of a single ._invoke method.
          function defineIteratorMethods(prototype) {
            ['next', 'throw', 'return'].forEach(function (method) {
              define(prototype, method, function (arg) {
                return this._invoke(method, arg);
              });
            });
          }

          exports.isGeneratorFunction = function (genFun) {
            var ctor = typeof genFun === 'function' && genFun.constructor;
            return ctor
              ? ctor === GeneratorFunction ||
                  // For the native GeneratorFunction constructor, the best we can
                  // do is to check its .name property.
                  (ctor.displayName || ctor.name) === 'GeneratorFunction'
              : false;
          };

          exports.mark = function (genFun) {
            if (Object.setPrototypeOf) {
              Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
            } else {
              genFun.__proto__ = GeneratorFunctionPrototype;
              define(genFun, toStringTagSymbol, 'GeneratorFunction');
            }
            genFun.prototype = Object.create(Gp);
            return genFun;
          };

          // Within the body of any async function, `await x` is transformed to
          // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
          // `hasOwn.call(value, "__await")` to determine if the yielded value is
          // meant to be awaited.
          exports.awrap = function (arg) {
            return { __await: arg };
          };

          function AsyncIterator(generator, PromiseImpl) {
            function invoke(method, arg, resolve, reject) {
              var record = tryCatch(generator[method], generator, arg);
              if (record.type === 'throw') {
                reject(record.arg);
              } else {
                var result = record.arg;
                var value = result.value;
                if (
                  value &&
                  typeof value === 'object' &&
                  hasOwn.call(value, '__await')
                ) {
                  return PromiseImpl.resolve(value.__await).then(
                    function (value) {
                      invoke('next', value, resolve, reject);
                    },
                    function (err) {
                      invoke('throw', err, resolve, reject);
                    }
                  );
                }

                return PromiseImpl.resolve(value).then(
                  function (unwrapped) {
                    // When a yielded Promise is resolved, its final value becomes
                    // the .value of the Promise<{value,done}> result for the
                    // current iteration.
                    result.value = unwrapped;
                    resolve(result);
                  },
                  function (error) {
                    // If a rejected Promise was yielded, throw the rejection back
                    // into the async generator function so it can be handled there.
                    return invoke('throw', error, resolve, reject);
                  }
                );
              }
            }

            var previousPromise;

            function enqueue(method, arg) {
              function callInvokeWithMethodAndArg() {
                return new PromiseImpl(function (resolve, reject) {
                  invoke(method, arg, resolve, reject);
                });
              }

              return (previousPromise =
                // If enqueue has been called before, then we want to wait until
                // all previous Promises have been resolved before calling invoke,
                // so that results are always delivered in the correct order. If
                // enqueue has not been called before, then it is important to
                // call invoke immediately, without waiting on a callback to fire,
                // so that the async generator function has the opportunity to do
                // any necessary setup in a predictable way. This predictability
                // is why the Promise constructor synchronously invokes its
                // executor callback, and why async functions synchronously
                // execute code before the first await. Since we implement simple
                // async functions in terms of async generators, it is especially
                // important to get this right, even though it requires care.
                previousPromise
                  ? previousPromise.then(
                      callInvokeWithMethodAndArg,
                      // Avoid propagating failures to Promises returned by later
                      // invocations of the iterator.
                      callInvokeWithMethodAndArg
                    )
                  : callInvokeWithMethodAndArg());
            }

            // Define the unified helper method that is used to implement .next,
            // .throw, and .return (see defineIteratorMethods).
            this._invoke = enqueue;
          }

          defineIteratorMethods(AsyncIterator.prototype);
          define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
            return this;
          });
          exports.AsyncIterator = AsyncIterator;

          // Note that simple async functions are implemented on top of
          // AsyncIterator objects; they just return a Promise for the value of
          // the final result produced by the iterator.
          exports.async = function (
            innerFn,
            outerFn,
            self,
            tryLocsList,
            PromiseImpl
          ) {
            if (PromiseImpl === void 0) PromiseImpl = Promise;

            var iter = new AsyncIterator(
              wrap(innerFn, outerFn, self, tryLocsList),
              PromiseImpl
            );

            return exports.isGeneratorFunction(outerFn)
              ? iter // If outerFn is a generator, return the full iterator.
              : iter.next().then(function (result) {
                  return result.done ? result.value : iter.next();
                });
          };

          function makeInvokeMethod(innerFn, self, context) {
            var state = GenStateSuspendedStart;

            return function invoke(method, arg) {
              if (state === GenStateExecuting) {
                throw new Error('Generator is already running');
              }

              if (state === GenStateCompleted) {
                if (method === 'throw') {
                  throw arg;
                }

                // Be forgiving, per 25.3.3.3.3 of the spec:
                // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
                return doneResult();
              }

              context.method = method;
              context.arg = arg;

              while (true) {
                var delegate = context.delegate;
                if (delegate) {
                  var delegateResult = maybeInvokeDelegate(delegate, context);
                  if (delegateResult) {
                    if (delegateResult === ContinueSentinel) continue;
                    return delegateResult;
                  }
                }

                if (context.method === 'next') {
                  // Setting context._sent for legacy support of Babel's
                  // function.sent implementation.
                  context.sent = context._sent = context.arg;
                } else if (context.method === 'throw') {
                  if (state === GenStateSuspendedStart) {
                    state = GenStateCompleted;
                    throw context.arg;
                  }

                  context.dispatchException(context.arg);
                } else if (context.method === 'return') {
                  context.abrupt('return', context.arg);
                }

                state = GenStateExecuting;

                var record = tryCatch(innerFn, self, context);
                if (record.type === 'normal') {
                  // If an exception is thrown from innerFn, we leave state ===
                  // GenStateExecuting and loop back for another invocation.
                  state = context.done
                    ? GenStateCompleted
                    : GenStateSuspendedYield;

                  if (record.arg === ContinueSentinel) {
                    continue;
                  }

                  return {
                    value: record.arg,
                    done: context.done,
                  };
                } else if (record.type === 'throw') {
                  state = GenStateCompleted;
                  // Dispatch the exception by looping back around to the
                  // context.dispatchException(context.arg) call above.
                  context.method = 'throw';
                  context.arg = record.arg;
                }
              }
            };
          }

          // Call delegate.iterator[context.method](context.arg) and handle the
          // result, either by returning a { value, done } result from the
          // delegate iterator, or by modifying context.method and context.arg,
          // setting context.delegate to null, and returning the ContinueSentinel.
          function maybeInvokeDelegate(delegate, context) {
            var method = delegate.iterator[context.method];
            if (method === undefined) {
              // A .throw or .return when the delegate iterator has no .throw
              // method always terminates the yield* loop.
              context.delegate = null;

              if (context.method === 'throw') {
                // Note: ["return"] must be used for ES3 parsing compatibility.
                if (delegate.iterator['return']) {
                  // If the delegate iterator has a return method, give it a
                  // chance to clean up.
                  context.method = 'return';
                  context.arg = undefined;
                  maybeInvokeDelegate(delegate, context);

                  if (context.method === 'throw') {
                    // If maybeInvokeDelegate(context) changed context.method from
                    // "return" to "throw", let that override the TypeError below.
                    return ContinueSentinel;
                  }
                }

                context.method = 'throw';
                context.arg = new TypeError(
                  "The iterator does not provide a 'throw' method"
                );
              }

              return ContinueSentinel;
            }

            var record = tryCatch(method, delegate.iterator, context.arg);

            if (record.type === 'throw') {
              context.method = 'throw';
              context.arg = record.arg;
              context.delegate = null;
              return ContinueSentinel;
            }

            var info = record.arg;

            if (!info) {
              context.method = 'throw';
              context.arg = new TypeError('iterator result is not an object');
              context.delegate = null;
              return ContinueSentinel;
            }

            if (info.done) {
              // Assign the result of the finished delegate to the temporary
              // variable specified by delegate.resultName (see delegateYield).
              context[delegate.resultName] = info.value;

              // Resume execution at the desired location (see delegateYield).
              context.next = delegate.nextLoc;

              // If context.method was "throw" but the delegate handled the
              // exception, let the outer generator proceed normally. If
              // context.method was "next", forget context.arg since it has been
              // "consumed" by the delegate iterator. If context.method was
              // "return", allow the original .return call to continue in the
              // outer generator.
              if (context.method !== 'return') {
                context.method = 'next';
                context.arg = undefined;
              }
            } else {
              // Re-yield the result returned by the delegate method.
              return info;
            }

            // The delegate iterator is finished, so forget it and continue with
            // the outer generator.
            context.delegate = null;
            return ContinueSentinel;
          }

          // Define Generator.prototype.{next,throw,return} in terms of the
          // unified ._invoke helper method.
          defineIteratorMethods(Gp);

          define(Gp, toStringTagSymbol, 'Generator');

          // A Generator should always return itself as the iterator object when the
          // @@iterator function is called on it. Some browsers' implementations of the
          // iterator prototype chain incorrectly implement this, causing the Generator
          // object to not be returned from this call. This ensures that doesn't happen.
          // See https://github.com/facebook/regenerator/issues/274 for more details.
          define(Gp, iteratorSymbol, function () {
            return this;
          });

          define(Gp, 'toString', function () {
            return '[object Generator]';
          });

          function pushTryEntry(locs) {
            var entry = { tryLoc: locs[0] };

            if (1 in locs) {
              entry.catchLoc = locs[1];
            }

            if (2 in locs) {
              entry.finallyLoc = locs[2];
              entry.afterLoc = locs[3];
            }

            this.tryEntries.push(entry);
          }

          function resetTryEntry(entry) {
            var record = entry.completion || {};
            record.type = 'normal';
            delete record.arg;
            entry.completion = record;
          }

          function Context(tryLocsList) {
            // The root entry object (effectively a try statement without a catch
            // or a finally block) gives us a place to store values thrown from
            // locations where there is no enclosing try statement.
            this.tryEntries = [{ tryLoc: 'root' }];
            tryLocsList.forEach(pushTryEntry, this);
            this.reset(true);
          }

          exports.keys = function (object) {
            var keys = [];
            for (var key in object) {
              keys.push(key);
            }
            keys.reverse();

            // Rather than returning an object with a next method, we keep
            // things simple and return the next function itself.
            return function next() {
              while (keys.length) {
                var key = keys.pop();
                if (key in object) {
                  next.value = key;
                  next.done = false;
                  return next;
                }
              }

              // To avoid creating an additional object, we just hang the .value
              // and .done properties off the next function object itself. This
              // also ensures that the minifier will not anonymize the function.
              next.done = true;
              return next;
            };
          };

          function values(iterable) {
            if (iterable) {
              var iteratorMethod = iterable[iteratorSymbol];
              if (iteratorMethod) {
                return iteratorMethod.call(iterable);
              }

              if (typeof iterable.next === 'function') {
                return iterable;
              }

              if (!isNaN(iterable.length)) {
                var i = -1,
                  next = function next() {
                    while (++i < iterable.length) {
                      if (hasOwn.call(iterable, i)) {
                        next.value = iterable[i];
                        next.done = false;
                        return next;
                      }
                    }

                    next.value = undefined;
                    next.done = true;

                    return next;
                  };

                return (next.next = next);
              }
            }

            // Return an iterator with no values.
            return { next: doneResult };
          }
          exports.values = values;

          function doneResult() {
            return { value: undefined, done: true };
          }

          Context.prototype = {
            constructor: Context,

            reset: function (skipTempReset) {
              this.prev = 0;
              this.next = 0;
              // Resetting context._sent for legacy support of Babel's
              // function.sent implementation.
              this.sent = this._sent = undefined;
              this.done = false;
              this.delegate = null;

              this.method = 'next';
              this.arg = undefined;

              this.tryEntries.forEach(resetTryEntry);

              if (!skipTempReset) {
                for (var name in this) {
                  // Not sure about the optimal order of these conditions:
                  if (
                    name.charAt(0) === 't' &&
                    hasOwn.call(this, name) &&
                    !isNaN(+name.slice(1))
                  ) {
                    this[name] = undefined;
                  }
                }
              }
            },

            stop: function () {
              this.done = true;

              var rootEntry = this.tryEntries[0];
              var rootRecord = rootEntry.completion;
              if (rootRecord.type === 'throw') {
                throw rootRecord.arg;
              }

              return this.rval;
            },

            dispatchException: function (exception) {
              if (this.done) {
                throw exception;
              }

              var context = this;
              function handle(loc, caught) {
                record.type = 'throw';
                record.arg = exception;
                context.next = loc;

                if (caught) {
                  // If the dispatched exception was caught by a catch block,
                  // then let that catch block handle the exception normally.
                  context.method = 'next';
                  context.arg = undefined;
                }

                return !!caught;
              }

              for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                var entry = this.tryEntries[i];
                var record = entry.completion;

                if (entry.tryLoc === 'root') {
                  // Exception thrown outside of any try block that could handle
                  // it, so set the completion value of the entire function to
                  // throw the exception.
                  return handle('end');
                }

                if (entry.tryLoc <= this.prev) {
                  var hasCatch = hasOwn.call(entry, 'catchLoc');
                  var hasFinally = hasOwn.call(entry, 'finallyLoc');

                  if (hasCatch && hasFinally) {
                    if (this.prev < entry.catchLoc) {
                      return handle(entry.catchLoc, true);
                    } else if (this.prev < entry.finallyLoc) {
                      return handle(entry.finallyLoc);
                    }
                  } else if (hasCatch) {
                    if (this.prev < entry.catchLoc) {
                      return handle(entry.catchLoc, true);
                    }
                  } else if (hasFinally) {
                    if (this.prev < entry.finallyLoc) {
                      return handle(entry.finallyLoc);
                    }
                  } else {
                    throw new Error('try statement without catch or finally');
                  }
                }
              }
            },

            abrupt: function (type, arg) {
              for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                var entry = this.tryEntries[i];
                if (
                  entry.tryLoc <= this.prev &&
                  hasOwn.call(entry, 'finallyLoc') &&
                  this.prev < entry.finallyLoc
                ) {
                  var finallyEntry = entry;
                  break;
                }
              }

              if (
                finallyEntry &&
                (type === 'break' || type === 'continue') &&
                finallyEntry.tryLoc <= arg &&
                arg <= finallyEntry.finallyLoc
              ) {
                // Ignore the finally entry if control is not jumping to a
                // location outside the try/catch block.
                finallyEntry = null;
              }

              var record = finallyEntry ? finallyEntry.completion : {};
              record.type = type;
              record.arg = arg;

              if (finallyEntry) {
                this.method = 'next';
                this.next = finallyEntry.finallyLoc;
                return ContinueSentinel;
              }

              return this.complete(record);
            },

            complete: function (record, afterLoc) {
              if (record.type === 'throw') {
                throw record.arg;
              }

              if (record.type === 'break' || record.type === 'continue') {
                this.next = record.arg;
              } else if (record.type === 'return') {
                this.rval = this.arg = record.arg;
                this.method = 'return';
                this.next = 'end';
              } else if (record.type === 'normal' && afterLoc) {
                this.next = afterLoc;
              }

              return ContinueSentinel;
            },

            finish: function (finallyLoc) {
              for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                var entry = this.tryEntries[i];
                if (entry.finallyLoc === finallyLoc) {
                  this.complete(entry.completion, entry.afterLoc);
                  resetTryEntry(entry);
                  return ContinueSentinel;
                }
              }
            },

            catch: function (tryLoc) {
              for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                var entry = this.tryEntries[i];
                if (entry.tryLoc === tryLoc) {
                  var record = entry.completion;
                  if (record.type === 'throw') {
                    var thrown = record.arg;
                    resetTryEntry(entry);
                  }
                  return thrown;
                }
              }

              // The context.catch method must only be called with a location
              // argument that corresponds to a known catch block.
              throw new Error('illegal catch attempt');
            },

            delegateYield: function (iterable, resultName, nextLoc) {
              this.delegate = {
                iterator: values(iterable),
                resultName: resultName,
                nextLoc: nextLoc,
              };

              if (this.method === 'next') {
                // Deliberately forget the last sent value so that we don't
                // accidentally pass it on to the delegate.
                this.arg = undefined;
              }

              return ContinueSentinel;
            },
          };

          // Regardless of whether this script is executing as a CommonJS module
          // or not, return the runtime object so that we can declare the variable
          // regeneratorRuntime in the outer scope, which allows this module to be
          // injected easily by `bin/regenerator --include-runtime script.js`.
          return exports;
        })(
          // If this script is executing as a CommonJS module, use module.exports
          // as the regeneratorRuntime namespace. Otherwise create a new empty
          // object. Either way, the resulting object will be used to initialize
          // the regeneratorRuntime variable at the top of this file.
          typeof module === 'object' ? module.exports : {}
        );

        try {
          regeneratorRuntime = runtime;
        } catch (accidentalStrictMode) {
          // This module should not be running in strict mode, so the above
          // assignment should always work unless something is misconfigured. Just
          // in case runtime.js accidentally runs in strict mode, in modern engines
          // we can explicitly access globalThis. In older engines we can escape
          // strict mode using a global Function call. This could conceivably fail
          // if a Content Security Policy forbids using Function, but in that case
          // the proper solution is to fix the accidental strict mode problem. If
          // you've misconfigured your bundler to force strict mode and applied a
          // CSP to forbid Function, and you're not willing to fix either of those
          // problems, please detail your unique predicament in a GitHub issue.
          if (typeof globalThis === 'object') {
            globalThis.regeneratorRuntime = runtime;
          } else {
            Function('r', 'regeneratorRuntime = r')(runtime);
          }
        }
      },
      {},
    ],
    he5L7: [
      function (require, module, exports) {
        'use strict';

        Object.defineProperty(exports, '__esModule', {
          value: true,
        });
        exports.TIMEOUT_SEC = exports.API_URL = void 0;
        const API_URL = 'https://forkify-api.herokuapp.com/api/v2/recipes';
        exports.API_URL = API_URL;
        const TIMEOUT_SEC = 10;
        exports.TIMEOUT_SEC = TIMEOUT_SEC;
      },
      {},
    ],
    rsHc2: [
      function (require, module, exports) {
        'use strict';

        Object.defineProperty(exports, '__esModule', {
          value: true,
        });
        exports.getJSON = void 0;

        var CONST = _interopRequireWildcard(require('./config.js'));

        function _getRequireWildcardCache(nodeInterop) {
          if (typeof WeakMap !== 'function') return null;
          var cacheBabelInterop = new WeakMap();
          var cacheNodeInterop = new WeakMap();
          return (_getRequireWildcardCache = function (nodeInterop) {
            return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
          })(nodeInterop);
        }

        function _interopRequireWildcard(obj, nodeInterop) {
          if (!nodeInterop && obj && obj.__esModule) {
            return obj;
          }
          if (
            obj === null ||
            (typeof obj !== 'object' && typeof obj !== 'function')
          ) {
            return { default: obj };
          }
          var cache = _getRequireWildcardCache(nodeInterop);
          if (cache && cache.has(obj)) {
            return cache.get(obj);
          }
          var newObj = {};
          var hasPropertyDescriptor =
            Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var key in obj) {
            if (
              key !== 'default' &&
              Object.prototype.hasOwnProperty.call(obj, key)
            ) {
              var desc = hasPropertyDescriptor
                ? Object.getOwnPropertyDescriptor(obj, key)
                : null;
              if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
              } else {
                newObj[key] = obj[key];
              }
            }
          }
          newObj.default = obj;
          if (cache) {
            cache.set(obj, newObj);
          }
          return newObj;
        }

        const timeout = function (s) {
          return new Promise(function (_, reject) {
            setTimeout(function () {
              reject(
                new Error(`Request took too long! Timeout after ${s} seconds`)
              );
            }, s * 1000);
          });
        };

        const getJSON = async function (url) {
          try {
            const fetchPromise = fetch(`${url}`);
            const res = await Promise.race([
              fetchPromise,
              timeout(CONST.TIMEOUT_SEC),
            ]);
            const data = await res.json();

            if (!res.ok) {
              throw new Error(`${data.message}(${res.status})`);
            }

            return data;
          } catch (err) {
            console.log(err);
          }
        };

        exports.getJSON = getJSON;
      },
      { './config.js': 'he5L7' },
    ],
    '794dY': [
      function (require, module, exports) {
        'use strict';

        Object.defineProperty(exports, '__esModule', {
          value: true,
        });
        exports.default = void 0;

        var _View = _interopRequireDefault(require('./View.js'));

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        class ResultsView extends _View.default {
          _parentElement = document.querySelector('.results');

          _generateMarkup() {
            return `
    <li class="preview">
            <a class="preview__link preview__link--active" href="#23456">
              <figure class="preview__fig">
                <img src="src/img/test-1.jpg" alt="Test" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">Pasta with Tomato Cream ...</h4>
                <p class="preview__publisher">The Pioneer Woman</p>
                <div class="preview__user-generated">
                  <svg>
                    <use href="src/img/icons.svg#icon-user"></use>
                  </svg>
                </div>
              </div>
            </a>
          </li>
    `;
          }
        }

        var _default = new ResultsView();

        exports.default = _default;
      },
      { './View.js': '2YoaS' },
    ],
  },
  {},
  ['ufS1p', '4iKEs', 'I5Uh7'],
  'I5Uh7',
  null
);

//# sourceMappingURL=index.899adfd8.js.map
