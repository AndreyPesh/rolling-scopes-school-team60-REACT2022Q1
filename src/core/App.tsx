import { Routes, Route } from 'react-router-dom';

import { listRoutes } from '../router/routes';
import { Welcome } from '../pages/Welcome/Welcome';
import Layout from './Layout';

const App = () => {
  const routes = listRoutes.map((route) => (
    <Route key={route.path} path={route.path.toString()} element={route.component} />
  ));
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
