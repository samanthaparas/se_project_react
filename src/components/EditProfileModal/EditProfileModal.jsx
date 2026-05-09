import { useContext, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import useFormWithValidation from "../../hooks/useFormWithValidation";

const defaultValues = {
  name: "",
  avatar: "",
};

function EditProfileModal({ isOpen, onClose, onUpdateProfile }) {
  const currentUser = useContext(CurrentUserContext);

  const { values, handleChange, resetForm, handleSubmit } =
    useFormWithValidation(defaultValues);

  useEffect(() => {
    if (isOpen && currentUser) {
      resetForm(
        { name: currentUser.name || "", avatar: currentUser.avatar || "" },
        {},
        true,
      );
    }
  }, [isOpen, currentUser, resetForm]);

  const onSubmit = handleSubmit(() => {
    onUpdateProfile(values);
  });

  return (
    <ModalWithForm
      title="Change profile data"
      name="edit-profile"
      buttonText="Save changes"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
    >
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
        Avatar
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
}

export default EditProfileModal;
