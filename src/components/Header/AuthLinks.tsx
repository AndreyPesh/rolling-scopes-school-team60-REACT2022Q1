import { Link, useLocation } from 'react-router-dom';
import { Button } from '@mui/material';

import useToken from '../../hooks/useToken';
import { listRoutes, Path } from '../../router/routes';
import CreateBoard from '../CreateBoard/CreateBoard';
import Logout from '../Logout/Logout';

const AuthLinks = () => {
  const { token } = useToken();
  const location = useLocation();

  if (token && location.pathname === Path.home.toString()) {
    return (
      <Link to={`/${Path.main}`} style={{ textDecoration: 'none' }}>
        <Button variant="contained" color="secondary">
          Go to main page
        </Button>
      </Link>
    );
  }

  return (
    <>
      {listRoutes
        .filter((route) => route.isProtected)
        .map((route) => {
          return (
            <li className="header__nav_item" key={route.name}>
              <Link to={`/${route.path}`}>{route.name}</Link>
            </li>
          );
        })}
      <li className="header__nav_item">
        <CreateBoard />
      </li>
      <li className="header__nav_item">
        <Logout />
      </li>
    </>
  );
};

export default AuthLinks;
