import { Navigate } from 'react-router-dom';
import { getToken } from '../utils/functions/localStorage';
import { Path } from './routes';

export const ProtectedRoute: React.FC<{ isAllowed: boolean; route: JSX.Element }> = ({
  isAllowed,
  route,
}) => {
  const token = getToken();
  if (token && !isAllowed) {
    return <Navigate to={`/${Path.main}`} replace />;
  }
  if (!token && isAllowed) {
    return <Navigate to={Path.home} replace />;
  }

  return route;
};
