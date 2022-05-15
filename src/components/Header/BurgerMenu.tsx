import { MouseEventHandler, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { Path } from '../../router/routes';

import './BurgerMenu.scss';

export const BurgerMenu = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
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
        <MenuItem
          onClick={() => {
            navigate(`/${Path.main}`, { replace: true });
            handleClose();
          }}
        >
          Main
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate(`/${Path.dashboard}`, { replace: true });
            handleClose();
          }}
        >
          Dashboard
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate(`/${Path.edit_profile}`, { replace: true });
            handleClose();
          }}
        >
          Edit profile
        </MenuItem>
      </Menu>
    </div>
  );
};
