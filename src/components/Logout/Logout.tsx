import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { Path } from '../../router/routes';
import { signOut } from '../../store/slices/authSlice';
import { logOut } from '../../store/slices/userSlice';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const logout = () => {
    dispatch(signOut());
    dispatch(logOut());
    navigate(`/${Path.login}`);
  };

  return (
    <Button variant="contained" color="secondary" onClick={logout}>
      {t('buttons.signout')}
    </Button>
  );
};

export default Logout;
