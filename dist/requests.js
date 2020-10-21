"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _config = _interopRequireDefault(require("../config.js"));

var fetch = require('node-fetch');

var _get = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(url) {
    var response;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetch(url, {
              method: 'GET',
              headers: {
                'User-Agent': 'AppSecurityScoping-tool',
                'Accept': '*/*',
                'Host': "".concat(_config["default"].subdomain, ".saas.appdynamics.com"),
                'Connection': 'keep-alive',
                'cookie': _config["default"].cookies,
                'Cache-Control': 'no-cache'
              }
            });

          case 2:
            response = _context.sent;

            if (!response.ok) {
              _context.next = 9;
              break;
            }

            _context.next = 6;
            return response.json();

          case 6:
            return _context.abrupt("return", _context.sent);

          case 9:
            console.log("Request failed - ".concat(response.status, ": ").concat(url));
            return _context.abrupt("return", null);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function get(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _post = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(url, body) {
    var response;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return fetch(url, {
              method: 'POST',
              headers: {
                'User-Agent': 'AppSecurityScoping-tool',
                'Accept': '*/*',
                'Host': "".concat(_config["default"].subdomain, ".saas.appdynamics.com"),
                'Connection': 'keep-alive',
                'Content-Type': 'application/json',
                'cookie': _config["default"].cookies,
                'Cache-Control': 'no-cache'
              },
              body: JSON.stringify(body)
            });

          case 2:
            response = _context2.sent;

            if (!response.ok) {
              _context2.next = 9;
              break;
            }

            _context2.next = 6;
            return response.json();

          case 6:
            return _context2.abrupt("return", _context2.sent);

          case 9:
            throw new Error("POST request failed - ".concat(response.statusText, " ").concat(response.status));

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function post(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

module.exports = {
  get: function () {
    var _get2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(url) {
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _get(url);

            case 2:
              return _context3.abrupt("return", _context3.sent);

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function get(_x4) {
      return _get2.apply(this, arguments);
    }

    return get;
  }(),
  post: function () {
    var _post2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(url, body) {
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _post(url, body);

            case 2:
              return _context4.abrupt("return", _context4.sent);

            case 3:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    function post(_x5, _x6) {
      return _post2.apply(this, arguments);
    }

    return post;
  }()
};