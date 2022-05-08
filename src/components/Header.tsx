import { Link } from 'react-router-dom';
import { Path } from '../router/routes';
import CreateBoard from './CreateBoard';
import Logout from './Logout';

const Header = () => (
  <header>
    <nav>
      <ul>
        <li>
          <Link to={`/${Path.main}`}>main</Link>
        </li>
        <li>
          <Link to={`/${Path.dashboard}`}>dashboard</Link>
        </li>
        <li>
          <Link to={`/${Path.login}`}>login</Link>
        </li>
        <li>
          <Link to={`/${Path.signup}`}>signup</Link>
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
      </ul>
    </nav>
  </header>
);

export default Header;
