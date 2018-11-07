import React from 'react';
import { hydrate } from 'react-dom';
import { renderRoutes } from 'react-router-config';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import routes from './routes.js';

const renderApp = () => {
  hydrate(
    <AppContainer>
      <BrowserRouter>
        {renderRoutes(routes)}
      </BrowserRouter>
    </AppContainer>,
    document.getElementById('react-view')
  );
};

renderApp(routes);

if (module.hot) {
  module.hot.accept('./routes.js', () => renderApp());
}
