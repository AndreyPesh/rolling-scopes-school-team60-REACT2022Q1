import { getToken } from '../../utils/functions/localStorage';
import './Header.scss';
import { BurgerMenu } from './BurgerMenu';
import AuthLinks from './AuthLinks';
import UnAuthLinks from './UnAuthLinks';

const Header = () => {
  const token = getToken();

  return (
    <header className="header">
      <div className="container header__container">
        <div className="header__nav_wrap">
          <nav className="header__nav">
            <ul className="header__nav_list">{!token ? <UnAuthLinks /> : <AuthLinks />}</ul>
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
