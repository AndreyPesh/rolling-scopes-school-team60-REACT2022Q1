import { Button, Grid, Box, Typography, Container, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { Path } from '../../router/routes';
import { signIn } from '../../store/slices/authSlice';
import BasicModal from '../../components/Modal/Modal';
import ModalForm from '../../components/ModalForm';

const fields = [
  {
    name: 'login',
    type: 'text',
    validationsRules: {
      required: 'this input is required',
      minLength: {
        value: 8,
        message: 'minimum 8 characters',
      },
    },
  },
  {
    name: 'password',
    type: 'password',
    validationsRules: {
      required: 'this input is required',
      minLength: {
        value: 8,
        message: 'minimum 8 characters',
      },
    },
  },
];

const Login = () => {
  const navigate = useNavigate();
  const { isLoading, token, error } = useAppSelector((state) => state.auth);

  const [popup, setPopup] = useState(false);

  useEffect(() => {
    if (token) {
      navigate(`/${Path.main}`);
    }
  }, [token, navigate]);

  useEffect(() => {
    if (error) {
      setPopup(true);
    }
  }, [error]);

  return (
    <>
      {
        <BasicModal
          open={popup}
          handleClose={() => setPopup(false)}
          content={
            <Typography component="h1" variant="h5">
              {error}
              <Button
                onClick={() => setPopup(false)}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Ok
              </Button>
            </Typography>
          }
        />
      }
      {isLoading ? (
        <Spinner />
      ) : (
        <Container component="main" maxWidth="xs">
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box sx={{ mt: 1 }}>
            <ModalForm inputObj={fields} submitFunc={signIn} submitBtnName="Sign In" />
          </Box>
        </Container>
      )}
    </>
  );
};

export default Login;
