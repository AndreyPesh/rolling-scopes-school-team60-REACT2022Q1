import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import ConfirmModal from '../components/ConfirmModal/ConfirmModal';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Modal from '../components/Modal/Modal';
import { useAppSelector } from '../hooks';
import { RootState } from '../store';
import { isTokenExpire } from '../utils/functions/api';
import { removeToken, getToken } from '../utils/functions/localStorage';

export default function Layout() {
  const {
    auth: { token },
    modal: { open, contentModal },
  } = useAppSelector((state: RootState) => state);
  const location = useLocation();

  useEffect(() => {
    const tokenStorage = getToken();
    async function checkToken() {
      if (!token) {
        return;
      }
      const isExpire = await isTokenExpire(token);
      if (!isExpire) {
        removeToken();
      }
    }
    if (tokenStorage || token) {
      if (token !== tokenStorage) {
        removeToken();
      } else {
        checkToken();
      }
    }
  }, [location, token]);
  return (
    <>
      <Header />
      <main className="container container__main">
        <Outlet />
      </main>
      <Footer />
      <ConfirmModal />
      <Modal open={open} content={contentModal} />
    </>
  );
}
