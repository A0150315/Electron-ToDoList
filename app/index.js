import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { configureStore, history } from './store/configureStore';
import './app.global.css';

const store = configureStore();

let root;

if (document.getElementById('root')) {
  import('./containers/Root')
    .then(RootModule => {
      const Root = RootModule.default;
      root = document.getElementById('root');
      render(
        <AppContainer>
          <Root store={store} history={history} />
        </AppContainer>,
        root
      );

      if (module.hot) {
        module.hot.accept('./containers/Root', () => {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          const NextRoot = require('./containers/Root');
          render(
            <AppContainer>
              <NextRoot store={store} history={history} />
            </AppContainer>,
            root
          );
        });
      }
      return Root;
    })
    .catch(e => console.log(e));
}

// 新窗口
if (document.getElementById('wechat')) {
  import('./containers/wechat/Root')
    .then(RootModule => {
      const WechatRoot = RootModule.default;
      root = document.getElementById('wechat');
      render(
        <AppContainer>
          <WechatRoot store={store} history={history} />
        </AppContainer>,
        root
      );

      if (module.hot) {
        module.hot.accept('./containers/wechat/Root', () => {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          const NextRoot = require('./containers/wechat/Root');
          render(
            <AppContainer>
              <NextRoot store={store} history={history} />
            </AppContainer>,
            root
          );
        });
      }
      return WechatRoot;
    })
    .catch(e => console.log(e));
}
