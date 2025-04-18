import { EPaginationOrderString } from 'types/enum/pagination.enum';
import { IBrand, ICategory, IProduct } from './product.shema';
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

export interface IFilterBase {
  page?: number;
  limit?: number;
  order?: EPaginationOrderString;
  name?: string;
}

export interface IProductPaginationProps extends Omit<IFilterBase, 'name'> {
  sort?: keyof IProduct;
  title?: string;
  productCode?: string;
  categories?: string;
  brands?: string;
}

export interface ICategoryPaginationProps extends IFilterBase {
  sort?: keyof ICategory;
}

export interface IBrandPaginationProps extends IFilterBase {
  sort: keyof IBrand;
  categories: string;
}

export interface IOrderPaginationProps extends IFilterBase {
  sort?: keyof IOrder;
  status?: TOrderStatus;
}
