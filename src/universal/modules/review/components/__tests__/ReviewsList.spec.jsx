import React from 'react';
import { shallow } from 'enzyme';

import ReviewsList from '../ReviewsList';
import Review from '../Review';

describe('ReviewsList', () => {
  let props;
  let shallowedReviewsList;

  const requestReviews = jest.fn();
  const reviewList = () => {
    if (!shallowedReviewsList) {
      shallowedReviewsList = shallow(<ReviewsList {...props} />);
    }
    return shallowedReviewsList;
  };

  beforeEach(() => {
    props = {
      requestReviews,
    };
    shallowedReviewsList = undefined;
  });

  it('should render without reviews', () => {
    const wrapper = reviewList();
    expect(wrapper).toHaveLength(1);
  });

  it('should request reviews', () => {
    reviewList();
    expect(requestReviews).toBeCalled();
  });

  it('should render Reviews component', () => {
    props.reviews = [
      { title: '1', description: 'desc', advantages: [], disadvantages: [] },
      { title: '2', description: 'desc', advantages: [], disadvantages: [] },
      { title: '3', description: 'desc', advantages: [], disadvantages: [] },
    ];

    const wrapper = reviewList();

    expect(wrapper.find(Review)).toHaveLength(3);
  });
});
