import './AlbumCard.scss';
import { Card, CardProps } from '../Card/Card';

export type AlbumCardProps = CardProps & {
  imgCount: number;
  title: string;
};

export const AlbumCard = (data: AlbumCardProps): JSX.Element => {
  const { id, imgCount, title, imageUrl, onClick = () => {} } = data;

  return (
    <div className="album-card" data-id={id} onClick={onClick}>
      <Card id={id} imageUrl={imageUrl} />
      <div className="album-card__info">
        <h2 className="album-card__title">{title}</h2>
        <p className="album-card__count">{imgCount} фото</p>
      </div>
    </div>
  );
};
