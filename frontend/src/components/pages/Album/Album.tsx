import './Album.scss';
import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import galleryStore from '../../../stores/galleryStore';
import { Card } from '../../Card/Card';
import ReactPaginate from 'react-paginate';
//import {useLocation} from 'react-router-dom'
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../../../constants';
import Loader from '../../Loader/Loader';

const Album: React.FC = observer(() => {
  const {
    images,
    fetchImages,
    fetchImagesPagesCount,
    imagesPagesCount,
    setCurrentImagesPage,
    setCurrentAlbum,
    isImagesLoading,
    error,
  } = galleryStore;

  const { albumId, page } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentAlbum(`${albumId}`);
    setCurrentImagesPage(Number(page));
    fetchImages();
    fetchImagesPagesCount();
  }, [page]);

  const handlePageClick = (data: { selected: number }) => {
    navigate(`/album/${albumId}/page/${data.selected + 1}`);
  };

  return (
    <div className="images">
      <h1 className="title">Фотографии</h1> {isImagesLoading ? <Loader /> :
      <div className="images__container">
        {images[0] ? (
          images.map((image) => (
            <Card
              key={image.id}
              id={image.id}
              imageUrl={`${BASE_URL}/assets/${image.image}?fit=cover&width=330&height=230&quality=75`}
              onClick={() => {
                navigate(`/album/${albumId}/page/${page}/image/${image.image}`);
              }}
            />
          ))
        ) : (
          <p className="message">{error || 'Изображения отсутствуют.'}</p>
        )}
      </div>}
      {images[0] && imagesPagesCount && !isImagesLoading ? (
        <ReactPaginate
          previousLabel={<span>&#129040;</span>}
          nextLabel={<span>&#129042;</span>}
          breakLabel={'...'}
          forcePage={Number(page) - 1}
          pageCount={imagesPagesCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-item'}
          previousLinkClassName={'page-link'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link'}
          breakClassName={'page-item'}
          breakLinkClassName={'page-link'}
          activeClassName={'page-active'}
          disabledClassName={'page-disabled'}
        />
      ) : (
        ''
      )}
      <Outlet />
    </div>
  );
});

export default Album;
