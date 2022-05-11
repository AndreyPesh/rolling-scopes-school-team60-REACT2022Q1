import { useNavigate } from 'react-router-dom';

import { Button } from '@mui/material';

import { Path } from '../../router/routes';

const Logout = () => {
  const navigate = useNavigate();
  const logout = () => {
    navigate(Path.home);
  };
  return (
    <Button variant="contained" color="secondary" onClick={logout}>
      Sign Out
    </Button>
  );
};

export default Logout;
