import Main from '../pages/Main';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import EditProfile from '../pages/EditProfile';
import NoMatch from '../pages/NoMatch';

export enum Path {
  'home' = '/',
  'main' = 'main',
  'dashboard' = 'dashboard',
  'login' = 'login',
  'signup' = 'signup',
  'edit_profile' = 'edit_profile',
  'no_math' = '*',
}

export const listRoutes = [
  {
    path: Path.main,
    component: <Main />,
  },
  {
    path: Path.dashboard,
    component: <Dashboard />,
  },
  {
    path: Path.login,
    component: <Login />,
  },
  {
    path: Path.signup,
    component: <Signup />,
  },
  {
    path: Path.edit_profile,
    component: <EditProfile />,
  },
  {
    path: Path.no_math,
    component: <NoMatch />,
  },
];
