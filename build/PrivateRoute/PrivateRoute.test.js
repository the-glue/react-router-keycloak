'use strict';

var _react = _interopRequireDefault(require('react'));

var _reactTestRenderer = _interopRequireDefault(require('react-test-renderer'));

var _reactRouterDom = require('react-router-dom');

var _index = require('../index');

var _keycloak = require('../keycloak/keycloak');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

describe('Private Route', function() {
  beforeAll(function() {
    (0, _keycloak.configureKeycloak)('dummy url', 'dummy realm', 'dummy id');
  });
  it('renders without crashing given the required props', function() {
    var wrapper = _reactTestRenderer['default']
      .create(
        _react['default'].createElement(
          _reactRouterDom.MemoryRouter,
          {
            initialEntries: ['/private']
          },
          _react['default'].createElement(_index.PrivateRoute, {
            path: '/private',
            component: function component() {
              return _react['default'].createElement('div', null, 'Private');
            }
          })
        )
      )
      .toJSON();

    expect(wrapper).toMatchSnapshot();
  });
});
