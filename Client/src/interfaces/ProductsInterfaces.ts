export interface IProduct {
  address: any;
  _id: string;
  title: string;
  description: string;
  image: {
    url: string;
    alt?: string;
  };
  price: number;
  biznumber: number;
  userId: string;
  likes: [];
}

export interface IProductResponse {
  success: boolean;
  data: IProduct[];
}
