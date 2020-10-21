"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _constants = _interopRequireDefault(require("./constants.js"));

var _requests = _interopRequireDefault(require("./requests.js"));

var _lodash = _interopRequireDefault(require("lodash"));

var fetch = require('node-fetch');

var moment = require('moment');

var generateTimeRanges = function generateTimeRanges() {
  return {
    start: moment().valueOf(),
    end: moment().subtract(1, 'months').valueOf()
  };
};

var getServerKeys = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var timerange, body, response, serverKeys;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log("Getting server keys...");
            timerange = generateTimeRanges();
            body = {
              "filter": {
                "appIds": [],
                "nodeIds": [],
                "tierIds": [],
                "types": ["PHYSICAL", "CONTAINER_AWARE"],
                "timeRangeStart": timerange.start,
                "timeRangeEnd": timerange.end
              },
              "sorter": {
                "field": "HOST_ID",
                "direction": "ASC"
              }
            };
            _context.next = 5;
            return _requests["default"].post("https://".concat(_constants["default"].subdomain, ".saas.appdynamics.com/controller/sim/v2/user/machines/keys"), body);

          case 5:
            response = _context.sent;
            serverKeys = response.machineKeys;
            return _context.abrupt("return", serverKeys);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getServerKeys() {
    return _ref.apply(this, arguments);
  };
}();

var getServerProcesses = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(machineId) {
    var response;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log("Getting processes for ".concat(machineId, "..."));
            _context2.next = 3;
            return _requests["default"].get("https://".concat(_constants["default"].subdomain, ".saas.appdynamics.com/controller/sim/v2/user/machines/").concat(machineId, "/processes?timeRange=last_1_month.BEFORE_NOW.-1.-1.43200&limit=1000&sortBy=CLASS"));

          case 3:
            response = _context2.sent;
            return _context2.abrupt("return", response);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getServerProcesses(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var getServerCPUs = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(machineId) {
    var response, vcpus;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            console.log("Getting vCPUs for ".concat(machineId, "..."));
            _context3.next = 3;
            return _requests["default"].get("https://".concat(_constants["default"].subdomain, ".saas.appdynamics.com/controller/sim/v2/user/machines/").concat(machineId));

          case 3:
            response = _context3.sent;

            if (!(response !== null)) {
              _context3.next = 10;
              break;
            }

            vcpus = 0;

            if (_lodash["default"].size(response.cpus) == 0) {
              console.log("Unable to find vCPUs on ".concat(machineId));
            } else {
              vcpus = vcpus + _lodash["default"].size(response.cpus);
              console.log("".concat(_lodash["default"].size(response.cpus), " vCPUs found on ").concat(machineId));
            }

            return _context3.abrupt("return", vcpus);

          case 10:
            console.log("Unable to get vCPUs on ".concat(machineId));
            return _context3.abrupt("return", 0);

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getServerCPUs(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

module.exports = {
  list: function () {
    var _list = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return getServerKeys();

            case 2:
              return _context4.abrupt("return", _context4.sent);

            case 3:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    function list() {
      return _list.apply(this, arguments);
    }

    return list;
  }(),
  processes: function () {
    var _processes = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(machineId) {
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return getServerProcesses(machineId);

            case 2:
              return _context5.abrupt("return", _context5.sent);

            case 3:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    function processes(_x3) {
      return _processes.apply(this, arguments);
    }

    return processes;
  }(),
  cpus: function () {
    var _cpus = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(machineId) {
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return getServerCPUs(machineId);

            case 2:
              return _context6.abrupt("return", _context6.sent);

            case 3:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    function cpus(_x4) {
      return _cpus.apply(this, arguments);
    }

    return cpus;
  }()
};