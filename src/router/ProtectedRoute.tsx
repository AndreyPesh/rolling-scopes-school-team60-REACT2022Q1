import { Navigate } from 'react-router-dom';
import { Path } from './routes';
import { useAppSelector } from '../hooks';
import { RootState } from '../store';

export const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { token } = useAppSelector((state: RootState) => state.user);

  if (!token) {
    return <Navigate to={Path.home} replace />;
  }

  return children;
};
