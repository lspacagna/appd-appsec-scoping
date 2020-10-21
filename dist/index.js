"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _url = require("url");

var _lodash = _interopRequireDefault(require("lodash"));

var _servers = _interopRequireDefault(require("./servers.js"));

var _constants = _interopRequireDefault(require("./constants.js"));

var _asyncFile = _interopRequireDefault(require("async-file"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var storeCookies = function storeCookies(response) {
  var raw = response.headers.raw()['set-cookie'];
  _constants["default"].cookies = raw.map(function (entry) {
    var parts = entry.split(';');
    var cookiePart = parts[0];
    return cookiePart;
  }).join(';');
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
            params.append('userName', _constants["default"].userName);
            params.append('password', _constants["default"].password);
            params.append('accountName', _constants["default"].accountName);
            _context.next = 7;
            return (0, _nodeFetch["default"])("https://".concat(_constants["default"].subdomain, ".saas.appdynamics.com/controller/auth?action=login"), {
              method: 'POST',
              headers: {
                'User-Agent': 'AppSecurityScoping-tool',
                'Accept': 'application/json, text/plain, */*',
                'Connection': 'keep-alive',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cache-Control': 'no-cache'
              },
              body: params
            });

          case 7:
            response = _context.sent;

            if (!response.ok) {
              _context.next = 13;
              break;
            }

            console.log('Login successful.');
            storeCookies(response);
            _context.next = 14;
            break;

          case 13:
            throw new Error("Login failed - check login details - ".concat(response.statusText, " ").concat(response.status));

          case 14:
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
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(keys, process) {
    var serverMatches, _iterator, _step, key, processes, javaFound;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            serverMatches = [];
            _iterator = _createForOfIteratorHelper(keys);
            _context3.prev = 2;

            _iterator.s();

          case 4:
            if ((_step = _iterator.n()).done) {
              _context3.next = 15;
              break;
            }

            key = _step.value;
            _context3.next = 8;
            return _servers["default"].processes(key.machineId);

          case 8:
            processes = _context3.sent;
            javaFound = checkProcess(processes, process);

            if (javaFound) {
              serverMatches.push({
                serverName: key.serverName,
                machineId: key.machineId,
                language: 'java'
              });
            }

            _context3.next = 13;
            return new Promise(function (resolve) {
              return setTimeout(resolve, 300);
            });

          case 13:
            _context3.next = 4;
            break;

          case 15:
            _context3.next = 20;
            break;

          case 17:
            _context3.prev = 17;
            _context3.t0 = _context3["catch"](2);

            _iterator.e(_context3.t0);

          case 20:
            _context3.prev = 20;

            _iterator.f();

            return _context3.finish(20);

          case 23:
            return _context3.abrupt("return", serverMatches);

          case 24:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[2, 17, 20, 23]]);
  }));

  return function getMatchingProcesses(_x2, _x3) {
    return _ref3.apply(this, arguments);
  };
}();

var getvCPUs = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(machines) {
    var _iterator2, _step2, machine, vcpus;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _iterator2 = _createForOfIteratorHelper(machines);
            _context4.prev = 1;

            _iterator2.s();

          case 3:
            if ((_step2 = _iterator2.n()).done) {
              _context4.next = 13;
              break;
            }

            machine = _step2.value;
            _context4.next = 7;
            return _servers["default"].cpus(machine.machineId);

          case 7:
            vcpus = _context4.sent;
            machine.vcpus = vcpus;
            _context4.next = 11;
            return new Promise(function (resolve) {
              return setTimeout(resolve, 300);
            });

          case 11:
            _context4.next = 3;
            break;

          case 13:
            _context4.next = 18;
            break;

          case 15:
            _context4.prev = 15;
            _context4.t0 = _context4["catch"](1);

            _iterator2.e(_context4.t0);

          case 18:
            _context4.prev = 18;

            _iterator2.f();

            return _context4.finish(18);

          case 21:
            return _context4.abrupt("return", machines);

          case 22:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 15, 18, 21]]);
  }));

  return function getvCPUs(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

var createSummary = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(machines) {
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            console.log("".concat(_lodash["default"].size(machines), " machines with Java found."));
            console.log("".concat(_lodash["default"].sumBy(machines, function (o) {
              return o.vcpus;
            }), " vCPUs across all Java machines."));

          case 2:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function createSummary(_x5) {
    return _ref5.apply(this, arguments);
  };
}();

var main = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
    var keys, javaMatches, vcpus, summary;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return login();

          case 3:
            _context6.next = 5;
            return _servers["default"].list();

          case 5:
            keys = _context6.sent;
            _context6.next = 8;
            return getMatchingProcesses(keys, 'java');

          case 8:
            javaMatches = _context6.sent;
            _context6.next = 11;
            return getvCPUs(javaMatches);

          case 11:
            vcpus = _context6.sent;
            _context6.next = 14;
            return saveFile(vcpus);

          case 14:
            _context6.next = 16;
            return createSummary(vcpus);

          case 16:
            summary = _context6.sent;
            _context6.next = 22;
            break;

          case 19:
            _context6.prev = 19;
            _context6.t0 = _context6["catch"](0);
            console.error(_context6.t0);

          case 22:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 19]]);
  }));

  return function main() {
    return _ref6.apply(this, arguments);
  };
}();

var runLocal = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            console.log("Starting Script...");
            _context7.next = 4;
            return main();

          case 4:
            _context7.next = 9;
            break;

          case 6:
            _context7.prev = 6;
            _context7.t0 = _context7["catch"](0);
            console.log(_context7.t0);

          case 9:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 6]]);
  }));

  return function runLocal() {
    return _ref7.apply(this, arguments);
  };
}();

runLocal();