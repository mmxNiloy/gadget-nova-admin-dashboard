'use server';

import ActionResponseBuilder from 'types/ActionResponseBuilder';
import EnvironmentError from 'types/error/EnvironmentError';
import SessionError from 'types/error/SessionError';
import { IErrorResponseBase, IResponseBase } from 'types/schema/base.schema';
import getSession from './auth/get-session.controller';

interface RequestAPIProps extends RequestInit {
  method:
    | 'GET'
    | 'POST'
    | 'PATCH'
    | 'PUT'
    | 'DELETE'
    | 'HEAD'
    | 'TRACE'
    | 'CONNECT'
    | 'OPTIONS';
  endpoint: string;
  authenticate?: boolean;
  query?: string[][];
  asFormData?: boolean;
}

export default async function requestAPI<T = IResponseBase>({
  method,
  endpoint,
  body,
  authenticate = false,
  query = [],
  headers,
  asFormData = false
}: RequestAPIProps): Promise<
  { data: T; ok: true } | { ok: false; error: IErrorResponseBase }
> {
  const reqTime = new Date();
  try {
    console.info(
      `[Request ${reqTime} | ${method}] > Actions > Begin Request API >`,
      {
        method,
        url: [process.env.API_BASE_URL, process.env.API_VERSION, endpoint].join(
          '/'
        ),
        query,
        authenticate,
        body
      }
    );

    if (!process.env.API_BASE_URL || !process.env.API_VERSION) {
      throw new EnvironmentError();
    }

    let token = '';
    if (authenticate) {
      const session = await getSession();
      console.log('Session:', session);
      if (!session) {
        throw new SessionError();
      }

      token = session.access_token;
    }

    const mHeaders = asFormData
      ? { Authorization: `Bearer ${token}`, ...headers }
      : {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          ...headers
        };

    const response = await fetch(
      [process.env.API_BASE_URL, process.env.API_VERSION, endpoint]
        .join('/')
        .concat(`?${query.map((item) => item.join('=')).join('&')}`),
      {
        method,
        headers: mHeaders,
        body
      }
    );

    const contentType = response.headers.get('Content-Type');
    let result;
    if (contentType?.includes('json')) {
      result = await response.json();
    } else {
      result = await response.text();
    }

    console.log(
      `[Request ${reqTime} | ${method}] > Actions > Request API > Response >`,
      result
    );
    console.log(
      `[Request ${reqTime} | ${method}] > Actions > Request API > Status >`,
      response.status
    );

    if (!response.ok) {
      console.warn(
        `[Request ${reqTime} | ${method}] > Actions > Request API > API Responded with an error.`
      );
      return ActionResponseBuilder.error(result).toJSON();
    }

    console.log(
      `[Request ${reqTime} | ${method}] > Actions > Request API > API Responded with a success.`
    );
    console.info(
      `[Request ${reqTime} | ${method}] > Actions > End Request API`
    );

    return ActionResponseBuilder.success(result).toJSON();
  } catch (error) {
    console.error(
      `[Request ${reqTime} | ${method}] > Actions > Request API > Failed to make a request >`,
      error
    );

    if (error instanceof Error)
      return ActionResponseBuilder.error({
        error: true,
        message: error.message,
        statusCode: 500
      }).toJSON();

    return ActionResponseBuilder.error({
      error: true,
      message: 'An unknown error occured.',
      statusCode: 500
    }).toJSON();
  }
}
