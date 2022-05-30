import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import ConfirmModal from '../components/ConfirmModal/ConfirmModal';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Modal from '../components/Modal/Modal';
import { useAppDispatch, useAppSelector } from '../hooks';
import { RootState } from '../store';
import { isTokenExpire } from '../utils/functions/api';
import { removeToken, getToken } from '../utils/functions/localStorage';
import { getUserPending, getUserSuccess } from '../store/slices/userSlice';
import { getUser } from '../utils/functions/api';
import { Path } from '../router/routes';

export default function Layout() {
  const dispatch = useAppDispatch();
  const {
    auth: { token },
    modal: { open, contentModal },
  } = useAppSelector((state: RootState) => state);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      dispatch(getUserPending());

      const response = await getUser();

      dispatch(getUserSuccess(response));
    };
    if (token) {
      fetchUser();
    }
  }, [dispatch, token]);

  useEffect(() => {
    const tokenStorage = getToken();
    async function checkToken() {
      if (!token) {
        return;
      }
      const isExpire = await isTokenExpire(token);
      if (!isExpire) {
        removeToken();
        navigate(`${Path.home}`);
      }
    }
    if (tokenStorage || token) {
      if (token !== tokenStorage) {
        removeToken();
        navigate(`${Path.home}`);
      } else {
        checkToken();
      }
    }
  }, [location, token, navigate]);
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
