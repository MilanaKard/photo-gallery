import './PopupImage.scss';
import { useParams, useNavigate, Outlet } from 'react-router-dom';
import Popup from '../Popup/Popup';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import galleryStore from '../../stores/galleryStore';
import { BASE_URL, IMAGES_PER_PAGE } from '../../constants';
import { getScrollBarWidth } from '../../utils';
import { KeyboardEventHandler, useEffect, useState } from 'react';

const PopupImage: React.FC = observer(() => {
  const { albumId, imageId, page } = useParams();
  const { getNextImage, getPrevImage, images, currentAlbumImagesCount } = galleryStore;
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(
    images.findIndex((image) => image.image === imageId)
  );
  const [isPopUpVisible, setIsPopupvisible] = useState(false);

  useEffect(() => {
    setIsPopupvisible(true);
    document.body.style.paddingRight = `${getScrollBarWidth()}px`;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '0';
    };
  }, []);

  useEffect(() => {
    document.body.style.paddingRight = `${getScrollBarWidth()}px`;
    setCurrentIndex(images.findIndex((image) => image.image === imageId));
  }, [imageId, images]);

  const onClosePopup = () => {
    setIsPopupvisible(false);
    setTimeout(() => {
      navigate(`/album/${albumId}/page/${page}`);
    }, 800);
  };

  const handleNextImageClick = async () => {
    if ((Number(page) - 1) * IMAGES_PER_PAGE + currentIndex + 1 === currentAlbumImagesCount) {
      return;
    }
    const img = await getNextImage(currentIndex);
    navigate(
      `/album/${albumId}/page/${
        currentIndex === images.length - 1 ? Number(page) + 1 : page
      }/image/${img}`
    );
  };

  const handlePrevImageClick = async () => {
    if (currentIndex === 0 && Number(page) === 1) {
      return;
    }
    const img = await getPrevImage(currentIndex);
    navigate(`/album/${albumId}/page/${currentIndex === 0 ? Number(page) - 1 : page}/image/${img}`);
  };

  return (
    <Popup isVisible={isPopUpVisible} onClose={onClosePopup}>
      <img className="popup__image" src={`${BASE_URL}/assets/${imageId}`} />
      <div className="popup__panel">
        <p>
          {(Number(page) - 1) * IMAGES_PER_PAGE + currentIndex + 1}/{currentAlbumImagesCount}
        </p>
        <div className="popup__buttons">
          <button
            className={`popup__button prev ${
              currentIndex === 0 && Number(page) === 1 ? 'disabled' : ''
            }`}
            onClick={handlePrevImageClick}
          >
            &#129040;
          </button>
          <button
            className={`popup__button next ${
              (Number(page) - 1) * IMAGES_PER_PAGE + currentIndex + 1 === currentAlbumImagesCount
                ? 'disabled'
                : ''
            }`}
            onClick={handleNextImageClick}
          >
            &#129042;
          </button>
        </div>
      </div>
    </Popup>
  );
});

export default PopupImage;
