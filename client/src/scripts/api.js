export const makeApiRequest = reqObj => reqPath => (handlers) => {
  let path = reqPath; 

  if (process.env.NODE_ENV !== 'production') path = `http://localhost:3000/api/${reqPath}`;
  else path = `api/${reqPath}`;

  fetch(path, reqObj).then(handlers.success).catch(handlers.failure);
};

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

