import React from 'react';
import Cookie from 'js-cookie';

import createComponentWithIntl from 'utils/intl-renderer-test-helper';
import LocaleSwitcher from '../LocaleSwitcher';

describe('LocaleSwitcher (Snapshot)', () => {
  it('renders and changes locale from en to cs', () => {
    const component = createComponentWithIntl(
      <LocaleSwitcher />,
      { locale: 'en' },
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();

    window.location.reload = jest.fn();
    Cookie.set = jest.fn();
    tree.props.onClick();

    expect(window.location.reload).toBeCalled();
    expect(Cookie.set).toBeCalledWith('locale', 'cs');
  });

  it('renders and changes locale from cs to en', () => {
    const component = createComponentWithIntl(
      <LocaleSwitcher />,
      { locale: 'cs' },
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();

    window.location.reload = jest.fn();
    Cookie.set = jest.fn();
    tree.props.onClick();

    expect(window.location.reload).toBeCalled();
    expect(Cookie.set).toBeCalledWith('locale', 'en');
  });
});

