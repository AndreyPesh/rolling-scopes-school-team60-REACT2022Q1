import './Modal.scss';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { TypePropsModal } from '../../utils/types/types';
import { useAppDispatch } from '../../hooks';
import { closeModal } from '../../store/slices/modalSlice';

const BasicModal: React.FC<TypePropsModal> = ({ open, content }) => {
  const dispatch = useAppDispatch();
  const handleClose = () => {
    dispatch(closeModal(false));
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="modal">{content}</Box>
    </Modal>
  );
};

export default BasicModal;
