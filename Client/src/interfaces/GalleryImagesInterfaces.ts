export interface IGalleryImage {
  _id: string;
  title: string;
  image: {
    url: string;
    alt: string;
  };
}

export interface IGalleryResponse {
  success: boolean;
  data: IGalleryImage[];
}
