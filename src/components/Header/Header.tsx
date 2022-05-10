import { Link } from 'react-router-dom';
import useToken from '../../hooks/useToken';
import { Path } from '../../router/routes';
import CreateBoard from '../CreateBoard/CreateBoard';
import Logout from '../Logout/Logout';

const Header = () => {
  const { token, setToken } = useToken();

  const userLogin = () => {
    setToken('new_token');
  };
  return (
    <header>
      <nav>
        <ul>{!token ? <UnAuthLinks userLogin={userLogin} /> : <AuthLinks />}</ul>
      </nav>
    </header>
  );
};

export default Header;

const AuthLinks = () => {
  return (
    <>
      <li>
        <Link to={`/${Path.main}`}>main</Link>
      </li>
      <li>
        <Link to={`/${Path.dashboard}`}>dashboard</Link>
      </li>
      <li>
        <Link to={`/${Path.edit_profile}`}>edit profile</Link>
      </li>
      <li>
        <CreateBoard />
      </li>
      <li>
        <Logout />
      </li>
    </>
  );
};

const UnAuthLinks: React.FC<{ userLogin: () => void }> = ({ userLogin }) => {
  return (
    <>
      <li>
        <Link to={`/${Path.login}`}>Sign In</Link>
      </li>
      <li>
        <Link to={`/${Path.signup}`}>Sign Up</Link>
      </li>
      <button onClick={userLogin}>Login</button>
    </>
  );
};
