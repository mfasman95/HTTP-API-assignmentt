export const makeApiRequest = reqObj => reqPath => handlers => {
  if (process.env.NODE_ENV !== 'production') reqPath = `http://localhost:3000/api/${reqPath}`;
  else reqPath = `api/${reqPath}`;

  console.log(reqPath);

  fetch(reqPath, reqObj).then(handlers.success).catch(handlers.failure);
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

