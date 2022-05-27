import { Button, TextField, Grid, Box, Typography, Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import BasicModal from '../../components/Modal/Modal';
import Spinner from '../../components/Spinner/Spinner';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { Path } from '../../router/routes';
import { signUp } from '../../store/slices/authSlice';
import { DataFormSignUp } from '../../utils/types/types';

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const [popup, setPopup] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (error) {
      setPopup(true);
    }
  }, [error]);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm<DataFormSignUp>({ mode: 'onChange' });

  const onSubmit = handleSubmit((data) => {
    dispatch(signUp(data));
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
                name="name"
                control={control}
                rules={{
                  required: 'Name is required',
                }}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="text"
                    label="Name"
                    variant="outlined"
                    fullWidth
                    error={!!errors?.name}
                    helperText={errors?.name?.message}
                    sx={{ mb: 1 }}
                  />
                )}
              />
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
                Sign Up
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

export default SignUp;
