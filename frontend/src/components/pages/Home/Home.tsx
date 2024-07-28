import './Home.scss';
import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import galleryStore from '../../../stores/galleryStore';
import { AlbumCard } from '../../AlbumCard/AlbumCard';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import Loader from '../../Loader/Loader';

const Home: React.FC = observer(() => {
  const {
    albums,
    fetchAlbums,
    fetchAlbumsPagesCount,
    albumsPagesCount,
    setCurrentAlbumsPage,
    isAlbumsLoading,
    setCurrentAlbum,
    currentAlbumsPage,
    error,
  } = galleryStore;

  const navigate = useNavigate();

  useEffect(() => {
    if (!albumsPagesCount) {
      fetchAlbums();
      fetchAlbumsPagesCount();
    }
  }, []);

  const handlePageClick = (data: { selected: number }) => {
    setCurrentAlbumsPage(data.selected + 1);
  };

  return (
    <div className="album">
      <h1 className="title">Альбомы</h1>
      {isAlbumsLoading ? (
        <Loader />
      ) : (
        <>
          <div className="album__container">
            {albums[0] ? (
              albums.map((album) => (
                <AlbumCard
                  key={album.id}
                  id={album.id}
                  imageUrl={`directus/assets/${album.image}?fit=cover&width=330&height=230&quality=75`}
                  imgCount={album.imgCount}
                  title={album.title}
                  onClick={() => {
                    setCurrentAlbum(album.id);
                    navigate(`/album/${album.id}/page/1`);
                  }}
                />
              ))
            ) : (
              <p className="message">{error || 'Альбомы отсутствуют.'}</p>
            )}
          </div>
          {albums[0] && albumsPagesCount && !isAlbumsLoading ? (
            <ReactPaginate
              previousLabel={<span>&#129040;</span>}
              nextLabel={<span>&#129042;</span>}
              breakLabel={'...'}
              forcePage={currentAlbumsPage - 1}
              pageCount={albumsPagesCount}
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
        </>
      )}
    </div>
  );
});

export default Home;
