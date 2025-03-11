import ReactModal from "react-modal";
import { useEffect, useState } from "react";
import s from "./Modal.module.css";

const sprite = "/sprite.svg";

const getModalSize = () => {
  return window.innerWidth < 768
    ? { width: "463px", padding: "40px" }
    : { width: "343px", padding: "50px 70px" };
};

const Modal = ({ isOpen, onClose, children }) => {
  const [modalSize, setModalSize] = useState(getModalSize());

  useEffect(() => {
    const handleResize = () => {
      setModalSize(getModalSize());
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100vw";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [isOpen]);

  const customStyles = {
    content: {
      position: "absolute",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      overflow: "auto",
      borderRadius: "20px",
      backgroundColor: "var(--white)",
      width: modalSize.width,
      minHeight: modalSize.height,
      height: "100%",
      zIndex: 105,
    },
    overlay: {
      backgroundColor: "var(--overlay)",
      zIndex: "100",
    },
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnEsc
      shouldCloseOnOverlayClick
      closeTimeoutMS={200}
      style={customStyles}
      contentLabel="ReactModal"
      ariaHideApp={false}>
      <button onClick={onClose} type="button" className={s.button}>
        <svg className={s.icon}>
          <use href={`${sprite}#icon-close`} />
        </svg>
      </button>
      {children}
    </ReactModal>
  );
};

export default Modal;
