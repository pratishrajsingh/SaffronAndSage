import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Icon from "../../components/Icon.jsx";
import DishCard from "../../components/DishCard.jsx";
import QuantityStepper from "../../components/QuantityStepper.jsx";
import { Loader, ErrorMessage, EmptyState } from "../../components/Feedback.jsx";
import useFetch from "../../hooks/useFetch.js";
import useDocumentTitle from "../../hooks/useDocumentTitle.js";
import { useCart } from "../../hooks/useAppContext.js";
import { toggleFavorite, selectIsFavorite } from "../../redux/favoriteSlice.js";
import { ENDPOINTS } from "../../services/api.js";
import { toDish, getIngredients } from "../../utils/menu.js";
import { formatPrice } from "../../utils/format.js";

function DishDetails({ dishId }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { addItem, items } = useCart();
  const isFavorite = useSelector(selectIsFavorite(dishId));

  const [quantity, setQuantity] = useState(1);
  const [showFullRecipe, setShowFullRecipe] = useState(false);
  const [addedMessage, setAddedMessage] = useState("");

  const { data, loading, error, refetch } = useFetch(ENDPOINTS.lookup(dishId));
  const meal = data?.meals?.[0];

  // Second request depends on the first: related dishes from the same category
  const related = useFetch(meal ? ENDPOINTS.byCategory(meal.strCategory) : null);

  useDocumentTitle(meal ? meal.strMeal : "Dish");

  if (loading) return <Loader text="Loading dish..." />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;

  if (!meal) {
    return (
      <EmptyState icon="utensils" title="Dish not found" text="This dish may have been removed from our menu.">
        <Link to="/menu" className="btn btn-primary">Back to menu</Link>
      </EmptyState>
    );
  }

  const dish = toDish(meal);
  const ingredients = getIngredients(meal);
  const steps = (meal.strInstructions || "")
    .split(/\r?\n/)
    .map((step) => step.trim())
    .filter((step) => step.length > 3 && !/^step\s*\d+$/i.test(step));
  const visibleSteps = showFullRecipe ? steps : steps.slice(0, 3);
  const inCart = items.find((item) => item.id === dish.id);
  const tags = meal.strTags ? meal.strTags.split(",").filter(Boolean) : [];

  const relatedDishes = (related.data?.meals || [])
    .filter((item) => item.idMeal !== dish.id)
    .slice(0, 4)
    .map((item) => ({ ...toDish(item), category: meal.strCategory }));

  const handleAddToCart = () => {
    addItem(dish, quantity);
    setAddedMessage(`${quantity} × ${dish.name} added to your cart.`);
    setQuantity(1);
  };

  return (
    <>
      <button className="btn btn-ghost back-btn" onClick={() => navigate(-1)}>
        <Icon name="arrowLeft" size={18} /> Back
      </button>

      <article className="dish-detail">
        <div className="dish-detail-media">
          <img src={dish.image} alt={dish.name} />
        </div>

        <div className="dish-detail-info">
          <div className="chip-row">
            <Link to={`/menu/category/${dish.category}`} className="chip">{dish.category}</Link>
            {dish.area && <span className="chip chip-muted">{dish.area}</span>}
            {tags.map((tag) => (
              <span key={tag} className="chip chip-muted">#{tag}</span>
            ))}
          </div>

          <h1>{dish.name}</h1>

          <div className="dish-detail-meta">
            <span className="rating-inline">
              <Icon name="star" size={16} filled /> {dish.rating} rating
            </span>
            <span><Icon name="clock" size={16} /> 25-35 min</span>
            <span><Icon name="leaf" size={16} /> {ingredients.length} ingredients</span>
          </div>

          <p className="dish-detail-price">{formatPrice(dish.price)}</p>

          <div className="dish-detail-actions">
            <QuantityStepper
              value={quantity}
              min={1}
              onIncrease={() => setQuantity((q) => q + 1)}
              onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
            />
            <button className="btn btn-primary btn-lg" onClick={handleAddToCart}>
              <Icon name="cart" size={18} /> Add {formatPrice(dish.price * quantity)}
            </button>
            <button
              className={`icon-btn icon-btn-lg fav-toggle ${isFavorite ? "active" : ""}`}
              onClick={() => dispatch(toggleFavorite(dish))}
              aria-label={isFavorite ? "Remove from favourites" : "Add to favourites"}
              aria-pressed={isFavorite}
            >
              <Icon name="heart" filled={isFavorite} />
            </button>
          </div>

          {addedMessage && (
            <p className="alert alert-success">
              <Icon name="check" size={16} /> {addedMessage} <Link to="/cart">View cart</Link>
            </p>
          )}
          {!addedMessage && inCart && (
            <p className="muted small">You already have {inCart.quantity} in your cart.</p>
          )}

          <h3>Ingredients</h3>
          <ul className="ingredient-list">
            {ingredients.map((item) => (
              <li key={item.name}>
                <img
                  src={`https://www.themealdb.com/images/ingredients/${encodeURIComponent(item.name)}-small.png`}
                  alt=""
                  loading="lazy"
                />
                <span>
                  {item.name}
                  {item.measure && <small className="muted">{item.measure}</small>}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </article>

      <section className="recipe card">
        <h2>How we prepare it</h2>
        <ol className="recipe-steps">
          {visibleSteps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
        {steps.length > 3 && (
          <button className="btn btn-outline btn-sm" onClick={() => setShowFullRecipe((v) => !v)}>
            {showFullRecipe ? "Show less" : `Show all ${steps.length} steps`}
            <Icon name="chevronDown" size={16} className={showFullRecipe ? "rotate" : ""} />
          </button>
        )}
        {meal.strYoutube && (
          <a className="link-arrow video-link" href={meal.strYoutube} target="_blank" rel="noreferrer">
            <Icon name="play" size={18} /> Watch the recipe video
          </a>
        )}
      </section>

      {relatedDishes.length > 0 && (
        <section className="section-sm">
          <h2 className="related-title">More {dish.category} dishes</h2>
          <div className="card-grid">
            {relatedDishes.map((item) => (
              <DishCard key={item.id} dish={item} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

// Keying by id resets quantity/messages when moving between related dishes
function DishDetailsPage() {
  const { dishId } = useParams();
  return <DishDetails key={dishId} dishId={dishId} />;
}

export default DishDetailsPage;
