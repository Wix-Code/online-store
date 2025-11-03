import { formatDistanceToNow } from "date-fns";

/**
 * Returns a human-readable relative time string like "2 hours ago"
 * @param dateString ISO date string (e.g., "2025-10-31T19:17:10.738Z")
 */
export const formatTimeAgo = (dateString: string): string => {
  if (!dateString) return "";
  try {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  } catch (error) {
    console.error("Invalid date passed to formatTimeAgo:", dateString);
    return "";
  }
}