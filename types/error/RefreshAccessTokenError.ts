export default class RefreshAccessTokenError extends Error {
  constructor(message?: string, options?: ErrorOptions) {
    super(
      message ?? 'Unable to refresh token.',
      options ?? {
        cause: 'Unable to refresh token. Please login again.'
      }
    );
    this.name = 'RefreshAccessTokenError';
  }
}
