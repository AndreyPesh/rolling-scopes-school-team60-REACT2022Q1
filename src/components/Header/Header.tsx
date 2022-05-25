import { getToken } from '../../utils/functions/localStorage';
import './Header.scss';
import { BurgerMenu } from './BurgerMenu';
import AuthLinks from './AuthLinks';
import UnAuthLinks from './UnAuthLinks';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const token = getToken();
  const { i18n, t } = useTranslation();

  const handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <header className="header">
      <div className="container header__container">
        <div className="header__nav_wrap">
          <nav className="header__nav">
            <ul className="header__nav_list">
              {!token ? <UnAuthLinks /> : <AuthLinks />}
              <li
                className="header__nav_item"
                style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
              >
                <select
                  className="header__lang"
                  value={localStorage.getItem('i18nextLng') || 'en'}
                  onChange={handleLangChange}
                >
                  <option value="en">EN</option>
                  <option value="ru">RU</option>
                </select>
              </li>
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
