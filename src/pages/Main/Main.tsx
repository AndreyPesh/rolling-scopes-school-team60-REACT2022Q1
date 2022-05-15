import { useEffect } from 'react';
import { getUser } from '../../utils/functions/api';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks';
import { ErrorResponse, UserData } from '../../utils/types/types';
import { getUserFail, getUserPending, getUserSuccess } from '../../store/slices/userSlice';

export default function Main() {
  const dispatch = useAppDispatch();
  const { error, isLoading, name, login } = useAppSelector((state) => state.user);

  useEffect(() => {
    const fetchUser = async () => {
      dispatch(getUserPending());

      const response = await getUser();

      dispatch(getUserSuccess(response));

      // dispatch(getUserFail(response.response.data.message));
    };
    fetchUser();
  }, [dispatch]);

  return (
    <>
      <h2>Main</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <p>login: {login}</p>
      <p>name: {name}</p>
    </>
  );
}
