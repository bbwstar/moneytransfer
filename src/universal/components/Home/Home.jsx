import React from 'react';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import Countries from 'components/Home/Countries';
import Description from 'components/Home/Description';
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
            <div className="content is-large mb-2">
              <h1 className="title is-1">
                <FormattedMessage
                  id="home.landingHeroTitle"
                  defaultMessage="Find the cheapest option to transfer money abroad"
                />
              </h1>
              <p>
                <FormattedMessage
                  id="home.landingHeroText"
                  defaultMessage="You can also search for the fastest or the easiest option"
                />
              </p>
            </div>
            <CalculatorForm />
            <div className="vh-30 is-hidden-mobile" />
          </div>
        </div>
      </div>
    </section>
    <Countries />
    <Description />
  </div>);

export default Home;
