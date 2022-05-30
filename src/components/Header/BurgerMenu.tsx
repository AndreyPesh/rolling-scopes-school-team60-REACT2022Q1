import { MouseEventHandler, useState } from 'react';

import Menu from '@mui/material/Menu';
import { Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { getToken } from '../../utils/functions/localStorage';

import './BurgerMenu.scss';
import UnAuthLinks from './UnAuthLinks';
import AuthLinks from './AuthLinks';
import Switcher from '../Switcher';

export const BurgerMenu = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const token = getToken();
  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (event) {
      setAnchorEl(event.currentTarget);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MenuIcon className="burger__icon" />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <ul className="burger__list">
          {!token ? <UnAuthLinks /> : <AuthLinks />}
          <Switcher />
        </ul>
      </Menu>
    </div>
  );
};
