import { TOKEN } from '../constants';

export const getToken = () => {
  const token = localStorage.getItem(TOKEN);
  if (token) {
    return token;
  }
  return '';
};
export const setToken = (value: string) => {
  localStorage.setItem(TOKEN, value);
};
export const removeToken = () => {
  localStorage.removeItem(TOKEN);
};
