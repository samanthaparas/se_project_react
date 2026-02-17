import "./ModalWithForm.css";
import closeIcon from "../../images/exit.png";

function ModalWithForm({
  title,
  name,
  buttonText = "Add garment",
  onClose,
  isOpen,
  children,
  onSubmit,
  isSubmitDisabled = false,
}) {
  return (
    <div
      className={`modal modal_type_${name} ${isOpen ? "modal__opened" : ""}`}
    >
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button type="button" className="modal__close" onClick={onClose}>
          <img
            src={closeIcon}
            alt="Close modal"
            className="modal__close-icon"
          />
        </button>

        <form onSubmit={onSubmit} className="modal__form" name={name}>
          {children}
          <button
            type="submit"
            className="modal__submit"
            disabled={isSubmitDisabled}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
