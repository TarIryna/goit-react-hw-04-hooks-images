import { useEffect } from 'react';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

export default function Modal({ src, alt, onClose }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <div className={s.overlay} onClick={handleBackdropClick}>
      <div className={s.modal}>
        <img src={src} alt={alt} width="1024" height="768" />
      </div>
      <button type="button" onClick={onClose}>
        Закрыть
      </button>
    </div>
  );
}

Modal.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  onClose: PropTypes.func,
};
