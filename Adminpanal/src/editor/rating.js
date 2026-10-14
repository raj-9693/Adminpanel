const STARS = [5, 4, 3, 2, 1];
export const sumCounts = (dist = {}) => STARS.reduce((a, n) => a + (Number(dist[n]) || 0), 0);
export const autoAverage = (dist = {}) => {
  const t = sumCounts(dist);
  if (!t) return 0;
  const w = STARS.reduce((a, n) => a + n * (Number(dist[n]) || 0), 0);
  return Math.round((w / t) * 10) / 10;
};
