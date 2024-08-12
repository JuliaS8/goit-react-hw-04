import React from 'react';
import Modal from 'react-modal';
import css from './ImageModal.module.css';

Modal.setAppElement('#root');

const ImageModal = ({ isOpen, onRequestClose, image }) => {

if (!image) return null;

const { src, alt, author, likes, description } = image;
    
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={css.modal}
      overlayClassName={css.overlay}
      closeTimeoutMS={200}
    >
      <button onClick={onRequestClose} className={css.closeButton}>
        &times;
      </button>
      <img src={image.src} alt={image.alt} className={css.modalImage} />
    </Modal>
  );
};

export default ImageModal;