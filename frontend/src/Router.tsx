import { createBrowserRouter } from 'react-router-dom';
import Home from './components/pages/Home/Home';
import NotFound from './components/pages/NotFound/NotFound';
import Album from './components/pages/Album/Album';
import PopupImage from './components/PopupImage/PopupImage';
import { Layout } from './components/Layout';

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
      {
        path: '/album/:albumId/page/:page',
        element: <Album />,
        children: [
          {
            path: '/album/:albumId/page/:page/image/:imageId',
            element: <PopupImage />,
          },
        ],
      },
    ],
  },
]);
