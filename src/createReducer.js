const initialState = {
  all: [],
  current: {},
};

const Reducer = (name) => (state = initialState, action) => {
  let oldState = { ...state };

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
      const toBeUpdated = oldState.all.find((item) => item._id === action.value._id);
      Object.entries(action.value).forEach(([key, value]) => toBeUpdated[key] = value);
      break;
    case `${name}/replace`:
      const toBeReplaced = oldState.all.find((item) => item._id === action.value._id);
      Object.entries(action.value).forEach(([key, value]) => toBeReplaced[key] = value);
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
