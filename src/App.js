import { useState } from 'react';
import './App.css';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [filter, setFilter] = useState('');

  const onSearchBtn = query => {
    setFilter(query);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={onSearchBtn} />
      {filter.length > 0 && <ImageGallery query={filter} />}
      <ToastContainer />
    </div>
  );
}
