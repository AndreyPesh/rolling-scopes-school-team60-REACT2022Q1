import { TOKEN } from '../../utils/constants';
import AuthLinks from './AuthLinks';
import UnAuthLinks from './UnAuthLinks';

const Header = () => {
  const token = localStorage.getItem(TOKEN);

  return (
    <header>
      <nav>
        <ul>{!token ? <UnAuthLinks /> : <AuthLinks />}</ul>
      </nav>
    </header>
  );
};

export default Header;
