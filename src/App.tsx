import { Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Main from './pages/Main';
import Dashboard from './pages/Dashboard';
import NoMatch from './pages/NoMatch';

import './App.scss';
import Layout from './router/Layout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import EditProfile from './pages/EditProfile';

const App = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Welcome />} />
      <Route path="main" element={<Main />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="edit_profile" element={<EditProfile />} />
      <Route path="*" element={<NoMatch />} />
    </Route>
  </Routes>
);
export default App;
