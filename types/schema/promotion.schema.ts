import { IResponseBase } from './base.schema';
import { IPaginationBase } from './pagination.schema';
import { IProduct } from './product.shema';

export interface IPromotion {
  id: string;
  title: string;
  subTitle: string;
  startDate?: string;
  endDate?: string;
  promotionImage?: string;
  product_id: string;
  product?: IProduct;
  is_active: number;
}

export interface IPromotionResponse extends IResponseBase {
  payload: IPromotion;
}

export interface IPromotionListResponse extends IPaginationBase, IResponseBase {
  payload: IPromotion[];
}
