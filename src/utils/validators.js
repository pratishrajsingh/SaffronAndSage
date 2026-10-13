import { todayISO } from "./format.js";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_REGEX = /^[0-9]{10}$/;
const NAME_REGEX = /^[a-zA-Z\s.'-]+$/;

function validateName(name) {
  if (!name.trim()) return "Name is required.";
  if (name.trim().length < 3) return "Name must be at least 3 characters.";
  if (!NAME_REGEX.test(name.trim())) return "Name can only contain letters.";
  return "";
}

function validateEmail(email) {
  if (!email.trim()) return "Email is required.";
  if (!EMAIL_REGEX.test(email.trim())) return "Enter a valid email address.";
  return "";
}

function validatePhone(phone, required = true) {
  if (!phone.trim()) return required ? "Phone number is required." : "";
  if (!PHONE_REGEX.test(phone.trim())) return "Phone number must be exactly 10 digits.";
  return "";
}

// Drops empty messages so callers can check Object.keys(errors).length
function clean(errors) {
  return Object.fromEntries(Object.entries(errors).filter(([, message]) => message));
}

export function validateReservation(values) {
  const guests = Number(values.guests);

  return clean({
    name: validateName(values.name),
    email: validateEmail(values.email),
    phone: validatePhone(values.phone),
    date: !values.date
      ? "Please choose a date."
      : values.date < todayISO()
        ? "Date cannot be in the past."
        : "",
    time: !values.time ? "Please choose a time slot." : "",
    guests: !values.guests
      ? "Number of guests is required."
      : !Number.isInteger(guests) || guests < 1 || guests > 20
        ? "Guests must be between 1 and 20."
        : "",
    requests: values.requests.length > 200 ? "Keep special requests under 200 characters." : "",
  });
}

export function validateContact(values) {
  return clean({
    name: validateName(values.name),
    email: validateEmail(values.email),
    phone: validatePhone(values.phone, false),
    subject: !values.subject.trim() ? "Subject is required." : "",
    message: !values.message.trim()
      ? "Message is required."
      : values.message.trim().length < 20
        ? "Message must be at least 20 characters."
        : "",
  });
}

export function validateCheckout(values) {
  return clean({
    name: validateName(values.name),
    phone: validatePhone(values.phone),
    address:
      values.orderType === "delivery" && values.address.trim().length < 10
        ? "Please enter a full delivery address (min 10 characters)."
        : "",
    payment: !values.payment ? "Select a payment method." : "",
  });
}

export function validateProfile(values) {
  return clean({
    name: validateName(values.name),
    email: validateEmail(values.email),
    phone: validatePhone(values.phone, false),
  });
}

export function validateNewsletter(email) {
  return validateEmail(email);
}
