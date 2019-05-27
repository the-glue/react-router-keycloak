'use strict';

var _react = _interopRequireDefault(require('react'));

var _enzyme = require('enzyme');

var _index = require('../index');

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
      onSuccess: jest.fn(),
      onFailure: jest.fn()
    };
    var wrapper = (0, _enzyme.shallow)(_react['default'].createElement(_index.Login, props));
    expect(wrapper).toMatchSnapshot();
  });
});
