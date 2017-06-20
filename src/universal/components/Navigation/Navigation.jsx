import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import styles from './Navigation.css';

export default () =>
  (<div className={classNames('hero-head', styles.heroHead)}>
    <header className="nav">
      <div className="container">
        <div className="nav-left logo">
          <a className={classNames('nav-item', styles.navItem)}>
            <img src="" alt="Logo" />
          </a>
        </div>
        <span className="nav-toggle">
          <span />
          <span />
          <span />
        </span>
        <div className="nav-right nav-menu">
          <NavLink exact activeClassName="is-active" className="nav-item" to="/">
            Comparison
          </NavLink>
          <NavLink exact activeClassName="is-active" className="nav-item" to="/reviews">
            Reviews
          </NavLink>
        </div>
      </div>
    </header>
  </div>);
