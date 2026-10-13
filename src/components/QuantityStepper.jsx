import Icon from "./Icon.jsx";

function QuantityStepper({ value, onIncrease, onDecrease, min = 0 }) {
  return (
    <div className="stepper">
      <button onClick={onDecrease} disabled={value <= min} aria-label="Decrease quantity">
        <Icon name="minus" size={16} />
      </button>
      <span aria-live="polite">{value}</span>
      <button onClick={onIncrease} aria-label="Increase quantity">
        <Icon name="plus" size={16} />
      </button>
    </div>
  );
}

export default QuantityStepper;
