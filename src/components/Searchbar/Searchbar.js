import PropTypes from 'prop-types';
import { useState } from 'react';
import s from './Searchbar.module.css';
import { toast } from 'react-toastify';

export default function Searchbar({ onSubmit }) {
  const [filter, setFilter] = useState('');

  const onChangeInput = e => {
    const value = e.currentTarget.value.trim();
    setFilter(value);
  };

  const onSubmitForm = e => {
    e.preventDefault();
    if (filter === '') {
      return toast('Введите ваш запрос');
    }
    onSubmit(filter);
  };

  return (
    <header className={s.searchbar}>
      <form className={s.form} onSubmit={onSubmitForm}>
        <button type="submit" className={s.button}>
          <span className={s.label}>Search</span>
        </button>

        <input
          className={s.input}
          type="text"
          placeholder="Search images and photos"
          onChange={onChangeInput}
          value={filter}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
