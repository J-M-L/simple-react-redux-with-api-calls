const apiRequests = require('./apiRequests');

const createDispatchers = (name, path, wantedEndpoints, axiosInstance) => {
  const dispatchers = {};
  wantedEndpoints.forEach((we) => {
    if (apiRequests[we]) {
      dispatchers[we] = apiRequests[we].handler(name, path, axiosInstance);
    }
  });
  return dispatchers;
};

module.exports = createDispatchers;
