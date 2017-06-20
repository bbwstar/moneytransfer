import React from 'react';
import classNames from 'classnames';

import Countries from 'components/Home/Countries';
import Navigation from 'components/Navigation/Navigation';
import CalculatorForm from 'modules/calculator/components/CalculatorForm';
import styles from './Home.css';

const Home = () =>
  (<div>
    <section className={classNames('hero', 'is-dark', 'is-fullheight', styles.heroLandingImage)}>
      <Navigation />
      <div className="hero-body">
        <div className="container has-text-centered">
          <div className="tile is-vertical">
            <div className="content is-large mb-1">
              <h1 className="title is-1">Find the cheapest option to transfer money abroad1</h1>
              <p>You can also search for the fastest or the easiest option</p>
            </div>
            <CalculatorForm />
            <div className="vh-30 is-hidden-mobile" />
          </div>
        </div>
      </div>
    </section>
    <Countries />
  </div>);

export default Home;
