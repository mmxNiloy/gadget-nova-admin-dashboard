import { EPaginationOrder } from 'types/enum/pagination.enum';
import { IProduct } from './product.shema';
import { IOrder, TOrderStatus } from './order.schema';

export interface IPaginationBase {
  meta: IPaginationMeta;
}

export interface IPaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface IProductPaginationProps {
  page?: number;
  limit?: number;
  sort?: keyof IProduct;
  order?: EPaginationOrder;
  title?: string;
  productCode?: string;
  categories?: string;
  brands?: string;
}

export interface IOrderPaginationProps {
  page?: number;
  limit?: number;
  sort?: keyof IOrder;
  order?: EPaginationOrder;
  name?: string;
  status?: TOrderStatus;
}
