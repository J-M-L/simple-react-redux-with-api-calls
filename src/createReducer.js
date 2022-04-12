/* eslint-disable default-param-last */
const initialState = {
  all: [],
  current: {},
};

let toBeUpdated;
let editedAll;

const Reducer = (name) => (state = initialState, action) => {
  const oldState = { ...state };

  switch (action.type) {
    case `${name}/get`:
      oldState.current = action.value;
      break;
    case `${name}/getAll`:
      oldState.all = action.value;
      break;
    case `${name}/add`:
      oldState.all = [...oldState.all, action.value];
      break;
    case `${name}/update`:
      editedAll = [...oldState.all];
      toBeUpdated = editedAll.find((item) => item._id === action.value._id);
      Object.entries(action.value).forEach(([key, value]) => { toBeUpdated[key] = value; });
      oldState.all = editedAll;
      break;
    case `${name}/replace`:
      editedAll = oldState.all.filter((item) => item._id !== action.value._id);
      editedAll.push(action.value);
      oldState.all = editedAll;
      break;
    case `${name}/delete`:
      oldState.all = oldState.all.filter((item) => item._id !== action.value._id);
      break;
    default:
      break;
  }
  return oldState;
};

module.exports = Reducer;
