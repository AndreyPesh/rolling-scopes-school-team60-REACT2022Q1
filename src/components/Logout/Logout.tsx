import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { signOut } from '../../store/slices/authSlice';

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const logout = () => {
    dispatch(signOut());
    navigate('/login');
  };

  return (
    <button type="button" onClick={logout}>
      Sign out
    </button>
  );
};

export default Logout;
