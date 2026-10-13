import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PageHeader from "../components/PageHeader.jsx";
import FormField from "../components/FormField.jsx";
import ReservationCard from "../components/ReservationCard.jsx";
import Icon from "../components/Icon.jsx";
import { EmptyState } from "../components/Feedback.jsx";
import useForm from "../hooks/useForm.js";
import useDocumentTitle from "../hooks/useDocumentTitle.js";
import { useUser } from "../hooks/useAppContext.js";
import {
  addReservation,
  updateReservation,
  cancelReservation,
  deleteReservation,
  selectReservations,
} from "../redux/reservationSlice.js";
import { validateReservation } from "../utils/validators.js";
import { getReservationStatus } from "../utils/reservations.js";
import { formatDate, formatTime, todayISO } from "../utils/format.js";
import { TIME_SLOTS, OCCASIONS } from "../data/siteData.js";

const FILTERS = [
  { value: "all", label: "All" },
  { value: "upcoming", label: "Upcoming" },
  { value: "past", label: "Past" },
  { value: "cancelled", label: "Cancelled" },
];

function Reservations() {
  useDocumentTitle("Reservations");
  const dispatch = useDispatch();
  const reservations = useSelector(selectReservations);
  const { user } = useUser();
  const [searchParams, setSearchParams] = useSearchParams();

  const [editingId, setEditingId] = useState(null);
  const [notice, setNotice] = useState("");

  const formRef = useRef(null);
  const nameInputRef = useRef(null);

  const emptyForm = {
    name: user.name === "Guest Diner" ? "" : user.name,
    email: user.email,
    phone: user.phone,
    date: "",
    time: "",
    guests: "2",
    occasion: "None",
    requests: "",
  };

  const { values, field, handleSubmit, reset } = useForm(emptyForm, validateReservation);

  // Auto-hide the success notice after a few seconds
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(""), 4000);
    return () => clearTimeout(timer);
  }, [notice]);

  const activeFilter = searchParams.get("status") || "all";

  const filtered = reservations
    .filter((item) => activeFilter === "all" || getReservationStatus(item) === activeFilter)
    .sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`));

  const counts = FILTERS.reduce((acc, filter) => {
    acc[filter.value] =
      filter.value === "all"
        ? reservations.length
        : reservations.filter((item) => getReservationStatus(item) === filter.value).length;
    return acc;
  }, {});

  const onSubmit = (formValues) => {
    if (editingId) {
      dispatch(updateReservation({ id: editingId, changes: formValues }));
      setNotice("Reservation updated successfully.");
    } else {
      dispatch(addReservation(formValues));
      setNotice(
        `Table for ${formValues.guests} booked on ${formatDate(formValues.date)} at ${formatTime(formValues.time)}.`
      );
    }
    setEditingId(null);
    reset(emptyForm);
  };

  // Focus the first field that failed validation
  const onError = (errors) => {
    const firstInvalid = Object.keys(errors)[0];
    formRef.current.querySelector(`[name="${firstInvalid}"]`)?.focus();
  };

  const startEdit = (reservation) => {
    setEditingId(reservation.id);
    reset({
      name: reservation.name,
      email: reservation.email,
      phone: reservation.phone,
      date: reservation.date,
      time: reservation.time,
      guests: String(reservation.guests),
      occasion: reservation.occasion,
      requests: reservation.requests,
    });
    formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    nameInputRef.current.focus({ preventScroll: true });
  };

  const cancelEdit = () => {
    setEditingId(null);
    reset(emptyForm);
  };

  const handleCancel = (reservation) => {
    if (window.confirm(`Cancel the reservation for ${reservation.name}?`)) {
      dispatch(cancelReservation(reservation.id));
      setNotice("Reservation cancelled.");
    }
  };

  const handleDelete = (reservation) => {
    if (window.confirm("Delete this reservation permanently?")) {
      dispatch(deleteReservation(reservation.id));
      if (editingId === reservation.id) cancelEdit();
      setNotice("Reservation deleted.");
    }
  };

  const setFilter = (value) => {
    setSearchParams(value === "all" ? {} : { status: value });
  };

  return (
    <>
      <PageHeader
        eyebrow="Reservations"
        title="Book your table"
        subtitle="Reserve in seconds and manage all your bookings in one place."
        crumbs={[{ label: "Reservations" }]}
      />

      <div className="container section-sm reservations-layout">
        {/* Create / Update form */}
        <section className="card form-card" ref={formRef}>
          <div className="form-card-head">
            <h2>{editingId ? "Edit reservation" : "New reservation"}</h2>
            {editingId && (
              <button className="btn btn-ghost btn-sm" onClick={cancelEdit}>
                <Icon name="close" size={16} /> Cancel edit
              </button>
            )}
          </div>

          <form onSubmit={(e) => handleSubmit(e, onSubmit, onError)} noValidate>
            <FormField label="Full name" placeholder="Jane Doe" ref={nameInputRef} {...field("name")} />

            <div className="form-row">
              <FormField label="Email" type="email" placeholder="jane@example.com" {...field("email")} />
              <FormField label="Phone" type="tel" placeholder="98XXXXXXXX" inputMode="numeric" maxLength={10} {...field("phone")} />
            </div>

            <div className="form-row">
              <FormField label="Date" type="date" min={todayISO()} {...field("date")} />
              <FormField
                label="Time"
                as="select"
                options={[
                  { value: "", label: "Select a slot", disabled: true },
                  ...TIME_SLOTS.map((slot) => ({ value: slot, label: formatTime(slot) })),
                ]}
                {...field("time")}
              />
            </div>

            <div className="form-row">
              <FormField label="Guests" type="number" min={1} max={20} {...field("guests")} />
              <FormField
                label="Occasion"
                as="select"
                options={OCCASIONS.map((item) => ({ value: item, label: item }))}
                {...field("occasion")}
              />
            </div>

            <FormField
              label="Special requests (optional)"
              as="textarea"
              rows={3}
              placeholder="Window seat, high chair, allergies..."
              hint={`${values.requests.length}/200 characters`}
              {...field("requests")}
            />

            <button type="submit" className="btn btn-primary btn-block btn-lg">
              <Icon name={editingId ? "check" : "calendar"} size={18} />
              {editingId ? "Save changes" : "Confirm booking"}
            </button>
          </form>
        </section>

        {/* Read / Delete list */}
        <section className="reservation-list-panel">
          <div className="list-head">
            <h2>Your bookings</h2>
            <div className="tabs" role="tablist">
              {FILTERS.map((filter) => (
                <button
                  key={filter.value}
                  role="tab"
                  aria-selected={activeFilter === filter.value}
                  className={activeFilter === filter.value ? "active" : ""}
                  onClick={() => setFilter(filter.value)}
                >
                  {filter.label} <span className="tab-count">{counts[filter.value]}</span>
                </button>
              ))}
            </div>
          </div>

          {notice && (
            <p className="alert alert-success" role="status">
              <Icon name="check" size={16} /> {notice}
            </p>
          )}

          {filtered.length > 0 ? (
            <div className="reservation-list">
              {filtered.map((reservation) => (
                <ReservationCard
                  key={reservation.id}
                  reservation={reservation}
                  isEditing={reservation.id === editingId}
                  onEdit={startEdit}
                  onCancel={handleCancel}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              icon="calendar"
              title={reservations.length === 0 ? "No reservations yet" : `No ${activeFilter} reservations`}
              text={
                reservations.length === 0
                  ? "Fill in the form to book your first table."
                  : "Try a different filter to see your other bookings."
              }
            />
          )}
        </section>
      </div>
    </>
  );
}

export default Reservations;
