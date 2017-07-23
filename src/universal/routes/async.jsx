import React, { Component } from 'react';
import Loading from 'components/Loading/Loading';

function asyncComponent(chunkName, getComponent) {
  return class AsyncComponent extends Component {
    static Component = null;

    static loadComponent() {
      return getComponent().then(m => m.default).then((LoadedComponent) => {
        AsyncComponent.Component = LoadedComponent;
        return LoadedComponent;
      });
    }

    mounted = false;

    state = {
      LoadedComponent: AsyncComponent.Component,
      slowLoading: false,
      error: false,
    };

    componentWillMount() {
      this.timeouts = [];
      if (this.state.LoadedComponent === null) {
        AsyncComponent.loadComponent().then((LoadedComponent) => {
          if (this.mounted) {
            this.timeouts.forEach(clearTimeout);
            this.setState({
              LoadedComponent,
              slowLoading: false,
              error: false,
            });
          }
        });
      }
    }

    componentDidMount() {
      this.mounted = true;
      this.timeouts.push(setTimeout(() => { this.setState({ slowLoading: true }); }, 2000));
      this.timeouts.push(setTimeout(() => { this.setState({ error: true }); }, 15000));
    }

    componentWillUnmount() {
      this.mounted = false;
      this.timeouts.forEach(clearTimeout);
    }

    render() {
      const { LoadedComponent, slowLoading, error } = this.state;
      if (LoadedComponent) {
        return <LoadedComponent {...this.props} />;
      } else if (slowLoading) {
        return <Loading />;
      } else if (error) {
        return <div>There was an error. Please reload the page.</div>;
      }
      return null;
    }
  };
}

export const Home = asyncComponent('Home', () => System.import('components/Home/Home'));
export const ReviewsList = asyncComponent('ReviewsList', () =>
  System.import('modules/review/containers/ReviewsListContainer'),
);
