import { Button, Container, TextField } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks';
import { ALL_USERS_URL, BASE_URL } from '../../utils/constants';
import { getUser } from '../../utils/functions/api';
import { ResponseSignUp } from '../../utils/types/types';
import BasicModal from '../../components/Modal/Modal';

import './EditProfile.scss';
import { useNavigate } from 'react-router-dom';
import { Path } from '../../router/routes';

const EditProfile = () => {
  const [userId, setUserId] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [openModalUpdate, setOpenModalUpdate] = useState<boolean>(false);
  const navigate = useNavigate();

  const token = useAppSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchUser = async () => {
      const response: ResponseSignUp = await getUser();
      setUserId(response?.id);
      setName(response.name);
      setLogin(response.login);
    };
    fetchUser();
  }, []);

  const updateProfile = (event: React.FormEvent) => {
    event.preventDefault();

    const requestData = {
      name,
      login,
      password,
    };

    axios.put(`${BASE_URL}${ALL_USERS_URL}/${userId}`, requestData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setOpenModalUpdate(true);
  };

  const handleCloseModalUpdate = () => {
    setOpenModalUpdate(false);
    navigate(`/${Path.main}`, { replace: true });
  };

  return (
    <>
      <Container component="section" className="edit-profile" maxWidth="xs">
        <Box component="form">
          <TextField
            margin="normal"
            fullWidth
            id="name"
            label="Name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="normal"
            fullWidth
            id="login"
            label="Login"
            name="login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            title="Enter old password or new password if you want to change it"
            label="Password"
            name="password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="edit-profile__buttons">
            <Button type="submit" variant="contained" sx={{ mt: 3 }} onClick={updateProfile}>
              Update
            </Button>
            <Button type="submit" variant="contained" sx={{ mt: 3 }}>
              Delete profile
            </Button>
          </div>
        </Box>
      </Container>
      {/* <BasicModal
        open={openModalUpdate}
        handleClose={handleCloseModalUpdate}
        content={<h1>Data updated successfully!</h1>}
      /> */}
    </>
  );
};

export default EditProfile;
