import './Card.scss';

export type CardProps = {
  id: string;
  imageUrl: string;
  onClick?: () => void;
};

export const Card = ({ id, imageUrl, onClick = () => {} }: CardProps): JSX.Element => {
  return (
    <div className="card" data-id={id} onClick={onClick}>
      <img className="card-img" src={imageUrl} />
    </div>
  );
};
