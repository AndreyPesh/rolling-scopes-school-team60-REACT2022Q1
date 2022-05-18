import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initModal = () => {
  return <h2>Empty modal</h2>;
};

interface ModalData {
  open: boolean;
  contentModal: JSX.Element;
}

const initialState: ModalData = {
  open: false,
  contentModal: initModal(),
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    closeModal(state, action: PayloadAction<boolean>) {
      state.open = action.payload;
    },
    openModal(state, action: PayloadAction<ModalData>) {
      return { ...state, ...action.payload };
    },
  },
});

export const { closeModal, openModal } = modalSlice.actions;

export default modalSlice.reducer;
