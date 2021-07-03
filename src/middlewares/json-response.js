import { defaultStatusCodes } from '../helpers';

/**
 * Normalizes the json response for
 * consistent responses.
 */
export default (_, res, next) => {
  const defaultResponse = (data = null, options = {}) => {
    let status = 'success';
    let message = options.message || null;

    const error = options.error || null;
    const code = parseInt(res.statusCode || 200, 10);

    if (!options.message && code) {
      message = defaultStatusCodes[res.statusCode];
    }

    if (code < 300) {
      status = 'success';
    } else if (code < 500) {
      status = 'failed';
    } else {
      status = 'error';
    }

    return res.json({
      code,
      status,
      message,
      data,
      error,
    });
  };

  res.jsonResponse = (data = null, options = {}) => {
    return defaultResponse(data, options);
  };

  next();
};
