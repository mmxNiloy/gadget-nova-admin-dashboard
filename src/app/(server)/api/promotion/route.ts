import { getAccessToken, updateSession } from '@/lib/session';
import { NextRequest, NextResponse } from 'next/server';
import ActionResponseBuilder from 'types/ActionResponseBuilder';
import EnvironmentError from 'types/error/EnvironmentError';
import RefreshAccessTokenError from 'types/error/RefreshAccessTokenError';

export async function POST(req: NextRequest) {
  try {
    const fd = await req.formData();

    if (!process.env.API_BASE_URL || !process.env.API_VERSION) {
      throw new EnvironmentError();
    }

    let session = await getAccessToken();
    if (!session) {
      session = await updateSession();
    }

    if (!session) {
      throw new RefreshAccessTokenError();
    }

    const mHeaders = { Authorization: `Bearer ${session}` };

    const formData = new FormData();
    formData.append('title', fd.get('title') ?? '');
    formData.append('subTitle', fd.get('subTitle') ?? '');
    formData.append('startDate', fd.get('startDate') ?? '');
    formData.append('endDate', fd.get('endDate') ?? '');
    formData.append('promotionImage', fd.get('promotionImage') ?? '');
    formData.append('product_id', fd.get('product_id') ?? '');

    const response = await fetch(
      [process.env.API_BASE_URL, process.env.API_VERSION, 'promotions'].join(
        '/'
      ),
      {
        method: 'POST',
        headers: mHeaders,
        body: formData
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
      console.log('[Promotion] > [POST] > Failed to create promotion');
      return NextResponse.json(ActionResponseBuilder.error(result).toJSON(), {
        status: response.status
      });
    }

    console.log('[Promotion] > [POST] > Successfully created promotion');

    return NextResponse.json(ActionResponseBuilder.success(result).toJSON(), {
      status: response.status
    });
  } catch (error) {
    console.log('[Promotion] > [POST] > Error', error);
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
    const id = fd.get('promotion_id');

    if (!process.env.API_BASE_URL || !process.env.API_VERSION) {
      throw new EnvironmentError();
    }

    let session = await getAccessToken();
    if (!session) {
      session = await updateSession();
    }

    if (!session) {
      throw new RefreshAccessTokenError();
    }

    const mHeaders = { Authorization: `Bearer ${session}` };

    const formData = new FormData();
    formData.append('title', fd.get('title') ?? '');
    formData.append('subTitle', fd.get('subTitle') ?? '');
    formData.append('startDate', fd.get('startDate') ?? '');
    formData.append('endDate', fd.get('endDate') ?? '');
    formData.append('promotionImage', fd.get('promotionImage') ?? '');
    formData.append('product_id', fd.get('product_id') ?? '');

    const response = await fetch(
      [
        process.env.API_BASE_URL,
        process.env.API_VERSION,
        'promotions',
        id
      ].join('/'),
      {
        method: 'PATCH',
        headers: mHeaders,
        body: formData
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
      console.log('[Promotion] > [PATCH] > Result error', result);
      return NextResponse.json(ActionResponseBuilder.error(result).toJSON(), {
        status: response.status
      });
    }

    console.log('[Promotion] > [PATCH] > Result', result);
    return NextResponse.json(ActionResponseBuilder.success(result).toJSON(), {
      status: response.status
    });
  } catch (error) {
    console.log('[Promotion] > [PATCH] > Error', error);
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
