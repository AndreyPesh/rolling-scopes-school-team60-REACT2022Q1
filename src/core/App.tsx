import { Routes, Route } from 'react-router-dom';

import { Welcome } from '../pages/Welcome/Welcome';
import { listRoutes, Path } from '../router/routes';
import { ProtectedRoute } from '../router/ProtectedRoute';
import NoMatch from '../pages/NoMatch/NoMatch';
import Layout from './Layout';

const App = () => {
  const routes = listRoutes.map((route) => {
    return (
      <Route
        key={route.path}
        path={route.path.toString()}
        element={<ProtectedRoute isAllowed={route.isProtected} route={route.component} />}
      />
    );
  });

  return (
    <Routes>
      <Route path={Path.home} element={<Layout />}>
        <Route index element={<Welcome />} />
        {routes}
        <Route path={Path.no_match} element={<NoMatch />} />
      </Route>
    </Routes>
  );
};
export default App;
