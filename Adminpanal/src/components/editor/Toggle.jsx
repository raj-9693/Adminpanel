export default function Toggle({ checked, onChange, label }) {
  return (
    <button type="button" role="switch" aria-checked={checked} className={`tg ${checked ? "on" : ""}`} onClick={() => onChange(!checked)}>
      <i />
      <span>{label}</span>
    </button>
  );
}
