import { Button, Box, Grid, Typography, Container, TextField } from '@mui/material';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import { useAppSelector } from '../../hooks';
import { Path } from '../../router/routes';
import { resetError, signIn } from '../../store/slices/authSlice';
import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch } from '../../hooks';
import { DataFormSignIn } from '../../utils/types/types';
import { closeModal, openModal } from '../../store/slices/modalSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, token, error } = useAppSelector((state) => state.auth);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm<DataFormSignIn>({ mode: 'onChange' });
  const { t } = useTranslation();

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

  const onSubmit = handleSubmit((data) => {
    dispatch(signIn(data));
    reset();
  });

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <Container component="main" maxWidth="xs">
          <Typography component="h1" variant="h5">
            {t('signInPage.signin')}
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
                {t('signInPage.signin')}
              </Button>
            </form>
          </Box>
          <Grid container>
            <Grid item>
              <Link to={`/${Path.signup}`}>{t('signInPage.link')}</Link>
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
};

export default Login;
