"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _url = require("url");

var _lodash = _interopRequireDefault(require("lodash"));

var _servers = _interopRequireDefault(require("./servers.js"));

var _config = _interopRequireDefault(require("../config.js"));

var _asyncFile = _interopRequireDefault(require("async-file"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var storeCookies = function storeCookies(response) {
  var raw = response.headers.raw()['set-cookie'];
  _config["default"].cookies = raw.map(function (entry) {
    var parts = entry.split(';');
    var cookiePart = parts[0];
    return cookiePart;
  }).join(';');
};

var login = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var base64password, params, response;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log('Logging in...'); // Base64 encode password

            base64password = Buffer.from(_config["default"].password).toString('base64');
            params = new _url.URLSearchParams();
            params.append('userName', _config["default"].userName);
            params.append('password', base64password);
            params.append('accountName', _config["default"].accountName);
            _context.next = 8;
            return (0, _nodeFetch["default"])("https://".concat(_config["default"].subdomain, ".saas.appdynamics.com/controller/auth?action=login"), {
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

          case 8:
            response = _context.sent;

            if (!response.ok) {
              _context.next = 14;
              break;
            }

            console.log('Login successful.');
            storeCookies(response);
            _context.next = 15;
            break;

          case 14:
            throw new Error("Login failed - check login details - ".concat(response.statusText, " ").concat(response.status));

          case 15:
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
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(keys) {
    var serverMatches, count, _iterator, _step, key, processes, processFound;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            serverMatches = []; // loop through all server keys

            count = 1;
            _iterator = _createForOfIteratorHelper(keys);
            _context2.prev = 3;

            _iterator.s();

          case 5:
            if ((_step = _iterator.n()).done) {
              _context2.next = 18;
              break;
            }

            key = _step.value;
            console.log("[".concat(count, "/").concat(_lodash["default"].size(keys), "]: Getting processes for ").concat(key.machineId, "...")); // get all processes for each key

            _context2.next = 10;
            return _servers["default"].processes(key.machineId);

          case 10:
            processes = _context2.sent;
            // check list of processes for process search term
            processFound = checkProcess(processes, _config["default"].processSearchTerm);

            if (processFound) {
              console.log("'".concat(_config["default"].processSearchTerm, "' process found on ").concat(key.machineId, "."));
              serverMatches.push({
                serverName: key.serverName,
                machineId: key.machineId,
                language: _config["default"].processSearchTerm
              });
            }

            count++; // stagger requests to prevent hitting API rate limiter

            _context2.next = 16;
            return new Promise(function (resolve) {
              return setTimeout(resolve, _config["default"].requestDelay);
            });

          case 16:
            _context2.next = 5;
            break;

          case 18:
            _context2.next = 23;
            break;

          case 20:
            _context2.prev = 20;
            _context2.t0 = _context2["catch"](3);

            _iterator.e(_context2.t0);

          case 23:
            _context2.prev = 23;

            _iterator.f();

            return _context2.finish(23);

          case 26:
            return _context2.abrupt("return", serverMatches);

          case 27:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[3, 20, 23, 26]]);
  }));

  return function getMatchingProcesses(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var getvCPUs = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(machines) {
    var count, _iterator2, _step2, machine, vcpus;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            // loop through all machines running process
            count = 1;
            _iterator2 = _createForOfIteratorHelper(machines);
            _context3.prev = 2;

            _iterator2.s();

          case 4:
            if ((_step2 = _iterator2.n()).done) {
              _context3.next = 16;
              break;
            }

            machine = _step2.value;
            console.log("[".concat(count, "/").concat(_lodash["default"].size(machines), "]: Getting vCPUs for ").concat(machine.machineId, "...")); // check how many vCPUs on this machine

            _context3.next = 9;
            return _servers["default"].cpus(machine.machineId);

          case 9:
            vcpus = _context3.sent;
            // store in object for data export
            machine.vcpus = vcpus; // stagger requests to prevent hitting API rate limiter

            _context3.next = 13;
            return new Promise(function (resolve) {
              return setTimeout(resolve, _config["default"].requestDelay);
            });

          case 13:
            count++;

          case 14:
            _context3.next = 4;
            break;

          case 16:
            _context3.next = 21;
            break;

          case 18:
            _context3.prev = 18;
            _context3.t0 = _context3["catch"](2);

            _iterator2.e(_context3.t0);

          case 21:
            _context3.prev = 21;

            _iterator2.f();

            return _context3.finish(21);

          case 24:
            return _context3.abrupt("return", machines);

          case 25:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[2, 18, 21, 24]]);
  }));

  return function getvCPUs(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

var saveData = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(data) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            console.log("Saving all data to 'data.json'...");
            _context4.next = 3;
            return _asyncFile["default"].writeFile('data.json', JSON.stringify(data, null, 2), 'utf-8');

          case 3:
            console.log("".concat(_lodash["default"].size(data), " machines with '").concat(_config["default"].processSearchTerm, "' found."));
            console.log("".concat(_lodash["default"].sumBy(data, function (o) {
              return o.vcpus;
            }), " vCPUs across all machines running '").concat(_config["default"].processSearchTerm, "'."));

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function saveData(_x3) {
    return _ref4.apply(this, arguments);
  };
}();

var main = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
    var keys, processMatches, vcpus;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return login();

          case 3:
            _context5.next = 5;
            return _servers["default"].list();

          case 5:
            keys = _context5.sent;
            _context5.next = 8;
            return getMatchingProcesses(keys);

          case 8:
            processMatches = _context5.sent;
            _context5.next = 11;
            return getvCPUs(processMatches);

          case 11:
            vcpus = _context5.sent;
            _context5.next = 14;
            return saveData(vcpus);

          case 14:
            _context5.next = 19;
            break;

          case 16:
            _context5.prev = 16;
            _context5.t0 = _context5["catch"](0);
            console.error(_context5.t0);

          case 19:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 16]]);
  }));

  return function main() {
    return _ref5.apply(this, arguments);
  };
}();

var runLocal = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            console.log("Starting Script...");
            _context6.next = 4;
            return main();

          case 4:
            _context6.next = 9;
            break;

          case 6:
            _context6.prev = 6;
            _context6.t0 = _context6["catch"](0);
            console.log(_context6.t0);

          case 9:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 6]]);
  }));

  return function runLocal() {
    return _ref6.apply(this, arguments);
  };
}();

runLocal();