export const CURRENCY = "Rs.";

export function formatPrice(amount) {
  return `${CURRENCY} ${Math.round(amount).toLocaleString("en-IN")}`;
}

// "YYYY-MM-DD" strings are parsed as UTC by default; read them as local dates instead
export function parseDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) ? new Date(`${value}T00:00`) : new Date(value);
}

export function formatDate(dateString, options = {}) {
  return parseDate(dateString).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    ...options,
  });
}

export function formatTime(time) {
  const [hours, minutes] = time.split(":").map(Number);
  const suffix = hours >= 12 ? "PM" : "AM";
  const displayHour = hours % 12 || 12;
  return `${displayHour}:${String(minutes).padStart(2, "0")} ${suffix}`;
}

// "YYYY-MM-DD" for today in local time (used for date input min values)
export function todayISO() {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;
  return new Date(now - offset).toISOString().slice(0, 10);
}

export function getInitials(name = "") {
  return (
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "G"
  );
}
