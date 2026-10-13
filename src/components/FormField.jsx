// Label + input/select/textarea + error message. React 19 lets `ref` be passed as a prop.
function FormField({ label, name, as = "input", error, hint, options = [], ref, ...rest }) {
  const id = `field-${name}`;
  const describedBy = error || hint ? `${id}-msg` : undefined;

  const controlProps = {
    id,
    name,
    ref,
    "aria-invalid": Boolean(error),
    "aria-describedby": describedBy,
    ...rest,
  };

  return (
    <div className={`form-field ${error ? "has-error" : ""}`}>
      <label htmlFor={id}>{label}</label>

      {as === "textarea" && <textarea {...controlProps} />}

      {as === "select" && (
        <select {...controlProps}>
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>
      )}

      {as === "input" && <input {...controlProps} />}

      {error ? (
        <span className="field-error" id={describedBy}>{error}</span>
      ) : (
        hint && <span className="field-hint" id={describedBy}>{hint}</span>
      )}
    </div>
  );
}

export default FormField;
