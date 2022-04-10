import createReducer from './createReducer';
import createDispatchers from './createDispatchers';

const SRRWAC = (name, axiosInstance, path, wantedEndpoints) => {
  const Reducer = createReducer(name);
  Object.defineProperty(Reducer, 'name', { value: name });

  const Dispatchers = createDispatchers(name, path, wantedEndpoints, axiosInstance);

  return {
    Reducer,
    Dispatchers,
  };
};

export default SRRWAC;
