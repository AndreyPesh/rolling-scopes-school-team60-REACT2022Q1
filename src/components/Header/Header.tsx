import { useEffect, useState } from 'react';
import { getToken } from '../../utils/functions/localStorage';
import './Header.scss';
import { BurgerMenu } from './BurgerMenu';
import AuthLinks from './AuthLinks';
import UnAuthLinks from './UnAuthLinks';
import Switcher from '../Switcher';

const Header = () => {
  const token = getToken();
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
              <Switcher />
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
