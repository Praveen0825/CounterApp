
import CounterAppComponent from "./CounterAppComponent";

const Counter = ({
  count = 1,
  max = 1000,
  onDecrement = () => {},
  onIncrement = () => {},
  onChange = () => {},
}) => {
  return (
    <CounterAppComponent
      value={count}
      max={max}
      onDecrement={onDecrement}
      onIncrement={onIncrement}
      onChange={onChange}
    />
  );
};


export default Counter;
