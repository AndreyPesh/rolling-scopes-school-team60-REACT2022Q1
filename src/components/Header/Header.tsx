import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getToken } from '../../utils/functions/localStorage';
import './Header.scss';
import { BurgerMenu } from './BurgerMenu';
import AuthLinks from './AuthLinks';
import UnAuthLinks from './UnAuthLinks';

const Header = () => {
  const token = getToken();
  const { i18n } = useTranslation();
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <header
      className="header"
      style={
        scrollPosition ? { padding: '10px 0', backgroundColor: '#032825' } : { padding: '20px 0' }
      }
    >
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
