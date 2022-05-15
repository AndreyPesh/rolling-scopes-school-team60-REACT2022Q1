import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { Path } from '../../router/routes';
import { signOut } from '../../store/slices/authSlice';

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const logout = () => {
    dispatch(signOut());
    navigate(`/${Path.login}`);
  };

  return (
    <button type="button" onClick={logout}>
      Sign out
    </button>
  );
};

export default Logout;
