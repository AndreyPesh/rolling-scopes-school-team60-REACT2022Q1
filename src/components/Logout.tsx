import { useNavigate } from 'react-router-dom';
import { Path } from '../router/routes';

const Logout = () => {
  const navigate = useNavigate();
  const logout = () => {
    navigate(Path.home);
  };
  return (
    <button type="button" onClick={logout}>
      Logout
    </button>
  );
};

export default Logout;
