import { EObjectStatus } from 'types/enum/object-status.enum';
import { IProduct } from './product.shema';
import { IResponseBase } from './base.schema';

export interface ICartItem {
  created_at?: string;
  created_by?: string;
  created_user_name?: string;
  id: string;
  is_active: EObjectStatus;
  price: string;
  product: IProduct;
  quantity: number;
  updated_at: string;
  updated_by?: string;
  updated_user_name?: string;
}

export interface ICart {
  id: string;
  is_active: EObjectStatus;
  created_by?: string;
  created_user_name?: string;
  updated_by?: string;
  updated_user_name?: string;
  created_at: string;
  updated_at: string;
  items: ICartItem[];
}

export interface ICartResponse extends IResponseBase {
  payload: ICart;
}

export interface ICartListResponse extends IResponseBase {
  payload: ICart[];
}
