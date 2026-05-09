import { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useFormWithValidation from "../../hooks/useFormWithValidation";

const defaultValues = {
  email: "",
  password: "",
};

function LoginModal({ isOpen, onClose, onLogin }) {
  const { values, handleChange, resetForm, handleSubmit } =
    useFormWithValidation(defaultValues);

  useEffect(() => {
    if (!isOpen) {
      resetForm(defaultValues, {}, true);
    }
  }, [isOpen, resetForm]);

  const onSubmit = handleSubmit(() => {
    onLogin(values);
  });

  return (
    <ModalWithForm
      title="Log in"
      name="login"
      buttonText="Log in"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
    >
      <label className="modal__label">
        Email
        <input
          className="modal__input"
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          required
        />
      </label>

      <label className="modal__label">
        Password
        <input
          className="modal__input"
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
