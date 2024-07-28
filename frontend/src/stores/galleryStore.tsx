import { makeAutoObservable, runInAction } from 'mobx';

import { IMAGES_PER_PAGE, ALBUMS_PER_PAGE, BASE_URL } from '../constants';

interface Album {
  id: string;
  title: string;
  image: string;
  imgCount: number;
}

interface Image {
  id: string;
  name: string;
  image: string;
}

interface ApiResponse<T> {
  data: T[];
  pagesCount: number;
}

type GalleryStoreType = {
  albums: Album[];
  currentImage: string | null;
};

class GalleryStore {
  albums: Album[] = [];
  currentAlbumsPage: number = 1;
  albumsPagesCount: number = 0;
  currentAlbum: string = '';
  isAlbumsLoading: boolean = true;
  images: Image[] = [];
  currentImagesPage: number = 1;
  imagesPagesCount: number = 0;
  currentImageIndex: number = 0;
  currentAlbumImagesCount: number = 0;
  isImagesLoading: boolean = true;
  error: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  fetchAlbums = async () => {
    try {
      runInAction(() => {
        this.isAlbumsLoading = true;
        this.error = '';
      });
      const response = await fetch(
        `${BASE_URL}/items/album?limit=${ALBUMS_PER_PAGE}&offset=${
          (this.currentAlbumsPage - 1) * ALBUMS_PER_PAGE
        }`
      );
      const data: ApiResponse<Album> = await response.json();
      runInAction(() => {
        this.albums = data.data;
      });
      this.fetchImagesCountForAlbums();
    } catch (error) {
      runInAction(() => {
        this.error = 'Возникла ошибка при загрузке альбомов.';
      });
      console.error('Ошибка при получении альбомов:', error);
    }
    runInAction(() => {
      this.isAlbumsLoading = false;
    });
  };

  fetchAlbumsPagesCount = async () => {
    try {
      const response = await fetch(`${BASE_URL}/items/album?aggregate[count]=*`);
      const countData: ApiResponse<{ count: number }> = await response.json();
      runInAction(() => {
        this.albumsPagesCount = Math.ceil(countData.data[0].count / ALBUMS_PER_PAGE);
      });
    } catch (error) {
      console.error('Ошибка при получении количества альбомов:', error);
    }
  };

  fetchImagesCountForAlbums = async () => {
    try {
      this.albums.forEach(async (album) => {
        const imagesCount = await this.getImagesCountByAlbumId(album.id);
        runInAction(() => {
          album.imgCount = Number(imagesCount);
        });
      });
    } catch (error) {
      console.error('Ошибка при получении количества изображений в альбомах:', error);
    }
  };

  getImagesCountByAlbumId = async (albumId: string) => {
    try {
      const response = await fetch(
        `${BASE_URL}/items/image?filter[album_id][_eq]=${albumId}&aggregate[count]=*`
      );
      const countData: ApiResponse<{ count: number }> = await response.json();
      return countData.data[0].count;
    } catch (error) {
      console.error('Ошибка при получении количества изображений в альбоме', error);
    }
  };

  fetchImagesPagesCount = async () => {
    try {
      const count = await this.getImagesCountByAlbumId(this.currentAlbum);
      runInAction(() => {
        this.imagesPagesCount = Math.ceil(Number(count) / IMAGES_PER_PAGE);
      });
    } catch (error) {
      console.error('Ошибка при получении количества изображений в альбоме', error);
    }
  };

  fetchImages = async () => {
    try {
      runInAction(() => {
        this.isImagesLoading = true;
        this.error = '';
      });
      const response = await fetch(
        `${BASE_URL}/items/image?filter[album_id][_eq]=${
          this.currentAlbum
        }&limit=${IMAGES_PER_PAGE}&offset=${(this.currentImagesPage - 1) * IMAGES_PER_PAGE}`
      );
      const data = await response.json();
      runInAction(() => {
        this.images = data.data;
      });
      // this.imagesPagesCount = data.pagesCount;
    } catch (error) {
      runInAction(() => {
        this.error = 'Возникла ошибка при загрузке изображений.';
      });
      console.error('Ошибка при получении изображений', error);
    }
    runInAction(() => {
      this.isImagesLoading = false;
    });
  };

  setCurrentAlbumsPage = async (page: number) => {
    runInAction(() => {
      this.currentAlbumsPage = page;
    });
    this.fetchAlbums();
  };

  setCurrentAlbum = async (albumId: string) => {
    runInAction(() => {
      this.currentAlbum = albumId;
    });
    const imagesCount = await this.getImagesCountByAlbumId(albumId);
    runInAction(() => {
      this.currentAlbumImagesCount = Number(imagesCount);
    });
  };

  setCurrentImagesPage = (page: number) => {
    runInAction(() => {
      this.currentImagesPage = page;
    });
  };

  getNextImage = async (currentIndex: number) => {
    if (currentIndex === this.images.length - 1) {
      runInAction(() => {
        this.setCurrentImagesPage(this.currentImagesPage + 1);
      });
      await this.fetchImages();
      return this.images[0].image;
    }
    return this.images[currentIndex + 1].image;
  };

  getPrevImage = async (currentIndex: number) => {
    if (currentIndex === 0) {
      runInAction(() => {
        this.setCurrentImagesPage(this.currentImagesPage - 1);
      });
      await this.fetchImages();
      return this.images[IMAGES_PER_PAGE - 1].image;
    }
    return this.images[currentIndex - 1].image;
  };
}

const galleryStore = new GalleryStore();

export default galleryStore;
