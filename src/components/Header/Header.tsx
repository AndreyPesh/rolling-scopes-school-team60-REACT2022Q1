import useToken from '../../hooks/useToken';
import { signin } from '../../utils/functions/api';
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
    <header>
      <nav>
        <ul>{!token ? <UnAuthLinks userLogin={userLogin} /> : <AuthLinks />}</ul>
      </nav>
    </header>
  );
};

export default Header;
