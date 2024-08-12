import { useEffect, useState } from 'react';
import { fetchImages } from './articles-api';
import ImageGallery from './components/ImageGallery/ImageGallery';
import SearchBar from './components/SearchBar/SearchBar';
import Section from './components/Section/Section';
import Loader from './components/Loader/Loader';
import ImageModal from './components/ImageModal/ImageModal';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import { Toaster } from 'react-hot-toast';
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn';


function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState(''); 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalImage, setModalImage] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    async function fetchImagesFromAPI() {
      if (!query.trim()) {
        setError(null);
        setImages([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setIsLoadingMore(page > 1);
      setError(null);

      try {
        const data = await fetchImages(query, page);
        if (data.results.length === 0 && page === 1) {
          if (page === 1) {
            setImages([]);
            setError('No images found');
          }
        } else {
          setImages(prevImages => page === 1 ? data.results : [...prevImages, ...data.results]);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    }

    fetchImagesFromAPI();
  }, [query, page]);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (query.trim()) {
      setImages([]);
      setPage(1); 
      setQuery(query.trim());
    }
  };

  const loadMoreImages = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = (image) => {
    setModalImage(image);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <>
      <Section>
        <SearchBar onSearch={setQuery} onSubmit={handleSubmit} onChange={handleChange} />
      </Section>
      <Section>
        {(isLoading || isLoadingMore) && <Loader />}
        {error && <ErrorMessage message={error} />}
        {images.length > 0 && (
          <>
            <ImageGallery items={images} onImageClick={openModal} />
            {!isLoading && <LoadMoreBtn onClick={loadMoreImages} />}
          </>
        )}
      </Section>
      {modalImage && (
        <ImageModal
          isOpen={!!modalImage}
          onRequestClose={closeModal}
          image={modalImage}
        />
      )}
      <Toaster />
    </>
  );
}

export default App;