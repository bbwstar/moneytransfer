import React from 'react';

export default () =>
  (<section className="hero is-medium">
    <div className="hero-body">
      <div className="container has-text-centered">
        <div className="tile is-vertical">
          <h2 className="title is-primary is-2 is-spaced mb-3">Where are you sending your money to?</h2>
          <div className="columns">
            <div className="column">
              <h2 className="title is-3">Americas</h2>
            </div>
            <div className="column">
              <h2 className="title is-3">Europe</h2>
            </div>
            <div className="column">
              <h2 className="title is-3">Asia</h2>
            </div>
            <div className="column">
              <h2 className="title is-3">Africa</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="hero-footer mb-3">
      <div className="container">
        <div className="columns">
          <div className="column is-half-tablet is-offset-one-quarter-tablet">
            <div className="field">
              <p className="control has-icons-left">
                <input className="input is-medium" type="text" placeholder="Search all money transfer providers" />
                <span className="icon is-small is-left">
                  <i className="fa fa-search" />
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>);
