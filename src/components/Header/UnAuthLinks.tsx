import { Link } from 'react-router-dom';

import { Button } from '@mui/material';

import { listRoutes } from '../../router/routes';

const UnAuthLinks: React.FC = () => {
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
    </>
  );
};

export default UnAuthLinks;
