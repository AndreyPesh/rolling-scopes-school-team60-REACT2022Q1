import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { Path } from '../../router/routes';
import { signOut } from '../../store/slices/authSlice';
import { logOut } from '../../store/slices/userSlice';
import { Button } from '@mui/material';


const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const logout = () => {
    dispatch(signOut());
    dispatch(logOut());
    navigate(`/${Path.login}`);
  };

  return (
    <Button variant="contained" color="secondary" onClick={logout}>
      Sign Out
    </Button>
  );
};

export default Logout;
