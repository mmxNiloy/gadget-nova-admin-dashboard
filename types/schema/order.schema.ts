import { EObjectStatus } from 'types/enum/object-status.enum';
import { IUserBase } from './user.schema';
import { IResponseBase } from './base.schema';
import { IPaginationBase } from './pagination.schema';
import { ICart } from './cart.schema';

export type TOrderStatus = 'Pending' | 'Confirmed' | 'Delivered' | 'On The Way';
export const OrderStatusValues: TOrderStatus[] = [
  'Pending',
  'Confirmed',
  'Delivered',
  'On The Way'
];

export interface IOrder {
  id: string;
  is_active: EObjectStatus;
  created_by?: string;
  created_user_name?: string;
  updated_by?: string;
  updated_user_name?: string;
  created_at: string;
  updated_at: string;
  status: TOrderStatus;
  totalPrice: string;
  user: IUserBase;
  cart: ICart;
  shippingInfo: IShippingInfo;
}

export interface IOrderResponse extends IResponseBase {
  payload: IOrder;
}

export interface IOrderListResponse extends IPaginationBase {
  payload: IOrder[];
}

export interface IShippingInfo {
  first_name: string;
  last_name: string;
  company_name: string;
  email: string;
  phone: string;
  address: string;
  additional_info?: string;
}
