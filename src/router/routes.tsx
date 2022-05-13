import Main from '../pages/Main/Main';
import Dashboard from '../pages/Dashboard/Dashboard';
import Login from '../pages/Login/Login';
import Signup from '../pages/Signup/Signup';
import EditProfile from '../pages/EditProfile/EditProfile';

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
    isProtected: true,
  },
  {
    path: Path.dashboard,
    component: <Dashboard />,
    isProtected: true,
  },
  {
    path: Path.login,
    component: <Login />,
    isProtected: false,
  },
  {
    path: Path.signup,
    component: <Signup />,
    isProtected: false,
  },
  {
    path: Path.edit_profile,
    component: <EditProfile />,
    isProtected: true,
  },
];
