import React from 'react';
import ImageCard from '/src/components/ImageCard/ImageCard'; 
import css from './ImageGallery.module.css';

const ImageGallery = ({ items, onImageClick }) => {
  return (
    <div className={css.gallery}>
      {items.map((image, index) => (
        <div key={`${image.id}-${index}`} className={css.item}>
          <ImageCard
            src={image.urls.small}
            alt={image.alt_description}
            title={image.alt_description || 'No title'}
            onClick={() => onImageClick({ src: image.urls.full, alt: image.alt_description })}
          />
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
