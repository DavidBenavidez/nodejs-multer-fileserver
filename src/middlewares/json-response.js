import { defaultStatusCodes } from '../helpers';

export default (req, res, next) => {
  const defaultResponse = (data = null, options = {}) => {
    let status = 'success';
    let message = options.message || null;

    const errors = options.errors || null;
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
      errors,
    });
  };

  res.jsonResponse = (data = null, options = {}) => {
    const format = req.query.format || req.body.format || options.format;

    if (format === 'plain') return res.json(data);
    return defaultResponse(data, options);
  };

  next();
};
