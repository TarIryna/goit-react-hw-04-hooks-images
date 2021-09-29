import React from 'react';
import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ url, alt, index, onClick }) {
  return (
    <>
      <li key={index} className={s.item} onClick={() => onClick(index)}>
        <img src={url} alt={alt} className={s.image} loading="lazy" />
      </li>
    </>
  );
}

ImageGalleryItem.propTypes = {
  onClick: PropTypes.func,
  url: PropTypes.string,
  alt: PropTypes.string,
  index: PropTypes.number,
};
