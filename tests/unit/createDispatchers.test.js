/* eslint-disable object-curly-newline */
/* eslint-disable global-require */
let createDispatchers;
describe('createDispatchers', () => {
  beforeEach(() => {
    jest.resetModules();
    createDispatchers = require('../../src/createDispatchers');
  });

  it.each(Object.entries({
    'name is not defined': {
      name: '',
      path: 'path',
      wantedEndpoints: ['wanted'],
      axiosInstance: () => {},
      errorMessage: 'name is not defined',
    },
    'path is not defined': {
      name: 'name',
      path: '',
      wantedEndpoints: ['wanted'],
      axiosInstance: () => {},
      errorMessage: 'path is not defined',
    },
    'wantedEndpoints is not defined': {
      name: 'name',
      path: 'path',
      wantedEndpoints: undefined,
      axiosInstance: () => {},
      errorMessage: 'wantedEndpoints is not defined',
    },
    'wantedEndpointsis wrong type': {
      name: 'name',
      path: 'path',
      wantedEndpoints: 'wanted',
      axiosInstance: () => {},
      errorMessage: 'Type of wantedEndpoints is wrong, it should be array',
    },
    'axiosInstance is not defined': {
      name: 'name',
      path: 'path',
      wantedEndpoints: ['wanted'],
      axiosInstance: undefined,
      errorMessage: 'axiosInstance is not defined',
    },
    'axiosInstance is wrong type': {
      name: 'name',
      path: 'path',
      wantedEndpoints: ['wanted'],
      axiosInstance: 'axios',
      errorMessage: 'Type of axiosInstance is wrong, it should be function',
    },
  }))('should throw an error when %s', (testname, { name, path, wantedEndpoints, axiosInstance, errorMessage }) => {
    expect(() => createDispatchers(name, path, wantedEndpoints, axiosInstance)).toThrow(errorMessage);
  });
});
