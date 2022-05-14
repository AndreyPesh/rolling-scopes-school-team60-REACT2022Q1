import { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks';
import { getUser } from '../../utils/api';

interface User {
  name: string;
  login: string;
}

export default function Dashboard() {
  const { userId } = useAppSelector((state) => state.login);

  const [user, setUser] = useState<User>({
    name: '',
    login: '',
  });

  useEffect(() => {
    // const fetchUser = async () => {
    //   try {
    //     const response = await getUser(userId);
    //     setUser({ name: response.name, login: response.login });
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // fetchUser();
  }, [userId]);

  return (
    <>
      <h2>dashboard</h2>
      <p>login: {user.login}</p>
      <p>name: {user.name}</p>
    </>
  );
}
