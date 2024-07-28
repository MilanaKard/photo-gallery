import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';

const Layout = (): JSX.Element => {
  return (
    <>
      <Header />
      <main className="container main__container">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
export { Layout };
