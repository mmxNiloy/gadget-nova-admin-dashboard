import { IErrorResponseBase, IResponseBase } from './schema/base.schema';

class ActionErrorResponse {
  private _error: IErrorResponseBase | undefined;

  constructor(error: IErrorResponseBase) {
    this._error = error;
  }

  public toJSON() {
    let eMessage = '';
    if (this._error?.message && typeof this._error.message === 'string') {
      eMessage = this._error?.message ?? '';
    } else {
      // @ts-ignore
      eMessage = this._error.message.message.join();
    }

    return { error: { ...this._error, message: eMessage }, ok: false };
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
    if (typeof data === 'string')
      return new ActionSuccessResponse({
        error: false,
        message: 'Data Fetch Successful',
        payload: data,
        statusCode: 200
      });

    return new ActionSuccessResponse(data);
  }

  public static error(err: IErrorResponseBase) {
    return new ActionErrorResponse(err);
  }
}
