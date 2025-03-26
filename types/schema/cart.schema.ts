import { EObjectStatus } from 'types/enum/object-status.enum';
import { IProduct } from './product.shema';
import { IResponseBase } from './base.schema';

export interface ICart {
  id: string;
  is_active: EObjectStatus;
  created_by?: string;
  created_user_name?: string;
  updated_by?: string;
  updated_user_name?: string;
  created_at: string;
  updated_at: string;
  quantity: 3;
  price: string;
  expiresAt: string;
  product: IProduct;
}

export interface ICartResponse extends IResponseBase {
  payload: ICart;
}

export interface ICartListResponse extends IResponseBase {
  payload: ICart[];
}
