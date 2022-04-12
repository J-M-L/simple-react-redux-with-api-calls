/* eslint-disable max-len */
/* eslint-disable object-curly-newline */
/* eslint-disable global-require */
let createReducer;
const name = 'name';

describe('createDispatchers', () => {
  beforeAll(() => {
    createReducer = require('../../src/createReducer');
  });
  it.each(Object.entries({
    'nothing changes': {
      initialState: { all: ['nothing'], current: { empty: 1 } },
      action: { type: `${name}/notexisting`, value: { newValue: 1 } },
      expectedState: { all: ['nothing'], current: { empty: 1 } },
    },
    'type get': {
      initialState: { all: ['nothing'], current: { empty: 1 } },
      action: { type: `${name}/get`, value: { newValue: 1 } },
      expectedState: { all: ['nothing'], current: { newValue: 1 } },
    },
    'type getAll': {
      initialState: { all: ['nothing'], current: { empty: 1 } },
      action: { type: `${name}/getAll`, value: [{ newValue: 1 }] },
      expectedState: { all: [{ newValue: 1 }], current: { empty: 1 } },
    },
    'type add': {
      initialState: { all: ['nothing'], current: { empty: 1 } },
      action: { type: `${name}/add`, value: { newValue: 1 } },
      expectedState: { all: ['nothing', { newValue: 1 }], current: { empty: 1 } },
    },
    'type update': {
      initialState: { all: [{ _id: 'someid', someValue: 12, otherValue: 1 }], current: { empty: 1 } },
      action: { type: `${name}/update`, value: { _id: 'someid', someValue: 55 } },
      expectedState: { all: [{ _id: 'someid', someValue: 55, otherValue: 1 }], current: { empty: 1 } },
    },
    'type replace': {
      initialState: { all: [{ _id: 'someid', someValue: 12, otherValue: 1 }], current: { empty: 1 } },
      action: { type: `${name}/replace`, value: { _id: 'someid', someValue: 55 } },
      expectedState: { all: [{ _id: 'someid', someValue: 55 }], current: { empty: 1 } },
    },
    'type delete': {
      initialState: { all: [{ _id: 'someid', someValue: 12, otherValue: 1 }], current: { empty: 1 } },
      action: { type: `${name}/delete`, value: { _id: 'someid' } },
      expectedState: { all: [], current: { empty: 1 } },
    },
    'initial state from module': {
      initialState: undefined,
      action: { },
      expectedState: { all: [], current: { empty: 1 } },
    },
    'initial state from module 2': {
      initialState: undefined,
      action: { type: `${name}/add`, value: { newValue: 1 } },
      expectedState: { all: [{ newValue: 1 }], current: { empty: 1 } },
    },
  }))('should return correct new state with: %s', async (testName, { initialState, action, expectedState }) => {
    const reducer = createReducer(name);
    const newState = reducer(initialState, action);

    expect(expectedState).toMatchObject(newState);
  });
});
