import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Icon from "./Icon.jsx";
import { useCart } from "../hooks/useAppContext.js";
import { toggleFavorite, selectIsFavorite } from "../redux/favoriteSlice.js";
import { formatPrice } from "../utils/format.js";

function DishCard({ dish }) {
  const { addItem } = useCart();
  const dispatch = useDispatch();
  const isFavorite = useSelector(selectIsFavorite(dish.id));
  const [added, setAdded] = useState(false);
  const timerRef = useRef(null);

  // Clear the "Added" timer if the card unmounts
  useEffect(() => () => clearTimeout(timerRef.current), []);

  const handleAdd = () => {
    addItem(dish);
    setAdded(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setAdded(false), 1400);
  };

  return (
    <article className="dish-card">
      <Link to={`/menu/dish/${dish.id}`} className="dish-card-media">
        <img src={`${dish.image}/medium`} alt={dish.name} loading="lazy" />
        <span className="rating-chip">
          <Icon name="star" size={13} filled /> {dish.rating}
        </span>
      </Link>

      <button
        className={`fav-btn ${isFavorite ? "active" : ""}`}
        onClick={() => dispatch(toggleFavorite(dish))}
        aria-label={isFavorite ? `Remove ${dish.name} from favourites` : `Add ${dish.name} to favourites`}
        aria-pressed={isFavorite}
      >
        <Icon name="heart" size={17} filled={isFavorite} />
      </button>

      <div className="dish-card-body">
        <Link to={`/menu/dish/${dish.id}`} className="dish-card-title">
          {dish.name}
        </Link>
        {(dish.category || dish.area) && (
          <p className="dish-card-meta">
            {[dish.area, dish.category].filter(Boolean).join(" · ")}
          </p>
        )}

        <div className="dish-card-footer">
          <span className="price">{formatPrice(dish.price)}</span>
          <button
            className={`btn btn-sm ${added ? "btn-success" : "btn-primary"}`}
            onClick={handleAdd}
          >
            <Icon name={added ? "check" : "plus"} size={16} />
            {added ? "Added" : "Add"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default DishCard;
