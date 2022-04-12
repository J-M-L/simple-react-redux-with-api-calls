/* eslint-disable max-len */
/* eslint-disable object-curly-newline */
/* eslint-disable global-require */
const { createStore } = require('redux');

let SRRWAC;
let getRequest;
let postRequest;
let patchRequest;
let putRequest;
let deleteRequest;

const axiosInstance = () => {};
axiosInstance.get = (path) => getRequest(path);
axiosInstance.post = (path, newItem) => postRequest(path, newItem);
axiosInstance.patch = (path, newItem) => patchRequest(path, newItem);
axiosInstance.put = (path, newItem) => putRequest(path, newItem);
axiosInstance.delete = (path) => deleteRequest(path);

describe('simpleReactReduxWithApiCalls', () => {
  beforeAll(() => {
    SRRWAC = require('../../../src/index');

    getRequest = jest.fn(() => ({ data: { _id: 'someid', value: 'someGetData' } }));
    postRequest = jest.fn(() => ({ data: { _id: 'someid', value: 'somePostData' } }));
    patchRequest = jest.fn(() => ({ data: { _id: 'someid', value: 'somePatchData' } }));
    putRequest = jest.fn(() => ({ data: { _id: 'someid', value: 'somePutData' } }));
    deleteRequest = jest.fn(() => ({ data: { _id: 'someid', value: 'someDeleteData' } }));
  });

  it('should return reducer and dispatchers with get and add', () => {
    const resp = SRRWAC('testName', 'http://testpath/something', ['get', 'add'], axiosInstance);
    expect(typeof resp.Reducer).toBe('function');
    expect(typeof resp.Dispatchers).toBe('object');
    expect(typeof resp.Dispatchers.get).toBe('function');
    expect(typeof resp.Dispatchers.add).toBe('function');
  });

  it('should return reducer and dispatchers with all endpoints', () => {
    const resp = SRRWAC('testName', 'http://testpath/something', ['get', 'getAll', 'replace', 'delete', 'add', 'update'], axiosInstance);
    expect(typeof resp.Reducer).toBe('function');
    expect(typeof resp.Dispatchers).toBe('object');
    expect(typeof resp.Dispatchers.get).toBe('function');
    expect(typeof resp.Dispatchers.getAll).toBe('function');
    expect(typeof resp.Dispatchers.replace).toBe('function');
    expect(typeof resp.Dispatchers.delete).toBe('function');
    expect(typeof resp.Dispatchers.add).toBe('function');
    expect(typeof resp.Dispatchers.update).toBe('function');
  });

  it('should return valid reducer for Redux store', () => {
    const resp = SRRWAC('testName', 'http://testpath/something', ['get', 'getAll', 'replace', 'delete', 'add', 'update'], axiosInstance);

    const store = createStore(resp.Reducer);

    expect(typeof store.dispatch).toBe('function');
    expect(typeof store.subscribe).toBe('function');
    expect(typeof store.getState).toBe('function');
    expect(typeof store.replaceReducer).toBe('function');
    expect(typeof store).toBe('object');

    expect({ all: [], current: {} }).toMatchObject(store.getState());
  });

  it('should return functioning dispatchers', async () => {
    const { Reducer, Dispatchers } = SRRWAC('testName', 'http://testpath/something', ['get', 'getAll', 'replace', 'delete', 'add', 'update'], axiosInstance);

    const store = createStore(Reducer);
    expect({ all: [], current: {} }).toMatchObject(store.getState());

    await Dispatchers.add({ something: 1 }, store.dispatch);
    expect({ all: [{ _id: 'someid', value: 'somePostData' }], current: {} }).toMatchObject(store.getState());

    await Dispatchers.get({ newItem: 1 }, store.dispatch);
    expect({ all: [{ _id: 'someid', value: 'somePostData' }], current: { _id: 'someid', value: 'someGetData' } }).toMatchObject(store.getState());

    await Dispatchers.update('someid', { someobject: 1 }, store.dispatch);
    expect({ all: [{ _id: 'someid', value: 'somePatchData' }], current: { _id: 'someid', value: 'someGetData' } }).toMatchObject(store.getState());

    await Dispatchers.replace('someid', { someobject: 1 }, store.dispatch);
    expect({ all: [{ _id: 'someid', value: 'somePutData' }], current: { _id: 'someid', value: 'someGetData' } }).toMatchObject(store.getState());

    await Dispatchers.delete('someid', store.dispatch);
    expect({ all: [], current: { _id: 'someid', value: 'someGetData' } }).toMatchObject(store.getState());

    await Dispatchers.getAll(store.dispatch);
    expect({ all: { _id: 'someid', value: 'someGetData' }, current: { _id: 'someid', value: 'someGetData' } }).toMatchObject(store.getState());
  });
});
