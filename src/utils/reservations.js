import { todayISO } from "./format.js";

export function getReservationStatus(reservation) {
  if (reservation.status === "cancelled") return "cancelled";
  return reservation.date >= todayISO() ? "upcoming" : "past";
}
