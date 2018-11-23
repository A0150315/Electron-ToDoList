import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';
import './app.global.css';

const store = configureStore();

let root;

if (document.getElementById('root')) {
  root = document.getElementById('root');
  render(
    <AppContainer>
      <Root store={store} history={history} />
    </AppContainer>,
    root
  );

  if (module.hot) {
    module.hot.accept('./containers/Root', () => {
      const NextRoot = require('./containers/Root'); // eslint-disable-line global-require
      render(
        <AppContainer>
          <NextRoot store={store} history={history} />
        </AppContainer>,
        root
      );
    });
  }
}

// 新窗口
if (document.getElementById('root1')) {
  root = document.getElementById('root1');
  render(
    <AppContainer>
      <div>1</div>
    </AppContainer>,
    root
  );

  if (module.hot) {
    module.hot.accept(() => {
      render(
        <AppContainer>
          <div>1</div>
        </AppContainer>,
        root
      );
    });
  }
}
