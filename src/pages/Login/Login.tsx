import { Button, Box, Grid, Typography, Container, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import { useAppSelector } from '../../hooks';
import { Path } from '../../router/routes';
import { signIn } from '../../store/slices/authSlice';
import BasicModal from '../../components/Modal/Modal';
import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch } from '../../hooks';
import { DataFormSignIn } from '../../utils/types/types';

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
  const dispatch = useAppDispatch();
  const { isLoading, token, error } = useAppSelector((state) => state.auth);

  const [popup, setPopup] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm<DataFormSignIn>({ mode: 'onChange' });

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

  const onSubmit = handleSubmit((data) => {
    dispatch(signIn(data));
    reset();
  });

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
          <Box sx={{ m: 1 }}>
            <form onSubmit={onSubmit} noValidate>
              <Controller
                name="login"
                control={control}
                rules={{
                  required: 'Login is required',
                  minLength: {
                    value: 8,
                    message: 'minimum 8 characters',
                  },
                }}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="text"
                    label="Login"
                    variant="outlined"
                    fullWidth
                    error={!!errors?.login}
                    helperText={errors?.login?.message}
                    sx={{ mb: 1 }}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                rules={{
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'minimum 8 characters',
                  },
                }}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="password"
                    label="Password"
                    variant="outlined"
                    fullWidth
                    error={!!errors?.password}
                    helperText={errors?.password?.message}
                    sx={{ mb: 1 }}
                  />
                )}
              />
              <Button
                disabled={!isValid}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </form>
          </Box>
          <Grid container>
            <Grid item>
              <Link to={`/${Path.signup}`}>{"Don't have an account? Register"}</Link>
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
};

export default Login;
