import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormField from "../components/FormField.jsx";
import DishCard from "../components/DishCard.jsx";
import ReservationCard from "../components/ReservationCard.jsx";
import Icon from "../components/Icon.jsx";
import { EmptyState } from "../components/Feedback.jsx";
import useForm from "../hooks/useForm.js";
import useDocumentTitle from "../hooks/useDocumentTitle.js";
import { useCart, useTheme, useUser } from "../hooks/useAppContext.js";
import { selectReservations } from "../redux/reservationSlice.js";
import { selectOrders, clearOrders } from "../redux/orderSlice.js";
import { selectFavorites } from "../redux/favoriteSlice.js";
import { validateProfile } from "../utils/validators.js";
import { getReservationStatus } from "../utils/reservations.js";
import { formatDate, formatPrice, getInitials } from "../utils/format.js";

const TABS = [
  { value: "orders", label: "Orders", icon: "truck" },
  { value: "favorites", label: "Favourites", icon: "heart" },
  { value: "reservations", label: "Reservations", icon: "calendar" },
  { value: "settings", label: "Settings", icon: "user" },
];

function ProfileForm({ user, onSave, onCancel }) {
  const { field, handleSubmit } = useForm(
    { name: user.name, email: user.email, phone: user.phone, address: user.address },
    validateProfile
  );

  return (
    <form className="profile-form" onSubmit={(e) => handleSubmit(e, onSave)} noValidate>
      <div className="form-row">
        <FormField label="Full name" {...field("name")} />
        <FormField label="Email" type="email" placeholder="you@example.com" {...field("email")} />
      </div>
      <div className="form-row">
        <FormField label="Phone" type="tel" inputMode="numeric" maxLength={10} placeholder="98XXXXXXXX" {...field("phone")} />
        <FormField label="Default delivery address" placeholder="Street, area, city" {...field("address")} />
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary"><Icon name="check" size={16} /> Save profile</button>
        <button type="button" className="btn btn-ghost" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

function Profile() {
  useDocumentTitle("My Profile");
  const dispatch = useDispatch();
  const { user, updateUser } = useUser();
  const { theme, toggleTheme } = useTheme();
  const { totalItems } = useCart();
  const reservations = useSelector(selectReservations);
  const orders = useSelector(selectOrders);
  const favorites = useSelector(selectFavorites);

  const [searchParams, setSearchParams] = useSearchParams();
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  const activeTab = TABS.some((tab) => tab.value === searchParams.get("tab"))
    ? searchParams.get("tab")
    : "orders";

  const upcoming = reservations.filter((item) => getReservationStatus(item) === "upcoming");
  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);

  const stats = [
    { label: "Orders", value: orders.length },
    { label: "Spent", value: formatPrice(totalSpent) },
    { label: "Upcoming bookings", value: upcoming.length },
    { label: "Favourites", value: favorites.length },
  ];

  const handleSave = (values) => {
    updateUser(values);
    setIsEditing(false);
    setSaved(true);
  };

  return (
    <div className="container section-sm">
      {/* Profile header */}
      <section className="card profile-card">
        <div className="profile-head">
          <span className="profile-avatar">{getInitials(user.name)}</span>
          <div className="profile-id">
            <h1>{user.name}</h1>
            <p className="muted">
              {user.email || "No email added"} · Member since {formatDate(user.memberSince, { weekday: undefined })}
            </p>
          </div>
          {!isEditing && (
            <button className="btn btn-outline" onClick={() => { setIsEditing(true); setSaved(false); }}>
              <Icon name="edit" size={16} /> Edit profile
            </button>
          )}
        </div>

        {saved && (
          <p className="alert alert-success"><Icon name="check" size={16} /> Profile updated.</p>
        )}

        {isEditing ? (
          <ProfileForm user={user} onSave={handleSave} onCancel={() => setIsEditing(false)} />
        ) : (
          <div className="profile-stats">
            {stats.map((stat) => (
              <div key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Tabs */}
      <div className="tabs tabs-lg" role="tablist">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            role="tab"
            aria-selected={activeTab === tab.value}
            className={activeTab === tab.value ? "active" : ""}
            onClick={() => setSearchParams({ tab: tab.value })}
          >
            <Icon name={tab.icon} size={16} /> {tab.label}
          </button>
        ))}
      </div>

      <section className="tab-panel">
        {activeTab === "orders" &&
          (orders.length === 0 ? (
            <EmptyState icon="truck" title="No orders yet" text="Your order history will appear here.">
              <Link to="/menu" className="btn btn-primary">Order now</Link>
            </EmptyState>
          ) : (
            <div className="order-list">
              {orders.map((order) => (
                <article className="card order-card" key={order.id}>
                  <div className="order-head">
                    <div>
                      <h3>Order {order.id}</h3>
                      <p className="muted small">
                        {formatDate(order.placedAt)} ·{" "}
                        {order.customer.orderType === "delivery" ? "Delivery" : "Pickup"}
                      </p>
                    </div>
                    <span className="status status-upcoming">{order.status}</span>
                  </div>
                  <ul className="order-items">
                    {order.items.map((item) => (
                      <li key={item.id}>
                        <img src={`${item.image}/small`} alt="" />
                        <span>{item.quantity} × {item.name}</span>
                        <span className="muted">{formatPrice(item.price * item.quantity)}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="order-total">Total <strong>{formatPrice(order.total)}</strong></p>
                </article>
              ))}
            </div>
          ))}

        {activeTab === "favorites" &&
          (favorites.length === 0 ? (
            <EmptyState icon="heart" title="No favourites yet" text="Tap the heart on any dish to save it here.">
              <Link to="/menu" className="btn btn-primary">Find dishes</Link>
            </EmptyState>
          ) : (
            <div className="card-grid">
              {favorites.map((dish) => (
                <DishCard key={dish.id} dish={dish} />
              ))}
            </div>
          ))}

        {activeTab === "reservations" &&
          (upcoming.length === 0 ? (
            <EmptyState icon="calendar" title="No upcoming reservations" text="Planning a night out?">
              <Link to="/reservations" className="btn btn-primary">Book a table</Link>
            </EmptyState>
          ) : (
            <>
              <div className="reservation-list">
                {upcoming.map((reservation) => (
                  <ReservationCard key={reservation.id} reservation={reservation} />
                ))}
              </div>
              <Link to="/reservations" className="link-arrow manage-link">
                Manage reservations <Icon name="arrowRight" size={16} />
              </Link>
            </>
          ))}

        {activeTab === "settings" && (
          <div className="card settings-list">
            <div className="setting-row">
              <div>
                <h3>Dark mode</h3>
                <p className="muted small">Easier on the eyes at night.</p>
              </div>
              <button
                className={`switch ${theme === "dark" ? "on" : ""}`}
                onClick={toggleTheme}
                role="switch"
                aria-checked={theme === "dark"}
                aria-label="Dark mode"
              >
                <span />
              </button>
            </div>
            <div className="setting-row">
              <div>
                <h3>Items in cart</h3>
                <p className="muted small">{totalItems} item(s) waiting for checkout.</p>
              </div>
              <Link to="/cart" className="btn btn-outline btn-sm">View cart</Link>
            </div>
            <div className="setting-row">
              <div>
                <h3>Order history</h3>
                <p className="muted small">Remove all past orders from this device.</p>
              </div>
              <button
                className="btn btn-ghost btn-sm danger"
                disabled={orders.length === 0}
                onClick={() => window.confirm("Clear your entire order history?") && dispatch(clearOrders())}
              >
                <Icon name="trash" size={15} /> Clear history
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default Profile;
