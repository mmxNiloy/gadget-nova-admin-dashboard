export default class SessionError extends Error {
  constructor(message?: string, options?: ErrorOptions) {
    super(
      message ?? 'Token not found or has expired.',
      options ?? {
        cause: 'Session not found or token expired. Please login again.'
      }
    );
    this.name = 'SessionError';
  }
}
