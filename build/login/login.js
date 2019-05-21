'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = void 0;

var _react = _interopRequireDefault(require('react'));

var _reactRouterDom = require('react-router-dom');

var _KeycloakContext = _interopRequireDefault(require('../KeycloakContext'));

var _keycloak = require('../keycloak');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _typeof(obj) {
  if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype
        ? 'symbol'
        : typeof obj;
    };
  }
  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ('value' in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
    return call;
  }
  return _assertThisInitialized(self);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
  return _getPrototypeOf(o);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function');
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, writable: true, configurable: true }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
  return _setPrototypeOf(o, p);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}

var Login =
  /*#__PURE__*/
  (function(_React$Component) {
    _inherits(Login, _React$Component);

    function Login() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, Login);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(
        this,
        (_getPrototypeOf2 = _getPrototypeOf(Login)).call.apply(_getPrototypeOf2, [this].concat(args))
      );

      _defineProperty(_assertThisInitialized(_this), 'state', {
        isLoading: true
      });

      _defineProperty(_assertThisInitialized(_this), 'logIn', function() {
        if (!_keycloak.keycloak.authenticated) {
          try {
            _keycloak.keycloak
              .init({
                onLoad: 'login-required',
                checkLoginIframe: false
              })
              .success(function() {
                _this.setState({
                  isLoading: false
                });

                _this.props.onSuccess(_keycloak.keycloak.token);
              })
              .error(function() {
                _this.props.onFailure('there was an error with initializing keycloak, please check your credentials');
              });
          } catch (e) {
            _this.props.onSuccess(e);
          }
        }
      });

      return _this;
    }

    _createClass(Login, [
      {
        key: 'componentDidMount',
        value: function componentDidMount() {
          this.logIn();
        }
      },
      {
        key: 'render',
        value: function render() {
          if (!_keycloak.keycloak.token && this.state.isLoading) {
            // fallback to check if initialization of Keycloak is finished.
            return _react['default'].createElement('p', null, 'Loading...');
          }

          return (
            // redirect to the assigned path in the props
            _react['default'].createElement(_reactRouterDom.Redirect, {
              to: {
                pathname: this.props.redirectTo
              }
            })
          );
        }
      }
    ]);

    return Login;
  })(_react['default'].Component);

_defineProperty(Login, 'contextType', _KeycloakContext['default']);

var _default = Login;
exports['default'] = _default;
