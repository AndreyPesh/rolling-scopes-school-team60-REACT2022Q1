import './Modal.scss';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { TypePropsModal } from '../../utils/types/types';

const BasicModal: React.FC<TypePropsModal> = ({ open, handleClose, content }) => (
  <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box className="modal">{content}</Box>
  </Modal>
);

export default BasicModal;
