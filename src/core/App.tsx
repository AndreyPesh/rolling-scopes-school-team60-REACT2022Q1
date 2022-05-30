import { Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import { Welcome } from '../pages/Welcome/Welcome';
import { listRoutes, Path } from '../router/routes';
import { ProtectedRoute } from '../router/ProtectedRoute';
import NoMatch from '../pages/NoMatch/NoMatch';
import Layout from './Layout';

const App = () => {
  const routes = listRoutes.map((route) => {
    if (route.params) {
      return (
        <Route key={route.path} path={route.path.toString()} element={route.component}>
          <Route
            path={route.params}
            element={<ProtectedRoute isAllowed={route.isProtected} route={route.component} />}
          />
        </Route>
      );
    }
    return (
      <Route
        key={route.path}
        path={route.path.toString()}
        element={<ProtectedRoute isAllowed={route.isProtected} route={route.component} />}
      />
    );
  });

  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path={Path.home} element={<Layout />}>
          <Route index element={<Welcome />} />
          {routes}
          <Route path={Path.no_match} element={<NoMatch />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
export default App;
