import React, { useState } from 'react';
import css from './ImageGalleryItem.module.css';
import { Modal } from './Modal';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ src, alt, largeVerion }) => {
  const [isOpened, setOpened] = useState(false);

  const handlerOnClick = () => {
    setOpened(!isOpened);
  };

  return (
    <li className={css.ImageGalleryItem}>
      <img
        onClick={handlerOnClick}
        className={css.ImageGalleryItemImg}
        src={src}
        alt={alt}
      />
      {isOpened && <Modal largeVerion={largeVerion} onClick={handlerOnClick} />}
    </li>
  );
};

ImageGalleryItem.propTypes = {
  query: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
};
