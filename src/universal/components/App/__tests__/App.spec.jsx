import React from 'react';
import renderer from 'react-test-renderer';

import App from '../App';

jest.mock('components/Navigation/Navigation', () => 'Navigation');

describe('App (Snapshot)', () => {
  it('renders without navigation', () => {
    const component = renderer.create(
      <App location={{ pathname: '/review' }}>
        <div />
      </App>,
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders with navigation', () => {
    const component = renderer.create(
      <App location={{ pathname: '' }}>
        <div />
      </App>,
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});

