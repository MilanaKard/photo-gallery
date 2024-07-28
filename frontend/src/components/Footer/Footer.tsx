import './Footer.scss';
const Footer = (): JSX.Element => {
  return (
    <footer className="footer">
      <div className="container footer__container">
        <p className="footer__text">
          Разработала<a href="https://github.com/milanakard"> MilanaKard </a>в 2024
        </p>
      </div>
    </footer>
  );
};

export default Footer;
