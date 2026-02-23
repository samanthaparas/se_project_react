import { useEffect } from "react";
import useFormWithValidation from "../../hooks/useFormWithValidation";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const defaultValues = {
  name: "",
  imageUrl: "",
  weather: "",
};

const AddItemModal = ({ isOpen, onAddItem, onClose }) => {
  const {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
    handleSubmit,
    hasSubmitted,
  } = useFormWithValidation(defaultValues);

  useEffect(() => {
    if (!isOpen) {
      resetForm(defaultValues, {}, true);
    }
  }, [isOpen, resetForm]);

  const onSubmit = handleSubmit(() => {
    onAddItem(values);
    resetForm(defaultValues, {}, true);
  });

  return (
    <ModalWithForm
      title="New garment"
      name="add-garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      isSubmitDisabled={hasSubmitted && !isValid}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className={`modal__input ${
            hasSubmitted && errors.name ? "modal__input_type_invalid" : ""
          }`}
          id="name"
          name="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
        />
        <span className="modal__input-error">{errors.name}</span>
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          type="url"
          className={`modal__input ${
            hasSubmitted && errors.imageUrl ? "modal__input_type_invalid" : ""
          }`}
          id="imageUrl"
          name="imageUrl"
          placeholder="Image URL"
          value={values.imageUrl}
          onChange={handleChange}
        />
        <span className="modal__input-error">{errors.imageUrl}</span>
      </label>
      <fieldset
        className={`modal__radio-buttons ${
          hasSubmitted && errors.weather ? "modal__radio-buttons_type_invalid" : ""
        }`}
      >
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            className="modal__radio-input"
            id="hot"
            name="weather"
            value="hot"
            checked={values.weather === "hot"}
            onChange={handleChange}
          />{" "}
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            className="modal__radio-input"
            id="warm"
            name="weather"
            value="warm"
            checked={values.weather === "warm"}
            onChange={handleChange}
          />{" "}
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            className="modal__radio-input"
            id="cold"
            name="weather"
            value="cold"
            checked={values.weather === "cold"}
            onChange={handleChange}
          />{" "}
          Cold
        </label>
        <span className="modal__input-error">{errors.weather}</span>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
