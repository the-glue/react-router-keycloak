'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
Object.defineProperty(exports, 'Login', {
  enumerable: true,
  get: function get() {
    return _Login['default'];
  }
});
Object.defineProperty(exports, 'Logout', {
  enumerable: true,
  get: function get() {
    return _Logout['default'];
  }
});
Object.defineProperty(exports, 'PrivateRoute', {
  enumerable: true,
  get: function get() {
    return _PrivateRoute['default'];
  }
});
exports['default'] = void 0;

var _Login = _interopRequireDefault(require('./login/Login'));

var _Logout = _interopRequireDefault(require('./logout/Logout'));

var _PrivateRoute = _interopRequireDefault(require('./privateRouter/PrivateRoute'));

var _KeycloakProvider = _interopRequireDefault(require('./KeycloakProvider'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _default = _KeycloakProvider['default'];
exports['default'] = _default;
