import { useEffect, useState } from 'react';
import { TOKEN } from '../../utils/constants';
import { getUser } from '../../utils/functions/api';
import { parseJwt } from '../../utils/functions/parseJwt';

interface User {
  name: string;
  login: string;
}

export default function Main() {
  const [user, setUser] = useState<User>({
    name: '',
    login: '',
  });

  useEffect(() => {
    const token = localStorage.getItem(TOKEN);
    if (!token) return;
    const { userId } = parseJwt(token);

    (async () => {
      try {
        const response = await getUser(userId);
        setUser({ name: response.name, login: response.login });
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      <h2>Main</h2>
      <p>login: {user.login}</p>
      <p>name: {user.name}</p>
    </>
  );
}
