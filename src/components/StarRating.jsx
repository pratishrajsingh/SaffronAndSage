import Icon from "./Icon.jsx";

function StarRating({ value, max = 5 }) {
  return (
    <span className="stars" aria-label={`${value} out of ${max} stars`}>
      {Array.from({ length: max }, (_, index) => (
        <Icon key={index} name="star" size={15} filled={index < Math.round(value)} />
      ))}
    </span>
  );
}

export default StarRating;
