import Main from '../pages/Main/Main';
import Dashboard from '../pages/Dashboard/Dashboard';
import EditProfile from '../pages/EditProfile/EditProfile';
import NoMatch from '../pages/NoMatch/NoMatch';
import SignIn from '../pages/Login/SignIn';
import SignUp from '../pages/Signup/SignUp';

export enum Path {
  'home' = '/',
  'main' = 'main',
  'dashboard' = 'dashboard',
  'signin' = 'signin',
  'signup' = 'signup',
  'edit_profile' = 'edit_profile',
  'no_match' = '*',
}

export const listRoutes = [
  {
    path: Path.main,
    name: 'Main',
    component: <Main />,
  },
  {
    path: Path.dashboard,
    name: 'Dashboard',
    component: <Dashboard />,
  },
  {
    path: Path.signin,
    name: 'Sign in',
    component: <SignIn />,
  },
  {
    path: Path.signup,
    name: 'Sign up',
    component: <SignUp />,
  },
  {
    path: Path.edit_profile,
    name: 'Edit profile',
    component: <EditProfile />,
  },
  {
    path: Path.no_match,
    name: 'No match',
    component: <NoMatch />,
  },
];
