import { RootState } from '../store';
import { updateCurrentToken } from '../store/slices/user';
import { NAME_STORAGE_TOKEN } from '../utils/constants';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';

export default function useToken() {
  const { token } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  const setToken = (userToken: string) => {
    localStorage.setItem(NAME_STORAGE_TOKEN, JSON.stringify(userToken));
    dispatch(updateCurrentToken(userToken));
  };

  return {
    setToken,
    token,
  };
}
