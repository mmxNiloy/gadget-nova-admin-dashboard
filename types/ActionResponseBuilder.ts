import { IErrorResponseBase, IResponseBase } from './schema/base.schema';

class ActionErrorResponse {
  private _error: IErrorResponseBase | undefined;

  constructor(error: IErrorResponseBase) {
    this._error = error;
  }

  public toJSON() {
    return { error: { ...this._error }, ok: false };
  }
}

class ActionSuccessResponse<T = IResponseBase> {
  private _data: T;
  constructor(data: T) {
    this._data = data;
  }

  public toJSON() {
    return { data: { ...this._data }, ok: true };
  }
}

export default class ActionResponseBuilder {
  public static success<T>(data: T) {
    return new ActionSuccessResponse(data);
  }

  public static error(err: IErrorResponseBase) {
    return new ActionErrorResponse(err);
  }
}
