const createReducer = require('./createReducer');
const createDispatchers = require('./createDispatchers');

/**
 * Creates Redux store with dispatchers with api calls included
 * @param {String} name Name of the reducer
 * @param {String} path API path
 * @param {Array} wantedEndpoints Array of wanted endpoints
 * @param {Function} axiosInstance Axios instance
 * @returns {Object} Reducer and Dispatchers
 */
const SRRWAC = (name, path, wantedEndpoints, axiosInstance) => {
  const Reducer = createReducer(name);
  Object.defineProperty(Reducer, 'name', { value: name });

  const Dispatchers = createDispatchers(name, path, wantedEndpoints, axiosInstance);

  return {
    Reducer,
    Dispatchers,
  };
};

module.exports = SRRWAC;
