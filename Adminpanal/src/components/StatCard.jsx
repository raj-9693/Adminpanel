export default function StatCard({ label, value, note, tone }) {
  return (
    <div className="card stat">
      <div className="stat__label">{label}</div>
      <div className="stat__value">{value}</div>
      <div className={`stat__note tone-${tone}`}>{note}</div>
    </div>
  );
}
