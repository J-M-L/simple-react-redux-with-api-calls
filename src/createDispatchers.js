const apiRequests = require('./apiRequests');
const { validateInputOrThrow } = require('./validate');

const createDispatchers = (name, path, wantedEndpoints, axiosInstance) => {
  validateInputOrThrow('name', name, 'string');
  validateInputOrThrow('path', path, 'string');
  validateInputOrThrow('wantedEndpoints', wantedEndpoints, 'array');
  validateInputOrThrow('axiosInstance', axiosInstance, 'function');

  const dispatchers = {};
  wantedEndpoints.forEach((we) => {
    if (apiRequests[we]) {
      dispatchers[we] = apiRequests[we].handler(name, path, axiosInstance);
    }
  });
  return dispatchers;
};

module.exports = createDispatchers;
