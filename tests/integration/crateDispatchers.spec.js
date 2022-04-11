/* eslint-disable max-len */
/* eslint-disable object-curly-newline */
/* eslint-disable global-require */
let createDispatchers;
let getRequest;
let getAllRequest;
let postRequest;
let patchRequest;
let putRequest;
let deleteRequest;
let dispatch;

describe('createDispatchers', () => {
  beforeAll(() => {
    createDispatchers = require('../../src/createDispatchers');

    getRequest = jest.fn(() => ({ data: 'someGetData' }));
    getAllRequest = jest.fn();
    postRequest = jest.fn(() => ({ data: 'somePostData' }));
    patchRequest = jest.fn();
    putRequest = jest.fn();
    deleteRequest = jest.fn();
  });
  it.each(Object.entries({
    get: {
      name: 'get',
      path: 'http://localhost/api/test',
      id: 'someId',
      body: undefined,
      wantedEndpoints: ['get'],
      axiosInstance: { get: (path) => getRequest(path) },
      request: () => getRequest,
      expectedDispatch: { type: 'get/get', value: 'someGetData' },
    },
    post: {
      name: 'add',
      path: 'http://localhost/api/test',
      id: undefined,
      body: { newItem: 'newPostItem' },
      wantedEndpoints: ['add'],
      axiosInstance: { post: (path, newItem) => postRequest(path, newItem) },
      request: () => postRequest,
      expectedDispatch: { type: 'add/add', value: 'somePostData' },
    },
  }))('should return correct dispatchers: %s', async (testName, { name, path, id, body, wantedEndpoints, request, axiosInstance, expectedDispatch }) => {
    const requestUrl = id ? `${path}/${id}` : path;
    const res = createDispatchers(name, path, wantedEndpoints, axiosInstance);

    dispatch = jest.fn();
    if (body) {
      await res[name](body, dispatch);
      expect(request()).toBeCalledWith(requestUrl, body);
    } else {
      await res[name](id, dispatch);
      expect(request()).toBeCalledWith(requestUrl);
    }
    expect(dispatch).toBeCalledWith(expectedDispatch);
  });
});
