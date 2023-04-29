import React, { useEffect, useState } from 'react';
import { fetchImgs, per_page } from 'servises/api';
import { SearchBar } from './Searchbar';
import { Loader } from './Loader';
import { ImageGalleryItem } from './ImageGalleryItem';
import { Button } from './Button';

import css from './ImageGallery.module.css';

export const ImageGallery = () => {
  const [query, setQuery] = useState('');
  const [collection, setCollection] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [isShowButton, setShowButton] = useState(false);

  useEffect(() => {
    if (query === '') {
      return;
    }

    fetchImgs(query, page)
      .then(response => {
        const imgCollection = response.data.hits;
        setCollection(prevState => [...prevState, ...imgCollection]);
        setShowButton(page < Math.ceil(response.data.totalHits / per_page));
      })
      .catch(error => setError(true))
      .finally(setLoading(false));
  }, [query, page]);

  const handlerInputChange = input => {
    setQuery(input);
    setCollection([]);
    setLoading(true);
    setPage(1);
  };

  const handlerPaginationButtonClick = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <>
      <SearchBar getQuery={handlerInputChange} />
      {error && <p>Что-то не так, попробуйте ещё раз...</p>}
      {isLoading && <Loader />}

      {collection.length > 0 && (
        <>
          <ul className={css.ImageGallery}>
            {collection.map(item => (
              <ImageGalleryItem
                key={item.id}
                src={item.webformatURL}
                largeVerion={item.largeImageURL}
              />
            ))}
          </ul>
          {isLoading ? (
            <Loader />
          ) : (
            isShowButton && (
              <Button
                disabled={isLoading}
                onClick={handlerPaginationButtonClick}
              />
            )
          )}
        </>
      )}
    </>
  );
};
