"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _url = require("url");

var _lodash = _interopRequireDefault(require("lodash"));

var _servers = _interopRequireDefault(require("./servers.js"));

var _asyncFile = _interopRequireDefault(require("async-file"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var fetch = require('fetch-cookie')(_nodeFetch["default"]);

var USERNAME = 'lees';
var PASSWORD = 'JTVCREx1NnMuJTNEZHNaakRLOQ==';
var ACCOUNT_NAME = 'tpicap-dev';
var SUBDOMAIN = 'tpicap-dev';
var XCSRFHEADER;
var COOKIES;

var storeCookies = function storeCookies(response) {
  var raw = response.headers.raw()['set-cookie'];
  COOKIES = raw.map(function (entry) {
    var parts = entry.split(';');
    var cookiePart = parts[0];
    return cookiePart;
  }).join(';');
};

var setXCSRFHeader = function setXCSRFHeader(response) {
  var cookies = response.headers.get('set-cookie');
  cookies = cookies.split("X-CSRF-TOKEN=");
  cookies = cookies[1].split(";");
  XCSRFHEADER = cookies[0];
};

var login = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var params, response;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log('Logging in...');
            params = new _url.URLSearchParams();
            params.append('userName', USERNAME);
            params.append('password', PASSWORD);
            params.append('accountName', ACCOUNT_NAME);
            _context.next = 7;
            return fetch("https://".concat(SUBDOMAIN, ".saas.appdynamics.com/controller/auth?action=login"), {
              method: 'POST',
              headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36',
                'Accept': '*/*',
                'Connection': 'keep-alive',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cache-Control': 'no-cache'
              },
              body: params
            });

          case 7:
            response = _context.sent;

            if (!response.ok) {
              _context.next = 14;
              break;
            }

            console.log('Login successful.');
            storeCookies(response);
            return _context.abrupt("return", response);

          case 14:
            console.log(response);
            throw new Error(response.statusText);

          case 16:
            console.log(response);

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function login() {
    return _ref.apply(this, arguments);
  };
}();

var saveFile = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(data) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _asyncFile["default"].writeFile('data.json', JSON.stringify(data, null, 2), 'utf-8');

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function saveFile(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var checkProcess = function checkProcess(processes, processName) {
  var found = _lodash["default"].find(processes, function (o) {
    return o.processClass == 'java';
  });

  if (_lodash["default"].size(found) > 0) {
    return true;
  } else {
    return false;
  }
};

var getMatchingProcesses = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
    var serverMatches, keys, _iterator, _step, key, processes;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            serverMatches = [];
            _context3.t0 = JSON;
            _context3.next = 4;
            return _asyncFile["default"].readFile('data.json', 'utf-8');

          case 4:
            _context3.t1 = _context3.sent;
            keys = _context3.t0.parse.call(_context3.t0, _context3.t1);
            /// Loop here
            _iterator = _createForOfIteratorHelper(keys);
            _context3.prev = 7;

            _iterator.s();

          case 9:
            if ((_step = _iterator.n()).done) {
              _context3.next = 17;
              break;
            }

            key = _step.value;
            _context3.next = 13;
            return _servers["default"].processes(ACCOUNT_NAME, COOKIES, key.machineId);

          case 13:
            processes = _context3.sent;
            console.log(processes); //const javaFound = checkProcess(processes, 'java');
            // if(javaFound){
            //   serverMatches.push({
            //     serverName: key.serverName,
            //     serverId: key.machineId,
            //     language: 'java'
            //   })
            // }

          case 15:
            _context3.next = 9;
            break;

          case 17:
            _context3.next = 22;
            break;

          case 19:
            _context3.prev = 19;
            _context3.t2 = _context3["catch"](7);

            _iterator.e(_context3.t2);

          case 22:
            _context3.prev = 22;

            _iterator.f();

            return _context3.finish(22);

          case 25:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[7, 19, 22, 25]]);
  }));

  return function getMatchingProcesses() {
    return _ref3.apply(this, arguments);
  };
}();

var main = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return login();

          case 3:
            _context4.next = 5;
            return _servers["default"].processes(ACCOUNT_NAME, COOKIES, 746007, XCSRFHEADER);

          case 5:
            _context4.next = 7;
            return _servers["default"].processes(ACCOUNT_NAME, COOKIES, 746007, XCSRFHEADER);

          case 7:
            _context4.next = 12;
            break;

          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](0);
            console.error(_context4.t0);

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 9]]);
  }));

  return function main() {
    return _ref4.apply(this, arguments);
  };
}();

var runLocal = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            console.log("Starting Script...");
            _context5.next = 4;
            return main();

          case 4:
            _context5.next = 9;
            break;

          case 6:
            _context5.prev = 6;
            _context5.t0 = _context5["catch"](0);
            console.log(_context5.t0);

          case 9:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 6]]);
  }));

  return function runLocal() {
    return _ref5.apply(this, arguments);
  };
}();

runLocal();