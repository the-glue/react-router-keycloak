'use strict';

var _react = _interopRequireDefault(require('react'));

var _enzyme = require('enzyme');

var _privateRoute = require('./privateRoute');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

describe('Private Route', function() {
  it('renders without crashing given the required props', function() {
    var wrapper = (0, _enzyme.shallow)(_react['default'].createElement(_privateRoute.PrivateRoute, null));
    expect(wrapper).toMatchSnapshot();
  });
});
