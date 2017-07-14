import React from 'react';
import renderer from 'react-test-renderer';

import AppContainer from '../AppContainer';


jest.mock('components/App/App', () => 'App');

describe('AppContainer (Container)', () => {
  it('renders without exploding', () => {
    const component = renderer.create(
      <AppContainer>
        <div className="test" />
      </AppContainer>,
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
