import { Link } from 'react-router-dom';

import { Button } from '@mui/material';

import { listRoutes } from '../../router/routes';

const UnAuthLinks: React.FC<{ userLogin: () => void }> = ({ userLogin }) => {
  return (
    <>
      {listRoutes
        .filter((route) => !route.isProtected)
        .map((route) => {
          return (
            <li className="header__nav_item" key={route.name}>
              <Link to={`/${route.path}`}>
                <Button variant="contained" color="secondary">
                  {route.name}
                </Button>
              </Link>
            </li>
          );
        })}
      <Button variant="contained" color="secondary" onClick={userLogin}>
        Login
      </Button>
    </>
  );
};

export default UnAuthLinks;
