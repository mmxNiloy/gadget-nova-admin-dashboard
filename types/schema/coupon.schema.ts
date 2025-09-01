import { IResponseBase } from './base.schema';
import { IBrand, ICategory, IProduct } from './product.shema';

export enum CouponTypeEnum {
  PERCENTAGE = 'PERCENTAGE',
  FLAT = 'FLAT',
  DELIVERY_CHARGE = 'DELIVERY_CHARGE'
}

export enum CouponUsageTypeEnum {
  SINGLE_USAGE = 'SINGLE_USAGE',
  MULTI_USAGE = 'MULTI_USAGE'
}

export type CouponType = 'PERCENTAGE' | 'FLAT' | 'DELIVERY_CHARGE';

export type CouponUsageType = 'SINGLE_USAGE' | 'MULTI_USAGE';

export interface ICoupon {
  /* Capitalized Coupon Code */
  is_active?: number;
  id: string;
  couponCode: string;
  description: string;
  couponType: CouponType;
  couponValue: number;
  maximumDiscountLimit: number;
  minimumOrderAmount: number;
  startDate: string;
  endDate: string;
  usageLimitPerUser: number;
  applicableProductIds: string[];
  applicableCategoryIds: string[];
  applicableSubCategoryIds: string[];
  applicableBrandIds: string[];
  applicableProducts?: IProduct[];
  applicableCategories?: ICategory[];
  applicableSubCategories?: ICategory[];
  applicableBrands?: IBrand[];
  couponUsageType: CouponUsageType;
  userId: string;
}

export interface ICouponResponse extends IResponseBase {
  payload: ICoupon;
}

export interface ICouponListResponse extends IResponseBase {
  payload: ICoupon[];
}
