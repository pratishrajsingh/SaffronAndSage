import Icon from "./Icon.jsx";
import { formatDate, formatTime, parseDate } from "../utils/format.js";
import { getReservationStatus } from "../utils/reservations.js";

function ReservationCard({ reservation, onEdit, onCancel, onDelete, isEditing = false }) {
  const status = getReservationStatus(reservation);
  const date = parseDate(reservation.date);

  return (
    <article className={`reservation-card ${isEditing ? "editing" : ""}`}>
      <div className="reservation-date">
        <span className="reservation-day">{date.getDate()}</span>
        <span>{date.toLocaleDateString("en-US", { month: "short" })}</span>
      </div>

      <div className="reservation-info">
        <div className="reservation-top">
          <h3>{reservation.name}</h3>
          <span className={`status status-${status}`}>{status}</span>
        </div>

        <ul className="reservation-meta">
          <li><Icon name="calendar" size={15} /> {formatDate(reservation.date)}</li>
          <li><Icon name="clock" size={15} /> {formatTime(reservation.time)}</li>
          <li>
            <Icon name="users" size={15} /> {reservation.guests}{" "}
            {Number(reservation.guests) === 1 ? "guest" : "guests"}
          </li>
          {reservation.occasion !== "None" && (
            <li><Icon name="star" size={15} /> {reservation.occasion}</li>
          )}
        </ul>

        {reservation.requests && <p className="reservation-note">“{reservation.requests}”</p>}

        {(onEdit || onCancel || onDelete) && (
          <div className="reservation-actions">
            {onEdit && status === "upcoming" && (
              <button className="btn btn-sm btn-ghost" onClick={() => onEdit(reservation)}>
                <Icon name="edit" size={15} /> Edit
              </button>
            )}
            {onCancel && status === "upcoming" && (
              <button className="btn btn-sm btn-ghost" onClick={() => onCancel(reservation)}>
                <Icon name="ban" size={15} /> Cancel
              </button>
            )}
            {onDelete && (
              <button className="btn btn-sm btn-ghost danger" onClick={() => onDelete(reservation)}>
                <Icon name="trash" size={15} /> Delete
              </button>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export default ReservationCard;
