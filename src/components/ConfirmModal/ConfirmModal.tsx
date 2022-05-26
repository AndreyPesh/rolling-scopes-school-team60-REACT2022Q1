import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { RootState } from '../../store';
import { close } from '../../store/slices/confirmSlice';

const ConfirmModal = () => {
  const { open, title, description, confirmAction } = useAppSelector(
    (state: RootState) => state.confirm
  );
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const closeConfirm = () => {
    dispatch(close(false));
  };

  const agreeAction = () => {
    confirmAction();
    closeConfirm();
  };

  return (
    <Dialog
      open={open}
      onClose={closeConfirm}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeConfirm} variant="outlined" color="error">
          {t('buttons.cancel')}
        </Button>
        <Button onClick={agreeAction} variant="outlined" color="success" autoFocus>
          {t('buttons.agree')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmModal;
