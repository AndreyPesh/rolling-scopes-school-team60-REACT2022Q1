import useToken from '../../hooks/useToken';
import { RESET_TOKEN } from '../../utils/constants';

const Logout = () => {
  const { setToken } = useToken();
  const logout = () => {
    setToken(RESET_TOKEN);
  };
  return (
    <button type="button" onClick={logout}>
      Sign out
    </button>
  );
};

export default Logout;
