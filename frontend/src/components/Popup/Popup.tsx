import './Popup.scss';

type PopupPropsType = {
  isVisible: boolean;
  onClose: () => void;
};

const Popup = (props: React.PropsWithChildren<PopupPropsType>): JSX.Element => {
  const { isVisible, onClose, children } = props;
  const handleCloseClick = (e: React.MouseEvent) => {
    if (
      !(e.target as HTMLElement).closest('.popup__content') ||
      (e.target as HTMLElement).classList.contains('popup__close')
    )
      onClose();
  };
  return (
    <div className={`popup ${isVisible ? 'open' : ''}`}>
      <div className="popup__body" onClick={handleCloseClick}>
        <div className="popup__content">
          <div className="popup__close" onClick={onClose}>
            &#215;
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Popup;
