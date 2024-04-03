import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom'; // Change this line
import { Provider } from 'react-redux';

import App from 'App';
import { store } from 'store';

import 'assets/scss/style.scss';
import config from './config';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <HashRouter basename={config.basename}>
      {' '}
      {/* Change BrowserRouter to HashRouter */}
      <App />
    </HashRouter>
  </Provider>
);
