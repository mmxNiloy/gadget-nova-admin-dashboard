export default class EnvironmentError extends Error {
  constructor(message?: string, options?: ErrorOptions) {
    super(
      message ?? 'API URL Environment not set.',
      options ?? {
        cause: 'Missing API_BASE_URL or API_VERSION in environment.'
      }
    );
    this.name = 'EnvironmentError';
  }
}
