// массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
  'http://localhost:3000',
  'https://api.awesomemoviesexplorer.students.nomoredomains.sbs/',
  'http://api.awesomemoviesexplorer.students.nomoredomains.sbs/',
  'https://awesomemoviesexplorer.nomoredomains.sbs/',
  'http://awesomemoviesexplorer.nomoredomains.sbs/',
];

module.exports.corsRules = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  return next();
};
