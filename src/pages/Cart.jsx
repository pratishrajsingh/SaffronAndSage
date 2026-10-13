import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import PageHeader from "../components/PageHeader.jsx";
import CartItem from "../components/CartItem.jsx";
import FormField from "../components/FormField.jsx";
import Icon from "../components/Icon.jsx";
import { EmptyState } from "../components/Feedback.jsx";
import useForm from "../hooks/useForm.js";
import useDocumentTitle from "../hooks/useDocumentTitle.js";
import { useCart, useUser } from "../hooks/useAppContext.js";
import { placeOrder } from "../redux/orderSlice.js";
import { validateCheckout } from "../utils/validators.js";
import { formatPrice } from "../utils/format.js";

const FREE_DELIVERY_THRESHOLD = 1500;
const DELIVERY_FEE = 99;
const TAX_RATE = 0.05;

function Cart() {
  useDocumentTitle("Your Cart");
  const dispatch = useDispatch();
  const { items, subtotal, totalItems, clearCart } = useCart();
  const { user } = useUser();

  const [showCheckout, setShowCheckout] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);
  const checkoutRef = useRef(null);

  const { values, field, handleSubmit } = useForm(
    {
      name: user.name === "Guest Diner" ? "" : user.name,
      phone: user.phone,
      address: user.address,
      orderType: "delivery",
      payment: "cod",
    },
    validateCheckout
  );

  const isDelivery = values.orderType === "delivery";
  const deliveryFee = !isDelivery || subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + deliveryFee + tax;
  const amountToFreeDelivery = FREE_DELIVERY_THRESHOLD - subtotal;

  const openCheckout = () => {
    setShowCheckout(true);
    // Wait for the form to render before scrolling to it
    requestAnimationFrame(() =>
      checkoutRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    );
  };

  const onSubmit = (formValues) => {
    const order = {
      customer: formValues,
      items: items.map(({ id, name, price, quantity, image }) => ({ id, name, price, quantity, image })),
      subtotal,
      deliveryFee,
      tax,
      total,
    };
    const action = dispatch(placeOrder(order));
    setPlacedOrder(action.payload);
    clearCart();
  };

  const onError = (errors) => {
    checkoutRef.current.querySelector(`[name="${Object.keys(errors)[0]}"]`)?.focus();
  };

  // Order confirmation
  if (placedOrder) {
    return (
      <div className="container section">
        <div className="card confirmation">
          <span className="confirmation-icon"><Icon name="check" size={36} /></span>
          <h1>Order placed!</h1>
          <p className="muted">
            Thank you, {placedOrder.customer.name}. Your order <strong>{placedOrder.id}</strong> is
            being prepared and will be{" "}
            {placedOrder.customer.orderType === "delivery"
              ? "delivered in about 40 minutes."
              : "ready for pickup in about 20 minutes."}
          </p>
          <p className="confirmation-total">Total paid: {formatPrice(placedOrder.total)}</p>
          <div className="hero-actions center">
            <Link to="/profile?tab=orders" className="btn btn-primary">Track order</Link>
            <Link to="/menu" className="btn btn-outline">Order more</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow="Cart"
        title="Your order"
        subtitle={totalItems > 0 ? `${totalItems} item${totalItems > 1 ? "s" : ""} ready for checkout` : "Your cart is waiting to be filled"}
        crumbs={[{ label: "Cart" }]}
      />

      <div className="container section-sm">
        {items.length === 0 ? (
          <EmptyState icon="cart" title="Your cart is empty" text="Browse the menu and add a few dishes you love.">
            <Link to="/menu" className="btn btn-primary">Explore the menu</Link>
          </EmptyState>
        ) : (
          <div className="cart-layout">
            <div className="cart-main">
              <div className="card">
                <div className="list-head">
                  <h2>Items</h2>
                  <button
                    className="btn btn-ghost btn-sm danger"
                    onClick={() => window.confirm("Remove all items from your cart?") && clearCart()}
                  >
                    <Icon name="trash" size={15} /> Clear cart
                  </button>
                </div>
                <ul className="cart-list">
                  {items.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </ul>
              </div>

              {showCheckout && (
                <section className="card form-card" ref={checkoutRef}>
                  <h2>Checkout details</h2>
                  <form onSubmit={(e) => handleSubmit(e, onSubmit, onError)} noValidate>
                    <div className="segmented" role="radiogroup" aria-label="Order type">
                      {["delivery", "pickup"].map((type) => (
                        <label key={type} className={values.orderType === type ? "active" : ""}>
                          <input
                            type="radio"
                            name="orderType"
                            value={type}
                            checked={values.orderType === type}
                            onChange={field("orderType").onChange}
                          />
                          <Icon name={type === "delivery" ? "truck" : "utensils"} size={18} />
                          {type === "delivery" ? "Delivery" : "Self pickup"}
                        </label>
                      ))}
                    </div>

                    <div className="form-row">
                      <FormField label="Full name" placeholder="Jane Doe" {...field("name")} />
                      <FormField label="Phone" type="tel" inputMode="numeric" maxLength={10} placeholder="98XXXXXXXX" {...field("phone")} />
                    </div>

                    {/* Address only matters for delivery orders */}
                    {isDelivery && (
                      <FormField
                        label="Delivery address"
                        as="textarea"
                        rows={2}
                        placeholder="House no., street, area, landmark"
                        {...field("address")}
                      />
                    )}

                    <FormField
                      label="Payment method"
                      as="select"
                      options={[
                        { value: "cod", label: isDelivery ? "Cash on delivery" : "Pay at counter" },
                        { value: "card", label: "Credit / debit card" },
                        { value: "wallet", label: "Mobile wallet" },
                      ]}
                      {...field("payment")}
                    />

                    <button type="submit" className="btn btn-primary btn-block btn-lg">
                      Place order · {formatPrice(total)}
                    </button>
                  </form>
                </section>
              )}
            </div>

            <aside className="card summary-card">
              <h2>Summary</h2>
              <dl className="summary-list">
                <div><dt>Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
                <div>
                  <dt>Delivery</dt>
                  <dd>{deliveryFee === 0 ? <span className="text-success">Free</span> : formatPrice(deliveryFee)}</dd>
                </div>
                <div><dt>Tax (5%)</dt><dd>{formatPrice(tax)}</dd></div>
                <div className="summary-total"><dt>Total</dt><dd>{formatPrice(total)}</dd></div>
              </dl>

              {isDelivery && amountToFreeDelivery > 0 && (
                <div className="progress-note">
                  <p className="small">Add {formatPrice(amountToFreeDelivery)} more for free delivery</p>
                  <div className="progress">
                    <span style={{ width: `${(subtotal / FREE_DELIVERY_THRESHOLD) * 100}%` }} />
                  </div>
                </div>
              )}

              {!showCheckout && (
                <button className="btn btn-primary btn-block btn-lg" onClick={openCheckout}>
                  Proceed to checkout <Icon name="arrowRight" size={18} />
                </button>
              )}
              <Link to="/menu" className="btn btn-ghost btn-block">
                <Icon name="plus" size={16} /> Add more dishes
              </Link>
            </aside>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;
