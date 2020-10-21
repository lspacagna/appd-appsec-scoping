"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _constants = _interopRequireDefault(require("./constants.js"));

var fetch = require('node-fetch');

var _post = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(url, body) {
    var response;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetch(url, {
              method: 'POST',
              headers: {
                'User-Agent': 'AppSecurityScoping-tool',
                'Accept': '*/*',
                'Host': "".concat(_constants["default"].subdomain, ".saas.appdynamics.com"),
                'Connection': 'keep-alive',
                'Content-Type': 'application/json',
                'cookie': _constants["default"].cookies,
                'Cache-Control': 'no-cache'
              },
              body: JSON.stringify(body)
            });

          case 2:
            response = _context.sent;
            _context.next = 5;
            return response.json();

          case 5:
            return _context.abrupt("return", _context.sent);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function post(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = {
  get: function (_get) {
    function get() {
      return _get.apply(this, arguments);
    }

    get.toString = function () {
      return _get.toString();
    };

    return get;
  }( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return get();

          case 2:
            return _context2.abrupt("return", _context2.sent);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }))),
  post: function () {
    var _post2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(url, body) {
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              console.log(url, body);
              _context3.next = 3;
              return _post(url, body);

            case 3:
              return _context3.abrupt("return", _context3.sent);

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function post(_x3, _x4) {
      return _post2.apply(this, arguments);
    }

    return post;
  }()
};