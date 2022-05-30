import { useNavigate } from 'react-router-dom';

import { Button, Container, TextField } from '@mui/material';
import { Box } from '@mui/system';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { deleteUser, updateUser } from '../../utils/functions/api';
import { DataFormSignUp } from '../../utils/types/types';
import { Path } from '../../router/routes';
import { openModal } from '../../store/slices/modalSlice';
import { open } from '../../store/slices/confirmSlice';
import { signOut } from '../../store/slices/authSlice';

import './EditProfile.scss';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';

interface IEditProfile {
  userId: string;
  formData: DataFormSignUp;
}

const EditProfileForm = ({ formData, userId }: IEditProfile) => {
  const token = useAppSelector((state) => state.auth.token);
  const openModalSuccess = useAppSelector((state) => state.modal.open);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid },
  } = useForm<DataFormSignUp>({
    mode: 'onChange',
    defaultValues: formData,
  });

  const deleteProfile = () => {
    if (token) deleteUser(userId, token);

    dispatch(signOut());
    navigate(`${Path.home}`, { replace: true });
  };

  const openConfirm = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(
      open({
        open: true,
        title: `${t('popupMsgs.deleteProfileTitle')}`,
        description: `${t('popupMsgs.deleteProfile')}?`,
        confirmAction: () => deleteProfile(),
      })
    );
  };

  const onSubmit = handleSubmit((data) => {
    if (token) {
      updateUser(userId, data, token);
    }

    dispatch(openModal({ open: true, contentModal: <h1>{t('popupMsgs.dataUpdate')}</h1> }));

    if (!openModalSuccess) {
      navigate(`/${Path.main}`, { replace: true });
    }

    reset();
  });

  return (
    <Container component="section" className="edit-profile" maxWidth="xs">
      <Box component="form" onSubmit={onSubmit} noValidate>
        <TextField
          margin="normal"
          fullWidth
          id="name"
          label={t('form.name')}
          {...register('name', { required: 'this field is required' })}
          error={!!errors?.name}
          helperText={errors?.name?.message}
        />
        <TextField
          margin="normal"
          fullWidth
          id="login"
          label={t('form.login')}
          {...register('login', {
            required: 'this field is required',
            minLength: {
              value: 8,
              message: 'min 8 char',
            },
          })}
          error={!!errors?.login}
          helperText={errors?.login?.message}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          title="Enter old password or new password if you want to change it"
          label={t('form.password')}
          type="password"
          id="password"
          autoComplete="on"
          {...register('password', {
            required: 'this field is required',
            minLength: {
              value: 8,
              message: 'min 8 char',
            },
          })}
          error={!!errors?.password}
          helperText={errors?.password?.message}
        />
        <div className="edit-profile__buttons">
          <Button type="submit" variant="contained" sx={{ mt: 3 }} disabled={!isValid}>
            {t('buttons.update')}
          </Button>
          <Button type="submit" variant="contained" sx={{ mt: 3 }} onClick={openConfirm}>
            {t('buttons.delete')}
          </Button>
        </div>
      </Box>
    </Container>
  );
};

export default EditProfileForm;
