import { Link } from 'react-router-dom';
import { Path } from '../../router/routes';
import CreateBoard from '../CreateBoard/CreateBoard';
import Logout from '../Logout/Logout';

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

export default AuthLinks;
