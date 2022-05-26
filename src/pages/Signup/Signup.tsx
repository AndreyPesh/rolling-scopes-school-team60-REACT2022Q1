import { Button, TextField, Grid, Box, Typography, Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { Path } from '../../router/routes';
import { signUp } from '../../store/slices/authSlice';

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, error, name, login } = useAppSelector((state) => state.auth);

  const { t } = useTranslation();

  const [inputName, setName] = useState('');
  const [inputLogin, setLogin] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {}, [name, navigate]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = {
      name: inputName,
      login: inputLogin,
      password,
    };

    dispatch(signUp(data));

    setName('');
    setLogin('');
    setPassword('');
  };

  return (
    <Container component="main" maxWidth="xs">
      {isLoading && <Typography>Loading...</Typography>}
      {error && <Typography>{error}</Typography>}
      {name && login && (
        <Typography>
          you successfully created an account login: {login}, name: {name}
        </Typography>
      )}
      <Typography component="h1" variant="h5">
        {t('signUpPage.signup')}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label={t('form.name')}
          name="name"
          value={inputName}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="login"
          label={t('form.login')}
          name="login"
          value={inputLogin}
          onChange={(e) => setLogin(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label={t('form.password')}
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          {t('signUpPage.signup')}
        </Button>
        <Grid container>
          <Grid item>
            <Link to={`/${Path.login}`}>{t('signUpPage.link')}</Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default SignUp;
