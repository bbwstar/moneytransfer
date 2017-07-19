import React from 'react';
import { shallow } from 'enzyme';

import ReviewsList from '../ReviewsList';
import Review from '../Review';

const requestReviews = jest.fn();

describe('ReviewsList', () => {
  it('should request reviews', () => {
    shallow(
      <ReviewsList
        requestReviews={requestReviews}
      />,
    );
    expect(requestReviews).toBeCalled();
  });

  it('should render Reviews component', () => {
    const wrapper = shallow(
      <ReviewsList
        requestReviews={requestReviews}
        reviews={[
          { title: '1', description: 'desc', advantages: [], disadvantages: [] },
          { title: '2', description: 'desc', advantages: [], disadvantages: [] },
          { title: '3', description: 'desc', advantages: [], disadvantages: [] },
        ]}
      />,
    );

    expect(wrapper.find(Review)).toHaveLength(3);
  });
});
