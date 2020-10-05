"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var nodeFetch = require('node-fetch');

var fetch = require('fetch-cookie')(nodeFetch);

var moment = require('moment');

var generateTimeRanges = function generateTimeRanges() {
  return {
    start: moment().valueOf(),
    end: moment().subtract(1, 'months').valueOf()
  };
};

var getServerKeys = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(SUBDOMAIN, COOKIES) {
    var timerange, body, response, responseBody, serverKeys;
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
                "field": "HEALTH",
                "direction": "ASC"
              }
            };
            _context.next = 5;
            return fetch("https://".concat(SUBDOMAIN, ".saas.appdynamics.com/controller/sim/v2/user/machines/keys"), {
              method: 'POST',
              headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
                'Accept': '*/*',
                'Host': "".concat(SUBDOMAIN, ".saas.appdynamics.com"),
                'Connection': 'keep-alive',
                'Content-Type': 'application/json',
                'cookie': COOKIES,
                'Cache-Control': 'no-cache'
              },
              body: JSON.stringify(body)
            });

          case 5:
            response = _context.sent;
            _context.next = 8;
            return response.json();

          case 8:
            responseBody = _context.sent;
            serverKeys = responseBody.machineKeys;
            return _context.abrupt("return", serverKeys);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getServerKeys(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var getServerProcesses = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(SUBDOMAIN, COOKIES, key, XCSRFHEADER) {
    var response;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log("Getting processes for ".concat(key, "..."));
            console.log(COOKIES);
            _context2.next = 4;
            return fetch("https://".concat(SUBDOMAIN, ".saas.appdynamics.com/controller/sim/v2/user/machines/746007/processes?timeRange=last_1_month.BEFORE_NOW.-1.-1.43200&limit=1000&sortBy=CLASS"), {
              method: 'GET',
              headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
                'Accept': '*/*',
                'Host': "".concat(SUBDOMAIN, ".saas.appdynamics.com"),
                'Connection': 'keep-alive',
                'cookie': COOKIES,
                'Cache-Control': 'no-cache'
              }
            });

          case 4:
            response = _context2.sent;
            _context2.t0 = console;
            _context2.next = 8;
            return response;

          case 8:
            _context2.t1 = _context2.sent;

            _context2.t0.log.call(_context2.t0, _context2.t1);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getServerProcesses(_x3, _x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

module.exports = {
  list: function () {
    var _list = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(accountName, COOKIES) {
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return getServerKeys(accountName, COOKIES);

            case 2:
              return _context3.abrupt("return", _context3.sent);

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function list(_x7, _x8) {
      return _list.apply(this, arguments);
    }

    return list;
  }(),
  processes: function () {
    var _processes = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(accountName, COOKIES, key, XCSRFHEADER) {
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return getServerProcesses(accountName, COOKIES, key, XCSRFHEADER);

            case 2:
              return _context4.abrupt("return", _context4.sent);

            case 3:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    function processes(_x9, _x10, _x11, _x12) {
      return _processes.apply(this, arguments);
    }

    return processes;
  }()
};