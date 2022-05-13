import { Navigate } from 'react-router-dom';
import { Path } from './routes';
import { useAppSelector } from '../hooks';
import { RootState } from '../store';

export const ProtectedRoute: React.FC<{ isAllowed: boolean; route: JSX.Element }> = ({
  isAllowed,
  route,
}) => {
  const { token } = useAppSelector((state: RootState) => state.user);
  if (token && !isAllowed) {
    return <Navigate to={`/${Path.main}`} replace />;
  }
  if (!token && isAllowed) {
    return <Navigate to={Path.home} replace />;
  }

  return route;
};
