import './spinner.scss';
import { CircularProgress } from '@mui/material';

const Spinner = () => {
  return (
    <div className="spinner">
      <CircularProgress color="primary" />
    </div>
  );
};

export default Spinner;
