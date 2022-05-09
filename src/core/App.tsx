import { Routes, Route } from 'react-router-dom';
import Welcome from '../pages/Welcome/Welcome';
import Layout from './Layout';
import { listRoutes } from '../router/routes';
import { ProtectedRoute } from '../router/ProtectedRoute';

const App = () => {
  const routes = listRoutes.map((route) => {
    if (route.isProtected) {
      return (
        <Route
          key={route.path}
          path={route.path.toString()}
          element={<ProtectedRoute>{route.component}</ProtectedRoute>}
        />
      );
    }
    return <Route key={route.path} path={route.path.toString()} element={route.component} />;
  });
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Welcome />} />
        {routes}
      </Route>
    </Routes>
  );
};
export default App;
