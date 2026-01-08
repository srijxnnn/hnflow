export const formatRelativeTime = (unixSeconds: number): string => {
  const now = Date.now();
  const then = unixSeconds * 1000;
  const diffMs = now - then;

  if (diffMs < 0) return "just now";

  const sec = Math.floor(diffMs / 1000);
  if (sec < 60) return `${sec}s ago`;

  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m ago`;

  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;

  const day = Math.floor(hr / 24);
  if (day < 60) return `${day}d ago`;

  const month = Math.floor(day / 30);
  if (month < 12) return `${month}mo ago`;

  return formatDate(then);
};

const formatDate = (timestampMs: number) => {
  return new Date(timestampMs).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};
