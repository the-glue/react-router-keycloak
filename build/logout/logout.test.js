'use strict';

var _react = _interopRequireDefault(require('react'));

var _reactRouterDom = require('react-router-dom');

var _reactTestRenderer = _interopRequireDefault(require('react-test-renderer'));

var _index = require('../index');

var _keycloak = require('../keycloak/keycloak');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

describe('Logout', function() {
  beforeAll(function() {
    (0, _keycloak.configureKeycloak)('dummy url', 'dummy realm', 'dummy id');
  });
  it('renders without crashing given the required props', function() {
    var props = {
      redirectTo: '/dummy',
      onSuccess: jest.fn(),
      onFailure: jest.fn()
    };

    var wrapper = _reactTestRenderer['default']
      .create(
        _react['default'].createElement(
          _reactRouterDom.MemoryRouter,
          {
            initialEntries: ['/logout']
          },
          _react['default'].createElement(_reactRouterDom.Route, {
            path: '/logout',
            render: function render() {
              return _react['default'].createElement(_index.Logout, props);
            }
          })
        )
      )
      .toJSON();

    expect(wrapper).toMatchSnapshot();
  });
  it('onSuccess should be called when logging out and keycloak is available', function() {
    var props = {
      redirectTo: '/dummy',
      onSuccess: jest.fn(),
      onFailure: jest.fn()
    };

    var wrapper = _reactTestRenderer['default']
      .create(
        _react['default'].createElement(
          _reactRouterDom.MemoryRouter,
          {
            initialEntries: ['/logout']
          },
          _react['default'].createElement(_reactRouterDom.Route, {
            path: '/logout',
            render: function render() {
              return _react['default'].createElement(_index.Logout, props);
            }
          })
        )
      )
      .toJSON();

    expect(props.onSuccess).toHaveBeenCalled();
  });
});
