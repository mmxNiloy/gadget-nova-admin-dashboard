import { auth } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import ActionResponseBuilder from 'types/ActionResponseBuilder';
import EnvironmentError from 'types/error/EnvironmentError';
import RefreshAccessTokenError from 'types/error/RefreshAccessTokenError';
import SessionError from 'types/error/SessionError';

export async function POST(req: NextRequest) {
  try {
    const fd = await req.formData();
    fd.delete('product_id');

    if (!process.env.API_BASE_URL || !process.env.API_VERSION) {
      throw new EnvironmentError();
    }

    let token = '';
    const session = await auth();
    if (!session || !session.accessToken) {
      throw new SessionError();
    }

    if (session.error === 'RefreshAccessTokenError') {
      throw new RefreshAccessTokenError();
    }

    token = session.accessToken;

    const mHeaders = { Authorization: `Bearer ${token}` };

    const response = await fetch(
      [process.env.API_BASE_URL, process.env.API_VERSION, 'products'].join('/'),
      {
        method: 'POST',
        headers: mHeaders,
        body: fd
      }
    );

    const contentType = response.headers.get('Content-Type');
    let result;
    if (contentType?.includes('json')) {
      result = await response.json();
    } else {
      result = await response.text();
    }

    if (!response.ok) {
      return NextResponse.json(ActionResponseBuilder.error(result).toJSON(), {
        status: response.status
      });
    }

    return NextResponse.json(ActionResponseBuilder.success(result).toJSON(), {
      status: response.status
    });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(
        ActionResponseBuilder.error({
          error: true,
          message: error.message,
          statusCode: 500
        }).toJSON(),
        { status: 500 }
      );

    return NextResponse.json(
      ActionResponseBuilder.error({
        error: true,
        message: 'An unknown error occured.',
        statusCode: 500
      }).toJSON(),
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const fd = await req.formData();
    const id = fd.get('product_id');
    fd.delete('product_id');

    if (!process.env.API_BASE_URL || !process.env.API_VERSION) {
      throw new EnvironmentError();
    }

    let token = '';
    const session = await auth();
    if (!session || !session.accessToken) {
      throw new SessionError();
    }

    if (session.error === 'RefreshAccessTokenError') {
      throw new RefreshAccessTokenError();
    }

    token = session.accessToken;

    const mHeaders = { Authorization: `Bearer ${token}` };

    const response = await fetch(
      [process.env.API_BASE_URL, process.env.API_VERSION, 'products', id].join(
        '/'
      ),
      {
        method: 'PATCH',
        headers: mHeaders,
        body: fd
      }
    );

    const contentType = response.headers.get('Content-Type');
    let result;
    if (contentType?.includes('json')) {
      result = await response.json();
    } else {
      result = await response.text();
    }

    if (!response.ok) {
      return NextResponse.json(ActionResponseBuilder.error(result).toJSON(), {
        status: response.status
      });
    }

    return NextResponse.json(ActionResponseBuilder.success(result).toJSON(), {
      status: response.status
    });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(
        ActionResponseBuilder.error({
          error: true,
          message: error.message,
          statusCode: 500
        }).toJSON(),
        { status: 500 }
      );

    return NextResponse.json(
      ActionResponseBuilder.error({
        error: true,
        message: 'An unknown error occured.',
        statusCode: 500
      }).toJSON(),
      { status: 500 }
    );
  }
}
