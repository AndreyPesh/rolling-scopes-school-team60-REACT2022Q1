import { Button, TextField, Grid, Box, Typography, Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { Path } from '../../router/routes';
import { resetError, signUp, signIn, resetLogin } from '../../store/slices/authSlice';
import { closeModal, openModal } from '../../store/slices/modalSlice';
import { DataFormSignIn, DataFormSignUp } from '../../utils/types/types';

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, error, login, token } = useAppSelector((state) => state.auth);

  const { t } = useTranslation();

  const [signInData, setSignInData] = useState<DataFormSignIn>({
    login: '',
    password: '',
  });

  useEffect(() => {
    if (token) {
      navigate(`/${Path.main}`);
    }
  }, [token, navigate]);

  useEffect(() => {
    if (error) {
      dispatch(
        openModal({
          open: true,
          contentModal: (
            <Typography component="h1" variant="h5">
              {error}
              <Button
                onClick={() => {
                  dispatch(closeModal(false));
                  dispatch(resetError());
                }}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                OK
              </Button>
            </Typography>
          ),
        })
      );
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (login) {
      dispatch(
        openModal({
          open: true,
          contentModal: (
            <Typography component="h1" variant="h5">
              You successfully create an account and will be redirected to main page
              <Button
                onClick={() => {
                  dispatch(closeModal(false));
                  dispatch(signIn(signInData));
                  dispatch(resetLogin());
                }}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                OK
              </Button>
            </Typography>
          ),
        })
      );
    }
  }, [login, dispatch, signInData]);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm<DataFormSignUp>({ mode: 'onChange' });

  const onSubmit = handleSubmit((data) => {
    dispatch(signUp(data));
    setSignInData({
      login: data.login,
      password: data.password,
    });
    reset();
  });

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <Container component="main" maxWidth="xs">
          <Typography component="h1" variant="h5">
            {t('signUpPage.signup')}
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
                    label={t('form.name')}
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
                    label={t('form.login')}
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
                    label={t('form.password')}
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
                {t('signUpPage.signup')}
              </Button>
            </form>
          </Box>
          <Grid container>
            <Grid item>
              <Link to={`/${Path.signup}`}>{t('signUpPage.link')}</Link>
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
};

export default SignUp;
