import { Link } from "react-router-dom";
import Icon from "./Icon.jsx";
import QuantityStepper from "./QuantityStepper.jsx";
import { useCart } from "../hooks/useAppContext.js";
import { formatPrice } from "../utils/format.js";

function CartItem({ item }) {
  const { increase, decrease, removeItem } = useCart();

  return (
    <li className="cart-item">
      <img src={`${item.image}/small`} alt="" />

      <div className="cart-item-info">
        <Link to={`/menu/dish/${item.id}`} className="cart-item-name">{item.name}</Link>
        <span className="muted">{formatPrice(item.price)} each</span>
      </div>

      <QuantityStepper
        value={item.quantity}
        onIncrease={() => increase(item.id)}
        onDecrease={() => decrease(item.id)}
      />

      <span className="cart-item-total">{formatPrice(item.price * item.quantity)}</span>

      <button
        className="icon-btn danger"
        onClick={() => removeItem(item.id)}
        aria-label={`Remove ${item.name}`}
      >
        <Icon name="trash" size={18} />
      </button>
    </li>
  );
}

export default CartItem;
