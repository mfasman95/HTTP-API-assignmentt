const http = require('http');
const { URL } = require('url');
const path = require('path');
const child_process = require('child_process'); // eslint-disable-line

const PORT = process.env.PORT || process.env.NODE_PORT || 3001;

const contentResponses = require('./api/responses/contentResponses');
const jsonResponses = require('./api/responses/jsonResponses');
const { handleApiGet, handleApiPost, handleApiHead } = require('./api/handlers/handlerMapping');

const handleContent = (req, res, urlData) => {
  let filePath;
  if (urlData.endPoint !== '') filePath = urlData.pathname.replace('/static', `./../client/build/${urlData.endPoint}`);
  else filePath = urlData.pathname.replace('/', './../client/build/');

  let fileName = urlData.pathParts[urlData.pathParts.length - 1];
  if (fileName === '') {
    fileName = 'index.html';
    filePath = `${filePath}/${fileName}`;
  }
  const fileExtension = fileName.substr(fileName.lastIndexOf('.') + 1);
  let contentType = 'text/html';
  switch (fileExtension) {
    case 'html': { contentType = 'text/html'; break; }
    case 'css': { contentType = 'text/css'; break; }
    case 'js': { contentType = 'application/javascript'; break; }
    case 'ico': { contentType = 'image/x-icon'; break; }
    case 'svg': { contentType = 'image/svg+xml'; break; }
    case 'map': { contentType = 'application/json'; break; }
    // Throw an internal server error if the file extension is not recognized
    default: { return jsonResponses.respond500(req, res); }
  }
  return contentResponses(path.join(__dirname, filePath))({ 'Content-Type': contentType })(req, res);
};

const reqHandlers = Object.freeze({
  GET: (req, res, urlData) => {
    switch (urlData.endPoint) {
      case 'static': { return handleContent(req, res, urlData); }
      case 'api': { return handleApiGet(req, res, urlData.pathParts[1], urlData.searchParams); }
      case '': { return handleContent(req, res, urlData); }
      default: { return jsonResponses.respond404(req, res); }
    }
  },
  POST: (req, res, urlData) => {
    // Only handle request if it was sent to the api endpoint
    if (urlData.endPoint === 'api') return handleApiPost(req, res, urlData.pathParts[1], urlData.searchParams);
    return jsonResponses.respond400({
      message: 'This is not a valid api endpoint',
      id: 'invalidEndpoint',
    })(req, res);
  },
  HEAD: (req, res, urlData) => {
    // Only handle request if it was sent to the api endpoint
    if (urlData.endPoint === 'api') return handleApiHead(req, res, urlData.pathParts[1]);
    return jsonResponses.respond400({
      message: 'This is not a valid api endpoint',
      id: 'invalidEndpoint',
    })(req, res);
  },
});

// Handler for incoming requests
const onRequest = (req, res) => {
  // Build a url object
  const url = new URL(req.url, `http://localhost:${PORT}/`);
  // Dereference relevant url components
  const { searchParams, pathname } = url;
  // Seperate the parts of the url path
  const pathParts = pathname.split('/');
  // Remove the unneeded first part which will always be ''
  pathParts.splice(0, 1);

  // There is no endpoint if there is only one path part
  let endPoint;
  if (pathParts.length === 1) endPoint = '';
  else endPoint = pathParts[0];

  // Take all the parsed data and put it into an object to be sent to the appropriate handler
  const urlData = { searchParams, pathname, pathParts, endPoint };
  // Check if the API handles this kind of method
  if (reqHandlers[req.method]) return reqHandlers[req.method](req, res, urlData);
  // If the handler for the method is not implemented
  return jsonResponses.respond400({
    message: `Requests of type ${req.method} are not supported by this server`,
    id: 'reqMethodNotSupported',
  })(req, res);
};

const startServer = () => http.createServer(onRequest).listen(PORT, () => { console.dir(`Server listening at localhost:${PORT}`); });

// In production, build the client app before starting the server 
if (process.env.NODE_ENV === 'production') {
  // Start the server after building the application
  startServer();
  // Install the necessary dependencies
  child_process.spawnSync('yarn', [''], { stdio: 'inherit', cwd: 'client', shell: true });
  // Build the react application
  child_process.spawnSync('npm run', ['build'], { stdio: 'inherit', cwd: 'client', shell: true });
// Outside of production, the client app is being hotloaded so it doesn't need a build
} else startServer();
