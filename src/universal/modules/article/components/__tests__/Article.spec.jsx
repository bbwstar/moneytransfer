import React from 'react';
import { shallow, render } from 'enzyme';
import toJson from 'enzyme-to-json';

import Article from '../Article';

describe('Article (Component)', () => {
  let props;
  let shallowedComponent;

  const requestArticle = jest.fn();
  const article = () => {
    if (!shallowedComponent) {
      shallowedComponent = shallow(<Article {...props} />);
    }
    return shallowedComponent;
  };

  beforeEach(() => {
    props = {
      requestArticle,
    };
    shallowedComponent = undefined;
  });

  it('should render without article', () => {
    const wrapper = article();
    expect(wrapper).toHaveLength(1);
  });

  it('should request article', () => {
    article();
    expect(requestArticle).toBeCalled();
  });

  it('should render clean html inside Article component', () => {
    props.article = '<span>article</span>';

    const wrapper = render(<Article {...props} />);

    expect(wrapper.text()).toBe('article');
  });
});
