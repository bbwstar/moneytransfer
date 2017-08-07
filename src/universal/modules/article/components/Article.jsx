import React, { Component } from 'react';
import PropTypes from 'prop-types';

import cleanWordpressHtml from 'utils/wordpress/cleanWordpressHtml';

import './Article.css';

export default class Article extends Component {
  static defaultProps = {
    article: '',
  };

  static propTypes = {
    requestArticle: PropTypes.func.isRequired,
    article: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.props.requestArticle();
  }

  render() {
    const articleHtml = cleanWordpressHtml(this.props.article);
    return (
      <div className="section">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-three-quarters-desktop">
              <div dangerouslySetInnerHTML={{ __html: articleHtml }} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
