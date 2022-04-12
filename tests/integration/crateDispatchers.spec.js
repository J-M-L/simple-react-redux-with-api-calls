/* eslint-disable max-len */
/* eslint-disable object-curly-newline */
/* eslint-disable global-require */
let createDispatchers;
let getRequest;
let postRequest;
let patchRequest;
let putRequest;
let deleteRequest;
let dispatch;

const axiosInstance = () => {};
axiosInstance.get = (path) => getRequest(path);
axiosInstance.post = (path, newItem) => postRequest(path, newItem);
axiosInstance.patch = (path, newItem) => patchRequest(path, newItem);
axiosInstance.put = (path, newItem) => putRequest(path, newItem);
axiosInstance.delete = (path) => deleteRequest(path);

describe('createDispatchers', () => {
  beforeAll(() => {
    createDispatchers = require('../../src/createDispatchers');

    getRequest = jest.fn(() => ({ data: 'someGetData' }));
    postRequest = jest.fn(() => ({ data: 'somePostData' }));
    patchRequest = jest.fn(() => ({ data: 'somePatchData' }));
    putRequest = jest.fn(() => ({ data: 'somePutData' }));
    deleteRequest = jest.fn(() => ({ data: 'someDeleteData' }));
  });
  it.each(Object.entries({
    get: {
      name: 'get',
      path: 'http://localhost/api/test',
      id: 'someId',
      body: undefined,
      wantedEndpoints: ['get'],
      request: () => getRequest,
      expectedDispatch: { type: 'get/get', value: 'someGetData' },
    },
    getAll: {
      name: 'getAll',
      path: 'http://localhost/api/test',
      id: undefined,
      body: undefined,
      wantedEndpoints: ['getAll'],
      request: () => getRequest,
      expectedDispatch: { type: 'getAll/getAll', value: 'someGetData' },
    },
    add: {
      name: 'add',
      path: 'http://localhost/api/test',
      id: undefined,
      body: { newItem: 'newPostItem' },
      wantedEndpoints: ['add'],
      request: () => postRequest,
      expectedDispatch: { type: 'add/add', value: 'somePostData' },
    },
    update: {
      name: 'update',
      path: 'http://localhost/api/test',
      id: 'someId',
      body: { newItem: 'newPatchItem' },
      wantedEndpoints: ['update'],
      request: () => patchRequest,
      expectedDispatch: { type: 'update/update', value: 'somePatchData' },
    },
    replace: {
      name: 'replace',
      path: 'http://localhost/api/test',
      id: 'someId',
      body: { newItem: 'newPatchItem' },
      wantedEndpoints: ['replace'],
      request: () => putRequest,
      expectedDispatch: { type: 'replace/replace', value: 'somePutData' },
    },
    delete: {
      name: 'delete',
      path: 'http://localhost/api/test',
      id: 'someId',
      body: undefined,
      wantedEndpoints: ['delete'],
      request: () => deleteRequest,
      expectedDispatch: { type: 'delete/delete', value: 'someDeleteData' },
    },
  }))('should return correct dispatchers: %s', async (testName, { name, path, id, body, wantedEndpoints, request, expectedDispatch }) => {
    const requestUrl = id ? `${path}/${id}` : path;
    const res = createDispatchers(name, path, wantedEndpoints, axiosInstance);

    dispatch = jest.fn();
    if (body && id) {
      await res[name](id, body, dispatch);
      expect(request()).toBeCalledWith(requestUrl, body);
    } else if (body) {
      await res[name](body, dispatch);
      expect(request()).toBeCalledWith(requestUrl, body);
    } else if (id) {
      await res[name](id, dispatch);
      expect(request()).toBeCalledWith(requestUrl);
    } else {
      await res[name](dispatch);
      expect(request()).toBeCalledWith(requestUrl);
    }
    expect(dispatch).toBeCalledWith(expectedDispatch);
  });
  it('should return empty object with unexisting endpoints', () => {
    const res = createDispatchers('someName', 'somePath', ['notExisting'], () => {});
    expect({}).toMatchObject(res);
  });
});
