import { useId } from "react";

// Ek hi component: input / number / textarea / select. onChange(value) string deta hai.
export default function Field({
  label, value, onChange, as = "input", type = "text", rows = 3, caps = false, max, hint, error,
  placeholder, options = [], disabled = false, min, step, className = "",
}) {
  const id = useId();
  const common = {
    id,
    value: value ?? "",
    disabled,
    placeholder,
    "aria-invalid": error ? true : undefined,
    className: `fd-ctl ${caps ? "caps" : ""} ${error ? "bad" : ""}`,
    onChange: (e) => onChange(e.target.value),
  };

  let ctl;
  if (as === "textarea") ctl = <textarea {...common} rows={rows} maxLength={max} />;
  else if (as === "select")
    ctl = (
      <select {...common}>
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    );
  else ctl = <input {...common} type={type} min={min} step={step} maxLength={type === "text" ? max : undefined} />;

  return (
    <div className={`fd ${className}`}>
      {label && <label htmlFor={id}>{label}</label>}
      {ctl}
      {(hint || (max && as !== "select")) && (
        <div className="fd-foot">
          <span>{hint}</span>
          {max && as !== "select" && <span>{String(value ?? "").length}/{max}</span>}
        </div>
      )}
      {error && <em className="fd-err">{error}</em>}
    </div>
  );
}
