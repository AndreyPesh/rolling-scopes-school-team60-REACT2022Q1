import { Link } from 'react-router-dom';
import { Path } from '../../router/routes';

const UnAuthLinks: React.FC<{ userLogin: () => void }> = ({ userLogin }) => {
  return (
    <>
      <li>
        <Link to={`/${Path.login}`}>Sign In</Link>
      </li>
      <li>
        <Link to={`/${Path.signup}`}>Sign Up</Link>
      </li>
      <button onClick={userLogin}>Login</button>
    </>
  );
};

export default UnAuthLinks;
