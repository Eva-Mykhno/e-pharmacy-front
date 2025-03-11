import ReactModal from "react-modal";
import { useEffect, useState } from "react";
import s from "./ModalNav.module.css";

const sprite = "/sprite.svg";

const getModalSize = () => {
  return window.innerWidth < 768
    ? { width: "210px", height: "812px" }
    : { width: "334px", height: "1024px" };
};

const ModalNav = ({ isOpen, onClose, children }) => {
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
      display: "block",
      top: 0,
      right: 0,
      left: "auto",
      bottom: "auto",
      padding: 0,
      overflow: "auto",
      border: "none",
      borderRadius: 0,
      backgroundColor: "var(--green)",
      width: modalSize.width,
      minHeight: modalSize.height,
      height: "100%",
      zIndex: 100,
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

export default ModalNav;
