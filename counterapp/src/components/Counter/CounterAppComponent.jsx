
import "./styles.css";

const CounterAppComponent = ({
  value = 1,
  max = 1000,
  onDecrement = () => {},
  onIncrement = () => {},
  onChange = () => {},
}) => (
  <div className="counter">
   <button className="btndec"
    onClick={onDecrement}>
    -
    </button>
    <input
      type="text"
      className="counter-inp"
      aria-label="Count"
      value={value}
      max={max}
      onChange={onChange}
    />
    <button className="btninc"
     onClick={onIncrement}>
     +
     </button>
  </div>
);


export default CounterAppComponent;
