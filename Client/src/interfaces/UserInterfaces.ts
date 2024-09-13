import { IProduct } from "./ProductsInterfaces";

export interface IUsers {
  _id: string;
  name: {
    first: string;
    last: string;
  };
  phone: string;
  email: string;
  address: {
    city: string;
    street: string;
    houseNumber: number;
    zip: number;
  };
  isAdmin: boolean;
  createdAt: string;
}

export interface IEditUser {
  name: {
    first: string;
    last: string;
  };
  phone: string;
  address: {
    city: string;
    street: string;
    houseNumber: number;
    zip: number;
  };
}

export interface CostumJwtPayload {
  _id: string;
  isAdmin: boolean;
  iat: number;
}

export interface IUserImage {
  imageUrl?: string;
  ImageAlt?: string;
}

export interface IUsersResponse {
  success: boolean;
  data: IProduct[];
}
