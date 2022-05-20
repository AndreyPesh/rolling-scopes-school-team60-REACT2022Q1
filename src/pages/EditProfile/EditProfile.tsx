import axios from 'axios';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Container, TextField } from '@mui/material';
import { Box } from '@mui/system';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { ALL_USERS_URL, BASE_URL } from '../../utils/constants';
import { getUser } from '../../utils/functions/api';
import { ResponseSignUp } from '../../utils/types/types';
import { Path } from '../../router/routes';
import { openModal } from '../../store/slices/modalSlice';
import { open } from '../../store/slices/confirmSlice';

import './EditProfile.scss';
import { signOut } from '../../store/slices/authSlice';

const TITLE_DELETE_PROFILE = 'Delete profile';
const QUESTION_DELETE_PROFILE = 'Are you sure want to delete the profile';

const EditProfile = () => {
  const [userId, setUserId] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const token = useAppSelector((state) => state.auth.token);
  const openModalSuccess = useAppSelector((state) => state.modal.open);
  const dispatch = useAppDispatch();

  const deleteUs = async () => {
    await axios.delete(`${BASE_URL}${ALL_USERS_URL}/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(signOut);
    localStorage.clear();
    navigate(`/${Path.home}`, { replace: true });
  };

  const openConfirm = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(
      open({
        open: true,
        title: TITLE_DELETE_PROFILE,
        description: `${QUESTION_DELETE_PROFILE}?`,
        confirmAction: () => deleteUs(),
      })
    );
  };

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

    dispatch(openModal({ open: true, contentModal: <h1>Data updated successfully!</h1> }));

    if (!openModalSuccess) {
      navigate(`/${Path.main}`, { replace: true });
    }
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
            autoComplete="on"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="edit-profile__buttons">
            <Button type="submit" variant="contained" sx={{ mt: 3 }} onClick={updateProfile}>
              Update
            </Button>
            <Button type="submit" variant="contained" sx={{ mt: 3 }} onClick={openConfirm}>
              Delete profile
            </Button>
          </div>
        </Box>
      </Container>
    </>
  );
};

export default EditProfile;
