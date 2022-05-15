import { Link, useLocation } from 'react-router-dom';
import { Path } from '../../router/routes';
import { TOKEN } from '../../utils/constants';
import CreateBoard from '../CreateBoard/CreateBoard';
import Logout from '../Logout/Logout';

const AuthLinks = () => {
  const token = localStorage.getItem(TOKEN);
  const location = useLocation();
  if (token && location.pathname === Path.home.toString()) {
    return <Link to={`/${Path.main}`}>Go to main page</Link>;
  }
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
