import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { RootState } from '../../store';
import { fetchListBoards } from '../../store/slices/boards';

export default function Main() {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state: RootState) => state.user);
  useEffect(() => {
    dispatch(fetchListBoards(token));
    console.log('render main');
  });
  return <h2>Main</h2>;
}
