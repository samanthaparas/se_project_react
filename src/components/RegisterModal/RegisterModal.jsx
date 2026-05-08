import { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useFormWithValidation from "../../hooks/useFormWithValidation";

const defaultValues = {
  name: "",
  avatar: "",
  email: "",
  password: "",
};

const RegisterModal = ({ isOpen, onClose, onRegister }) => {
  const { value, handleChange, resetForm, handleSubmit } =
    useFormWithValidation(defaultValues);

  useEffect(() => {
    if (!isOpen) {
      resetForm(defaultValues, {}, true);
    }
  }, [isOpen, resetForm]);

  const onSubmit = handleSubmit(() => {
    onRegister(value);
  });

  return (
    <ModalWithForm
      title="Sign up"
      name="register"
      buttonText="Sign up"
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
          value={value.email}
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
          value={value.password}
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
          value={value.name}
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
          value={value.avatar}
          onChange={handleChange}
          required
        />
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;
