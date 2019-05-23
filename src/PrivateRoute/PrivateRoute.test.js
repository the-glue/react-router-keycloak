import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { PrivateRoute } from '../index';
import { configureKeycloak } from '../keycloak/keycloak';

describe('Private Route', () => {
  beforeAll(() => {
    configureKeycloak('dummy url', 'dummy realm', 'dummy id');
  });
  it('renders without crashing given the required props', () => {
    const wrapper = renderer
      .create(
        <MemoryRouter initialEntries={['/private']}>
          <PrivateRoute path="/private" component={() => <div>Private</div>} />
        </MemoryRouter>
      )
      .toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
