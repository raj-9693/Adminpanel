import { useEffect, useState } from "react";

export default function useTimeAgo(ts) {
  const [, tick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => tick((x) => x + 1), 30000);
    return () => clearInterval(t);
  }, []);
  if (!ts) return "not yet";
  const m = Math.floor((Date.now() - ts) / 60000);
  return m < 1 ? "just now" : `${m} min ago`;
}
