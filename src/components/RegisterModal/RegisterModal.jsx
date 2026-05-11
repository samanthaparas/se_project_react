import { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useFormWithValidation from "../../hooks/useFormWithValidation";

const defaultValues = {
  name: "",
  avatar: "",
  email: "",
  password: "",
};

const RegisterModal = ({ isOpen, onClose, onRegister, onLoginClick }) => {
  const { values, handleChange, resetForm, handleSubmit } =
    useFormWithValidation(defaultValues);

  useEffect(() => {
    if (!isOpen) {
      resetForm(defaultValues, {}, true);
    }
  }, [isOpen, resetForm]);

  const onSubmit = handleSubmit(() => {
    onRegister(values);
  });

  return (
    <ModalWithForm
      title="Sign up"
      name="register"
      buttonText="Sign up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      alternateButtonText="or Log in"
      onAlternateButtonClick={onLoginClick}
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

      <label className="modal__label">
        Name
        <input
          className="modal__input"
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>

      <label className="modal__label">
        Avatar URL
        <input
          className="modal__input"
          type="url"
          name="avatar"
          value={values.avatar}
          onChange={handleChange}
          required
        />
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;
