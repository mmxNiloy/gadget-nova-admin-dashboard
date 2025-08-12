import { IResponseBase } from './base.schema';

export interface IUserBase {
  id: string;
  is_active: number;
  created_by?: string;
  created_user_name?: string;
  updated_by?: string;
  updated_user_name?: string;
  created_at?: string;
  updated_at?: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  image?: string;
  is_verified: boolean;
}

export interface IUserAuth extends IUserBase {
  verification_token: string;
  refresh_token: string;
  reset_password_token: string;
  access_token: string;
  expires_at?: string;
}

export interface IUserResponse extends IResponseBase {
  payload: IUserBase;
}

export interface IUserListResponse extends IResponseBase {
  payload: IUserBase[];
}

export interface IUserAuthResponse extends IResponseBase {
  payload: IUserAuth;
}

export type TUserProfile = Pick<
  IUserBase,
  | 'id'
  | 'is_active'
  | 'name'
  | 'email'
  | 'is_verified'
  | 'role'
  | 'image'
  | 'phone'
>;

export interface IUserProfile extends IResponseBase {
  payload: TUserProfile;
}

export interface ISignUpResponseBase {
  success: boolean;
  message:
    | string
    | {
        message: string | string[];
      };
  data: {
    phone: string;
    otpSent: boolean;
    session: IUserAuth;
  };
}

export interface ISignUpResponse extends IResponseBase {
  payload: ISignUpResponseBase;
}
