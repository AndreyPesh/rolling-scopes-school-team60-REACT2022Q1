import { Button } from '@mui/material';

import useToken from '../../hooks/useToken';
import { RESET_TOKEN } from '../../utils/constants';

const Logout = () => {
  const { setToken } = useToken();
  const logout = () => {
    setToken(RESET_TOKEN);
  };

  return (
    <Button variant="contained" color="secondary" onClick={logout}>
      Sign Out
    </Button>
  );
};

export default Logout;
