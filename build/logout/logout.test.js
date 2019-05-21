'use strict';

var _react = _interopRequireDefault(require('react'));

var _enzyme = require('enzyme');

var _logout = require('./logout');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

describe('Logout', function() {
  it('renders without crashing given the required props', function() {
    var props = {
      userLoggedOut: jest.fn()
    };
    var wrapper = (0, _enzyme.shallow)(_react['default'].createElement(_logout.Logout, props));
    expect(wrapper).toMatchSnapshot();
  });
});
