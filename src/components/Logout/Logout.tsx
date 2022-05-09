import { useAppDispatch } from '../../hooks';
import { login } from '../../store/slices/user';

const Logout = () => {
  const dispatch = useAppDispatch();
  const logout = () => {
    dispatch(login(''));
  };
  return (
    <button type="button" onClick={logout}>
      Sign out
    </button>
  );
};

export default Logout;
