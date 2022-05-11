import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@mui/material';

import { listRoutes } from '../../router/routes';
import CreateBoard from '../CreateBoard/CreateBoard';
import Logout from '../Logout/Logout';

import './Header.scss';
import { BurgerMenu } from './BurgerMenu';

const Header = () => {
  const [auth, setAuth] = useState<boolean>(true);

  return (
    <header className="header">
      <div className="container header__container">
        <div className="header__nav_wrap">
          <nav className="header__nav">
            <ul className="header__nav_list">
              {auth && (
                <>
                  {listRoutes
                    .filter(
                      (route) =>
                        route.name !== 'Sign in' &&
                        route.name !== 'Sign up' &&
                        route.name !== 'No match'
                    )
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
              )}
              {!auth && (
                <>
                  {listRoutes
                    .filter((route) => route.name === 'Sign in' || route.name === 'Sign up')
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
              )}
            </ul>
          </nav>
          <div className="burger__wrap">
            <BurgerMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
