import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Switch, Route } from 'react-router';

import App from '../App';
import QRCodePage from './QRCodePage';

import routes from './routes.json';

type Props = {
  store: Store,
  history: {}
};

export default class Root extends Component<Props> {
  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App>
            <Switch>
              <Route path={routes.HOME} component={QRCodePage} />
            </Switch>
          </App>
        </ConnectedRouter>
      </Provider>
    );
  }
}
