import React from 'react';
import css from './ImageCard.module.css';

const ImageCard = ({ src, alt, title, onClick }) => {
  return (
    <div className={css.card} onClick={onClick}>
      <img src={src} alt={alt} className={css.image} />
    </div>
  );
};

export default ImageCard;
