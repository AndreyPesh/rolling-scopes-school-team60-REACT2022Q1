import { Box, Button, TextField } from '@mui/material';
import { AsyncThunk } from '@reduxjs/toolkit';
import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch } from '../../hooks';
import { DataFormSignIn, ResponseSignIn } from '../../utils/types/types';

type FormProps = {
  inputObj: ISingleInput[];
  submitFunc: AsyncThunk<ResponseSignIn, DataFormSignIn, { rejectValue: string }>;
  submitBtnName: string;
};

interface ISingleInput {
  name: string;
  type: string;
  validationsRules: {
    required: string;
    minLength: {
      value: number;
      message: string;
    };
  };
}

const ModalForm = ({ inputObj, submitFunc, submitBtnName }: FormProps) => {
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const onSubmit = handleSubmit((data) => {
    dispatch(submitFunc(data));
    console.log(data);
    reset();
  });

  return (
    <Box sx={{ m: 1 }}>
      <form onSubmit={onSubmit} noValidate>
        {inputObj.map((elem) => (
          <Controller
            key={elem.name}
            name={elem.name}
            control={control}
            rules={elem.validationsRules}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                type={elem.type}
                label={elem.name}
                variant="outlined"
                fullWidth
                error={!!errors?.[elem.name]}
                helperText={errors?.[elem.name]?.message}
                sx={{ mb: 1 }}
              />
            )}
          />
        ))}
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          {submitBtnName}
        </Button>
      </form>
    </Box>
  );
};

export default ModalForm;
