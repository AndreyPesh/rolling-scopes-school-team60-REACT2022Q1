import './App.scss';
import { useAppDispatch, useAppSelector } from './hooks';
import { decrement, increment } from './store/slices/counter';

const App = () => {
  const dispatch = useAppDispatch();
  const value = useAppSelector((state) => state.count.value);

  return (
    <div>
      <h1>counter</h1>
      <button onClick={() => dispatch(increment(10))}> + </button>
      <h2>{value}</h2>
      <button onClick={() => dispatch(decrement(10))}> - </button>
    </div>
  );
};

export default App;
