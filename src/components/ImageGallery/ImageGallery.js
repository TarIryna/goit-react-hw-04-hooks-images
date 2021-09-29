import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';
import Button from '../Button';
import Loader from 'react-loader-spinner';
import Modal from '../Modal';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { toast } from 'react-toastify';
import s from './ImageGallery.module.css';
import api from '../../services/pixabay-api';

export default function ImageGallery({ query }) {
  const [page, setPage] = useState(1);
  const [photoes, setPhotoes] = useState([]);
  const [total, setTotal] = useState(null);
  const [status, setStatus] = useState('idle');
  const [id, setId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const getPhotoes = (query, page) => {
    api
      .fetchPhotoes(query, page)
      .then(({ hits, totalHits }) => {
        setTotal(totalHits);
        setStatus('resolved');
        page === 1 ? setPhotoes(hits) : setPhotoes(state => [...state, ...hits]);
      })
      .catch(() => setStatus('rejected'))
      .finally(() => scroll());
  };

  useEffect(() => {
    if (!query) {
      return;
    }
    setStatus('pending');
    getPhotoes(query, page);
  }, [page]);

  useEffect(() => {
    setPage(1);
    setPhotoes([]);
    setStatus('pending');
    getPhotoes(query, 1);
  }, [query]);

  const onLoadMore = () => {
    setPage(state => state + 1);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setId(null);
  };

  const setImage = index => {
    setId(index);
    openModal();
  };

  const scroll = () => {
    window.scrollTo({
      top: 1000 * page,
      behavior: 'smooth',
    });
  };

  const isNotLast = Number(total) !== photoes.length ? true : false;
  if (status === 'idle') {
    return (
      <div>
        <p>Загружаем...</p>
      </div>
    );
  }

  if (status === 'rejected') {
    return toast.error('Ваш запрос не найден');
  }
  if (status === 'resolved') {
    return (
      <>
        <ul className={s.gallery}>
          {photoes.map(({ webformatURL, tags }, index) => (
            <ImageGalleryItem
              key={index}
              url={webformatURL}
              alt={tags}
              index={index}
              onClick={setImage}
            />
          ))}
        </ul>
        {isNotLast && <Button onClick={onLoadMore} />}
        {showModal && (
          <Modal src={photoes[id].largeImageURL} alt={photoes[id].tags} onClose={closeModal} />
        )}
      </>
    );
  }
  if (status === 'pending') {
    return <Loader type="Circles" color="#00BFFF" height={80} width={80} />;
  }
}

ImageGallery.propTypes = {
  filter: PropTypes.string,
};
