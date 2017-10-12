export const makeApiRequest = reqObj => reqPath => handlers =>
  fetch(`api/${reqPath}`, reqObj).then(handlers.success).catch(handlers.failure);

export const makeApiGet = makeApiRequest({
  method: 'GET',
  headers: new Headers(),
  mode: 'cors',
  cache: 'default',
});

export const makeApiPost = makeApiRequest({
  method: 'POST',
  headers: new Headers(),
  mode: 'cors',
  cache: 'default',
});

