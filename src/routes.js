import App from './components/App/index';

const routes = [
  {
    component: App,
    routes: [
      {
        path: '/',
        component: App,
        exact: true
      }
    ]
  }
];

export default routes;
