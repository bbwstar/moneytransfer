import React from 'react';

export default () =>
  (<div className="columns">
    <div className="column is-8 is-offset-2">
      <div className="columns">
        <div className="column">
          <div className="field">
            <label className="label" htmlFor="from">From</label>
            <p className="control">
              <span className="select is-medium is-fullwidth">
                <select name="from">
                  <option>Select dropdown</option>
                  <option>With options</option>
                </select>
              </span>
            </p>
          </div>
        </div>
        <div className="column">
          <div className="field">
            <label className="label" htmlFor="to">To</label>
            <p className="control">
              <span className="select is-medium is-fullwidth">
                <select name="to">
                  <option>Select dropdown</option>
                  <option>With options</option>
                </select>
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <div className="field">
            <label className="label" htmlFor="type">I would like to</label>
            <p className="control">
              <span className="select is-medium is-fullwidth">
                <select name="type">
                  <option>Select dropdown</option>
                  <option>With options</option>
                </select>
              </span>
            </p>
          </div>
        </div>
        <div className="column">
          <div className="field">
            <label className="label" htmlFor="amount">Amount</label>
            <p className="control">
              <input className="input is-medium is-fullwidth" type="text" placeholder="Normal input" name="amount" />
            </p>
          </div>
        </div>
      </div>
      <div className="columns">
        <div className="column is-2 is-offset-5 has-text-centered">
          <div className="tile is-parent">
            <div className="field is-fullwidth">
              <p className="control">
                <button className="button is-primary is-medium is-fullwidth">Submit</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>);
