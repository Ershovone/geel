import App from './components/App';
import MainPage from './components/App/MainPage';
import Login from './components/Login';
import Registration from './components/Registration';

const routes = [
  {
    component: App,
    routes: [
      {
        path: '/',
        component: MainPage,
        exact: true
      },
      {
        path: '/login',
        component: Login,
        exact: true
      },
      {
        path: '/reg',
        component: Registration,
        exact: true
      }
    ]
  }
];

export default routes;
