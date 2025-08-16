import { EObjectStatus } from 'types/enum/object-status.enum';
import { IUserBase } from './user.schema';
import { IResponseBase } from './base.schema';
import { IPaginationBase } from './pagination.schema';
import { ICart } from './cart.schema';
import { PaymentMethod } from '@/constants/site-payment-methods';

export type TOrderStatus =
  | 'Pending'
  | 'Confirmed'
  | 'Delivered'
  | 'On The Way'
  | 'Paid'
  | 'Failed'
  | 'Cancelled'
  | 'On Hold';

export type PaymentStatus = 'Pending' | 'Initiated' | 'Paid' | 'Failed';

export const OrderStatusValues: TOrderStatus[] = [
  'Pending',
  'Confirmed',
  'Delivered',
  'On The Way',
  'Paid',
  'Failed',
  'Cancelled',
  'On Hold'
];

export interface IOrder {
  id: string;
  orderId?: string;
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
  delivery_charge: string;
  payments: IPayment[];
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
  district_id: string;
}

export interface IDistrict {
  id: string;
  name: string;
  is_active: number;
  delivery_charge: string;
}

export interface IDistrictListResponse extends IResponseBase {
  payload: IDistrict[];
}

export interface IPayment {
  id: string;
  is_active: number;
  created_by: string;
  created_user_name: string;
  updated_by?: string;
  updated_user_name?: string;
  created_at: string;
  updated_at?: string;
  paymentMethod: PaymentMethod;
  providerResponse: string;
  paymentId?: string;
  paymentStatus: PaymentStatus;
  executeResponse?: string;
  payerReference?: string;
  paymentTime?: string;
  paidAmount?: string;
  orderAmount: string;
  transactionId?: string;
  transactionStatus?: string;
  merchantInvoiceNumber?: string;
}
