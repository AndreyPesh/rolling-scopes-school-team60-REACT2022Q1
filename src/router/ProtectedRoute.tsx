import { Navigate } from 'react-router-dom';
import { TOKEN } from '../utils/constants';
import { Path } from './routes';

export const ProtectedRoute: React.FC<{ isAllowed: boolean; route: JSX.Element }> = ({
  isAllowed,
  route,
}) => {
  const token = localStorage.getItem(TOKEN);
  if (token && !isAllowed) {
    return <Navigate to={`/${Path.main}`} replace />;
  }
  if (!token && isAllowed) {
    return <Navigate to={Path.home} replace />;
  }

  return route;
};
