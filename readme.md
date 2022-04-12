# Simple react redux with api calls
This is:
- Made to ease the creation of redux stores with api calls
- Super easy way to create Reducer and dispacthers
- Package with zero production dependencies
- Package with some kind of mongoose sanitization

Currently this only allows the use of pre-defined endpoints (listed at the end), but maybe in a near future there's a possibility to add endpoints, and maybe some validators too.

## The guide

Install this package with
```sh
npm install @j-m-l/simple-react-redux-with-api-calls
```

Import it to the project with
```js
const SMEE = require('@j-m-l/simple-react-redux-with-api-calls');
```

Call it with following values (existing endpoints listed below)
```js
const { Reducer, Dispatchers } = SRRWAC(ReducerName, apiPath, wantedEndpoints, axiosInstance);
```

Example code

testReducer.js
```js
import SRRWAC from '@j-m-l/simple-react-redux-with-api-calls';
import axios from 'axios';

const test = SRRWAC('test', 'http://localhost:3001/api/test', ['get', 'getAll', 'replace', 'delete', 'add', 'update'], axios);

export const Reducer = test.Reducer;
export const Dispatchers = test.Dispatchers;
```

store.js
```js
import { createStore, combineReducers } from 'redux'
import { Reducer } from './testreducer';

const reducers = combineReducers({
  test: Reducer,
});

const store = createStore(
  reducers
);

export default store
```

index.js
```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={ store }>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
```

App.js
```js
import React from 'react'
import { useSelector, useDispatch  } from 'react-redux'
import { Dispatchers } from './testreducer';

function App() {
  const dispatch = useDispatch();

  const addEntry = () => {
    Dispatchers.add({ name: 'jeejee', desc: 'jotain' }, dispatch);
  }
  const getAll = () => {
    Dispatchers.getAll(dispatch);
  }

  const all = useSelector(state => state.test.all);
  console.log('store', all);

  return (
    <div className="App">
      <nav>
        <section>
          <h1>something { JSON.stringify(all, null, 2) }</h1>
          <button onClick={addEntry}>lisää</button>
          <button onClick={getAll}>getAll</button>
        </section>
      </nav>
    </div>
  )
}

export default App
```

This can be combined with https://www.npmjs.com/package/@j-m-l/simple-mongo-express-endpoints to make simple Fullstack apps

Available endpoints are: 
- get (Get by id /api/something/:id) http get
- getAll (Get all entried from that collection) http get
- add (Add new entry to the collection) http post
- update (Partially update the entry from collection) http patch
- replace (Replace the entry from the collection) http put
- delete (Delete entry from the collection) http delete

To select these to the wantedEndpoints, just add the wanted endpoint names to an array i.e., ['get', 'getAll', 'add', 'update', 'replace', 'delete']

