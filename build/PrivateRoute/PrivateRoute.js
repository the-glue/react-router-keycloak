'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = void 0;

var _react = _interopRequireDefault(require('react'));

var _propTypes = _interopRequireDefault(require('prop-types'));

var _reactRouterDom = require('react-router-dom');

var _KeycloakContext = _interopRequireDefault(require('../keycloak/KeycloakContext'));

var _keycloak = require('../keycloak/keycloak');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _extends() {
  _extends =
    Object.assign ||
    function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
  return _extends.apply(this, arguments);
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}

var updateToken = function updateToken(onRefresh) {
  var keycloak = (0, _keycloak.getKeycloak)(); // refresh the token if it is about to expire within 4 minutes.
  // default keycloak validity is 5 min, so we need to add less to avoid refresh loop

  keycloak.updateToken(240).success(function(refreshed) {
    if (refreshed) {
      onRefresh(keycloak.token);
    }
  });
};

var checkLogin = function checkLogin(onRefresh) {
  var keycloak = (0, _keycloak.getKeycloak)();
  updateToken(onRefresh);
  return keycloak.authenticated;
};

var propTypes = {
  component: _propTypes['default'].any,
  location: _propTypes['default'].shape({
    pathname: _propTypes['default'].string
  })
};

var PrivateRoute = function PrivateRoute(_ref) {
  var Component = _ref.component,
    rest = _objectWithoutProperties(_ref, ['component']);

  return _react['default'].createElement(_KeycloakContext['default'].Consumer, null, function(context) {
    return _react['default'].createElement(
      _reactRouterDom.Route,
      _extends({}, rest, {
        render: function render(props) {
          if (checkLogin(context.onRefresh)) {
            return _react['default'].createElement(Component, props);
          } else {
            return _react['default'].createElement(_reactRouterDom.Redirect, {
              to: {
                pathname: context.loginPath,
                state: {
                  redirectTo: props.location.pathname
                }
              }
            });
          }
        }
      })
    );
  });
};

PrivateRoute.propTypes = propTypes;
var _default = PrivateRoute;
exports['default'] = _default;
