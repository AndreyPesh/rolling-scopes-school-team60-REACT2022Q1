import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import ConfirmModal from '../components/ConfirmModal/ConfirmModal';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import useToken from '../hooks/useToken';
import { RESET_TOKEN } from '../utils/constants';
import { isTokenExpire } from '../utils/functions/api';
import { getTokenFromStorage } from '../utils/functions/localStorage';

export default function Layout() {
  const { token, setToken } = useToken();
  const location = useLocation();
  useEffect(() => {
    const tokenStorage = getTokenFromStorage();
    async function checkToken() {
      const isExpire = await isTokenExpire(token);
      if (!isExpire) {
        setToken(RESET_TOKEN);
      }
    }
    if (tokenStorage || token) {
      if (token !== tokenStorage) {
        setToken(RESET_TOKEN);
      } else {
        checkToken();
      }
    }
  }, [location, setToken, token]);
  return (
    <>
      <Header />
      <main className="container container__main">
        <Outlet />
      </main>
      <Footer />
      <ConfirmModal />
    </>
  );
}
