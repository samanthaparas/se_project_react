import { useCallback, useState } from "react";

const validationRules = {
  name: (value) => {
    if (!value.trim()) return "Name is required";
    if (value.length < 1) return "Name must be at least 1 character";
    if (value.length > 30) return "Name must be no more than 30 characters";
    return "";
  },
  imageUrl: (value) => {
    if (!value.trim()) return "Image URL is required";
    try {
      new URL(value);
      return "";
    } catch {
      return "Please enter a valid URL";
    }
  },
  weather: (value) => {
    if (!value) return "Please select a weather type";
    return "";
  },
};

export function useFormWithValidation(initialValues = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(true);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const validateField = useCallback((name, value) => {
    const validator = validationRules[name];
    return validator ? validator(value) : "";
  }, []);

  const handleChange = (evt) => {
    const target = evt.target;
    const { name, value } = target;

    setValues((prev) => ({ ...prev, [name]: value }));

    if (hasSubmitted) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const validateForm = useCallback(() => {
    const newErrors = {};
    let formIsValid = true;

    Object.keys(validationRules).forEach((fieldName) => {
      const error = validateField(fieldName, values[fieldName]);
      newErrors[fieldName] = error;
      if (error) formIsValid = false;
    });

    setErrors(newErrors);
    setIsValid(formIsValid);
    return formIsValid;
  }, [values, validateField]);

  const handleSubmit = useCallback(
    (callback) => {
      return (evt) => {
        evt.preventDefault();
        setHasSubmitted(true);

        if (validateForm()) {
          callback();
        }
      };
    },
    [validateForm]
  );

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = true) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
      setHasSubmitted(false);
    },
    []
  );

  return {
    values,
    setValues,
    handleChange,
    errors,
    isValid,
    resetForm,
    handleSubmit,
    hasSubmitted,
  };
}

export default useFormWithValidation;
