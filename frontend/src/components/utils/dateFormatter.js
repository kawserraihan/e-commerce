import { format } from "date-fns";

export function formatDate(dateString) {
  const date = new Date(dateString);
  return format(date, "MMM dd, yyyy"); // Example: Nov 24, 2024
}
