'use strict';

var _react = _interopRequireDefault(require('react'));

var _reactRouterDom = require('react-router-dom');

var _reactTestRenderer = _interopRequireDefault(require('react-test-renderer'));

var _index = require('../index');

var _keycloak = require('../keycloak/keycloak');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

jest.mock('../keycloak/keycloak');
describe('Login', function() {
  beforeAll(function() {
    (0, _keycloak.configureKeycloak)('dummy url', 'dummy realm', 'dummy id');
  });
  it('renders without crashing given the required props', function() {
    var keycloak = {
      authenticated: false,
      token: 'token'
    };

    _keycloak.getKeycloak.mockImplementation(function() {
      return Promise.resolve(keycloak);
    });

    var props = {
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
          ' ',
          _react['default'].createElement(_reactRouterDom.Route, {
            path: '/login',
            render: function render() {
              return _react['default'].createElement(_index.Login, props);
            }
          })
        )
      )
      .toJSON();

    expect(wrapper).toMatchSnapshot();
  }); //todo make this work

  /*it('call onSuccess', () => {
    const props = {
      onSuccess: jest.fn(),
      onFailure: jest.fn()
    };
    const keycloak = {
      init: jest.fn(),
      authenticated: false,
      token: "token"
    }
   //const result = keycloak.init(() => { return {success: jest.fn((callback) => callback) }});
    
    const wrapper = renderer.create(<MemoryRouter initialEntries={['/login']}> <Route path="/login" render={() => <Login {...props} />}/></MemoryRouter>).toJSON();
    
    expect(props.onSuccess).toHaveBeenCalled();
  });*/
});
