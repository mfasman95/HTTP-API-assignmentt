// All purpose json response handler
const respondJson = status => (object, headers) => (req, res) => {
  const standardHeaders = { 'Content-Type': 'application/json' };

  const finalHeaders = Object.assign(standardHeaders, headers || {});
  res.writeHead(status, finalHeaders);
  res.end(JSON.stringify(object));
};

// Only sends back header data
const respondMeta = status => headers => (req, res) => {
  const finalHeaders = Object.assign({ 'Content-Type': 'application/json' }, headers);
  res.writeHead(status, finalHeaders);
  res.end();
};

module.exports = Object.freeze({
  respond200: respondJson(200),
  respond201: respondJson(201),
  respond204: respondJson(204),
  respond400: respondJson(400),
  respond404: respondJson(404)({
    message: 'The resource you are looking for was not found',
    id: 'notFound',
  }),
  respond500: respondJson(500)({
    message: 'Internal server Error, something went wrong',
    id: 'internalError',
  }),
  meta304: respondMeta(304)({}),
});
