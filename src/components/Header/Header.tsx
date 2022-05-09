import { Link } from 'react-router-dom';
import { Path } from '../../router/routes';
import { RootState } from '../../store';
import { login } from '../../store/slices/user';
import { useAppDispatch, useAppSelector } from '../../hooks';
import CreateBoard from '../CreateBoard/CreateBoard';
import Logout from '../Logout/Logout';

const Header = () => {
  const user = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  const userLoginLogout = () => {
    !user.token ? dispatch(login('user_token')) : dispatch(login(''));
  };

  return (
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
        <button onClick={userLoginLogout}>{!user.token ? 'Login' : 'Logout'}</button>
      </nav>
    </header>
  );
};

export default Header;
