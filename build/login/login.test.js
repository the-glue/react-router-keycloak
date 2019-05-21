'use strict';

var _react = _interopRequireDefault(require('react'));

var _enzyme = require('enzyme');

var _index = require('../index');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

jest.mock('../keycloak');
describe('Login', function() {
  it('renders without crashing given the required props', function() {
    var props = {
      userLoggedIn: jest.fn()
    };
    var wrapper = (0, _enzyme.shallow)(_react['default'].createElement(_index.Login, props));
    expect(wrapper).toMatchSnapshot();
  });
});
