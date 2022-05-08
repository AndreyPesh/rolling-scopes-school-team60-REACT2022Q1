import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { TypePropsModal } from '../utils/types/types';

const BasicModal = ({ open, handleClose }: TypePropsModal) => (
  <div>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="modal">
        <h1>Component create board</h1>
      </Box>
    </Modal>
  </div>
);

export default BasicModal;
