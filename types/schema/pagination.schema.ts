import { EPaginationOrder } from 'types/enum/pagination.enum';
import { IProduct } from './product.shema';

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
