import { NavLink } from 'react-router-dom';
import './Header.scss';

const Header = (): JSX.Element => {
  return (
    <header className="header">
      <div className="container header__container">
        <NavLink to="/">
          <div className="header__logo">
            <div className="header__image"></div>
            <h1 className="header__text">Фотогалерея</h1>
          </div>
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
