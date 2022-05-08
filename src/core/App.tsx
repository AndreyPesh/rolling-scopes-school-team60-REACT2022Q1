// import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Welcome from '../pages/Welcome';
import Layout from './Layout';
import { listRoutes } from '../router/routes';

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
