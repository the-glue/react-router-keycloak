'use strict';

var _react = _interopRequireDefault(require('react'));

var _reactRouterDom = require('react-router-dom');

var _reactTestRenderer = _interopRequireDefault(require('react-test-renderer'));

var _Login = _interopRequireDefault(require('./Login'));

var _keycloak = require('../keycloak/keycloak');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

describe('Login', function() {
  beforeAll(function() {
    (0, _keycloak.configureKeycloak)('dummy url', 'dummy realm', 'dummy id');
  });
  it('renders without crashing given the required props', function() {
    var props = {
      redirectTo: '/',
      onSuccess: jest.fn(),
      onFailure: jest.fn()
    };

    var wrapper = _reactTestRenderer['default']
      .create(
        _react['default'].createElement(
          _reactRouterDom.MemoryRouter,
          {
            initialEntries: ['/login']
          },
          _react['default'].createElement(_reactRouterDom.Route, {
            path: '/login',
            render: function render() {
              return _react['default'].createElement(_Login['default'], props);
            }
          })
        )
      )
      .toJSON();

    expect(wrapper).toMatchSnapshot();
  });
});
