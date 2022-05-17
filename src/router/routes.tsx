import Main from '../pages/Main/Main';
import Dashboard from '../pages/Dashboard/Dashboard';
import EditProfile from '../pages/EditProfile/EditProfile';
import Login from '../pages/Login/Login';
import SignUp from '../pages/SignUp/SignUp';
import { PARAMS_ID_DASHBOARD } from '../utils/constants';

export enum Path {
  'home' = '/',
  'main' = 'main',
  'dashboard' = 'dashboard',
  'login' = 'login',
  'signup' = 'signup',
  'edit_profile' = 'edit_profile',
  'no_match' = '*',
}

export const listRoutes = [
  {
    path: Path.main,
    name: 'Main',
    component: <Main />,
    isProtected: true,
  },
  {
    path: Path.dashboard,
    name: 'Dashboard',
    component: <Dashboard />,
    isProtected: true,
    params: PARAMS_ID_DASHBOARD,
  },
  {
    path: Path.login,
    name: 'Sign In',
    component: <Login />,
    isProtected: false,
  },
  {
    path: Path.signup,
    name: 'Sign Up',
    component: <SignUp />,
    isProtected: false,
  },
  {
    path: Path.edit_profile,
    name: 'Edit profile',
    component: <EditProfile />,
    isProtected: true,
  },
];
