import { TOKEN } from '../constants';

export const getTokenFromStorage = () => {
  const token = localStorage.getItem(TOKEN);
  if (token) {
    return token;
  }
  return '';
};
