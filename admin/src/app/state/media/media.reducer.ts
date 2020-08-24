import { Image, Gallery } from '@cx/shared/types';

// media state interface
export interface State {
  images: Image[];
  imagesLoading: boolean;
  galleries: Gallery[];
  galleriesLoading: boolean;
  galleryImages: Image[];
  galleryImagesLoading: boolean;
}

export const mediaFeatureKey = 'media';

// media initial state
export const initialState: State = {
  images: [],
  imagesLoading: false,
  galleries: [],
  galleriesLoading: false,
  galleryImages: [],
  galleryImagesLoading: false,
};
