import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, TextField } from '@mui/material';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import SendIcon from '@mui/icons-material/Send';
import './inputHeader.scss';
import { ColumnData, RequestUpdateColumn } from '../../utils/types/types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { RootState } from '../../store';
import { updateColumnOrder } from '../../utils/functions/api';
import { fetchUpdateBoardDataById } from '../../store/slices/currentBoardSlice';

const InputHeaderTag: React.FC<ColumnData> = ({ title, order, id }) => {
  const {
    auth: { token },
    currentBoard: { boardData },
  } = useAppSelector((state: RootState) => state);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [value, setValue] = useState<string>(title);
  const [loading, setLoading] = useState<boolean>(false);
  const [toggle, setToggle] = useState<boolean>(false);

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setValue(value);
  };

  const showInput = () => {
    setToggle(true);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    if (token) {
      const dataRequestUpdate: RequestUpdateColumn = {
        token,
        title: value,
        order,
        boardId: boardData.id,
        columnId: id,
      };
      const responseUpdateColumn = await updateColumnOrder(dataRequestUpdate);
      if (responseUpdateColumn) {
        dispatch(fetchUpdateBoardDataById({ token, id: boardData.id }));
      }
    }
    setLoading(false);
    setToggle(false);
  };

  useEffect(() => {
    setValue(title);
  }, [title, toggle]);

  return toggle ? (
    <Box component="form" onSubmit={handleSubmit} className="input-header">
      <span className="input-header__buttons">
        <Button
          variant="contained"
          color="error"
          disabled={false}
          onClick={() => setToggle(false)}
          endIcon={<CancelOutlinedIcon />}
        />
        <Button
          variant="contained"
          type="submit"
          disabled={loading}
          color="success"
          endIcon={<SendIcon />}
        />
      </span>
      <TextField
        id="outlined-basic"
        className="input-header__field"
        autoFocus={toggle}
        label={t('form.nameColumn')}
        variant="outlined"
        size="small"
        value={value}
        name="title"
        onBlur={() => setToggle(false)}
        onChange={handleChangeTitle}
      />
    </Box>
  ) : (
    <h2 onClick={showInput} className="input-header-title">
      {title}
    </h2>
  );
};

export default InputHeaderTag;
