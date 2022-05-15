import { getToken } from '../../utils/functions/localStorage';
import AuthLinks from './AuthLinks';
import UnAuthLinks from './UnAuthLinks';

const Header = () => {
  const token = getToken();

  return (
    <header>
      <nav>
        <ul>{!token ? <UnAuthLinks /> : <AuthLinks />}</ul>
      </nav>
    </header>
  );
};

export default Header;
