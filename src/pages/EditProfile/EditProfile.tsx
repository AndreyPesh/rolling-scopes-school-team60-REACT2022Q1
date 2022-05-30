import { useEffect, useState } from 'react';

import { getUser } from '../../utils/functions/api';
import { DataFormSignUp, ResponseSignUp } from '../../utils/types/types';

import './EditProfile.scss';
import Spinner from '../../components/Spinner/Spinner';
import EditProfileForm from './EditProfileForm';

const EditProfile = () => {
  const [userId, setUserId] = useState<string>('');
  const [formData, setFormData] = useState<DataFormSignUp | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response: ResponseSignUp = await getUser();
      setUserId(response?.id);
      setFormData({
        name: response.name,
        login: response.login,
        password: '',
      });
    };
    fetchUser();
  }, []);

  return <>{formData ? <EditProfileForm formData={formData} userId={userId} /> : <Spinner />}</>;
};

export default EditProfile;
