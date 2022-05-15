import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import { useAppSelector } from '../hooks';
import { TOKEN } from '../utils/constants';
import { isTokenExpire } from '../utils/functions/api';
import { getTokenFromStorage } from '../utils/functions/localStorage';

export default function Layout() {
  const token = useAppSelector((state) => state.auth.token);
  const location = useLocation();

  useEffect(() => {
    const tokenStorage = getTokenFromStorage();
    async function checkToken() {
      if (!token) {
        return;
      }
      const isExpire = await isTokenExpire(token);
      if (!isExpire) {
        localStorage.removeItem(TOKEN);
      }
    }
    if (tokenStorage || token) {
      if (token !== tokenStorage) {
        localStorage.removeItem(TOKEN);
      } else {
        checkToken();
      }
    }
  }, [location, token]);
  return (
    <>
      <Header />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
