import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { RootState } from '../../store';
import { close } from '../../store/slices/confirm';

const ConfirmModal = () => {
  const { open, title, description, confirmAction } = useAppSelector(
    (state: RootState) => state.confirm
  );
  const dispatch = useAppDispatch();

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
          Disagree
        </Button>
        <Button onClick={agreeAction} variant="outlined" color="success" autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmModal;
