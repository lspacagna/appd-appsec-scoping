"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var nodeFetch = require('node-fetch');

var fetch = require('fetch-cookie')(nodeFetch);

var _require = require('url'),
    URLSearchParams = _require.URLSearchParams;

var USERNAME = 'lees';
var PASSWORD = 'JTVCREx1NnMuJTNEZHNaakRLOQ==';
var ACCOUNT_NAME = 'tpicap-dev';
var SUBDOMAIN = 'tpicap-dev';
var XCSRFHEADER;

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
            params = new URLSearchParams();
            params.append('userName', USERNAME);
            params.append('password', PASSWORD);
            params.append('accountName', ACCOUNT_NAME);
            _context.next = 7;
            return fetch("https://".concat(SUBDOMAIN, ".saas.appdynamics.com/controller/auth?action=login"), {
              method: 'POST',
              headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36',
                'Accept': 'application/json, text/plain, */*',
                'Referer': "https://".concat(SUBDOMAIN, ".saas.appdynamics.com/controller/"),
                'Connection': 'keep-alive',
                'Content-Type': 'application/x-www-form-urlencoded'
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
            setXCSRFHeader(response);
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

var getServerKeys = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log("Getting server keys...");

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getServerKeys() {
    return _ref2.apply(this, arguments);
  };
}();

var main = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
    var serverKeys;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return login();

          case 3:
            _context3.next = 5;
            return getServerKeys();

          case 5:
            serverKeys = _context3.sent;
            _context3.next = 11;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](0);
            console.error(_context3.t0);

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 8]]);
  }));

  return function main() {
    return _ref3.apply(this, arguments);
  };
}();

var runLocal = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            console.log("Starting Script...");
            _context4.next = 4;
            return main();

          case 4:
            _context4.next = 9;
            break;

          case 6:
            _context4.prev = 6;
            _context4.t0 = _context4["catch"](0);
            console.log(_context4.t0);

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 6]]);
  }));

  return function runLocal() {
    return _ref4.apply(this, arguments);
  };
}();

runLocal();