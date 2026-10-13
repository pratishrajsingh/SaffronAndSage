import { useState } from "react";

// Reusable form state + validation. `validate(values)` returns { field: "message" }.
function useForm(initialValues, validate) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const nextValues = { ...values, [name]: type === "checkbox" ? checked : value };

    setValues(nextValues);

    // Re-validate live once the user has interacted with the field
    if (touched[name]) {
      setErrors(validate(nextValues));
    }
  };

  const handleBlur = (event) => {
    setTouched((prev) => ({ ...prev, [event.target.name]: true }));
    setErrors(validate(values));
  };

  // Call from a form's onSubmit. onError receives the errors so the form can focus the first invalid field.
  const handleSubmit = (event, onSubmit, onError) => {
    event.preventDefault();

    const validationErrors = validate(values);
    setErrors(validationErrors);
    setTouched(Object.fromEntries(Object.keys(values).map((key) => [key, true])));

    if (Object.keys(validationErrors).length === 0) {
      onSubmit(values);
    } else {
      onError?.(validationErrors);
    }
  };

  const reset = (nextValues = initialValues) => {
    setValues(nextValues);
    setErrors({});
    setTouched({});
  };

  // Spread onto <FormField /> to wire value, handlers and error in one go
  const field = (name) => ({
    name,
    value: values[name],
    onChange: handleChange,
    onBlur: handleBlur,
    error: touched[name] ? errors[name] : "",
  });

  return { values, errors, setValues, handleChange, handleSubmit, reset, field };
}

export default useForm;
