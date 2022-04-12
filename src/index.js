const createReducer = require('./createReducer');
const createDispatchers = require('./createDispatchers');

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
