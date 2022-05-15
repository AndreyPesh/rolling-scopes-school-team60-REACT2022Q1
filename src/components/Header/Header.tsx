import useToken from '../../hooks/useToken';
import { signin } from '../../utils/functions/api';

import './Header.scss';
import { BurgerMenu } from './BurgerMenu';
import AuthLinks from './AuthLinks';
import UnAuthLinks from './UnAuthLinks';

const fakeDataForm = {
  login: 'user001',
  password: 'userpass@123',
};

const Header = () => {
  const { token, setToken } = useToken();

  const userLogin = async () => {
    const response = await signin(fakeDataForm);
    if (response) {
      setToken(response.token);
    }
  };

  return (
    <header className="header">
      <div className="container header__container">
        <div className="header__nav_wrap">
          <nav className="header__nav">
            <ul className="header__nav_list">
              {!token ? <UnAuthLinks userLogin={userLogin} /> : <AuthLinks />}
            </ul>
          </nav>
          <div className="burger__wrap">
            <BurgerMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
