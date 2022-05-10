import { NAME_STORAGE_TOKEN, RESET_TOKEN } from '../constants';

export const getTokenFromStorage = () => {
  const token = localStorage.getItem(NAME_STORAGE_TOKEN);
  if (token) {
    const userToken = JSON.parse(token);
    return userToken;
  }
  return RESET_TOKEN;
};
