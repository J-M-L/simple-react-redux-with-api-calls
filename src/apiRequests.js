const apiRequests = {
  get: {
    handler: (name, path, axiosInstance) => async (id, dispatch) => {
      const { data } = await axiosInstance.get(`${path}/${id}`);
      dispatch({ type: `${name}/get`, value: data });
    },
  },
  getAll: {
    handler: (name, path, axiosInstance) => async (dispatch) => {
      const { data } = await axiosInstance.get(path);
      console.log(data);
      dispatch({ type: `${name}/getAll`, value: data });
    },
  },
  add: {
    handler: (name, path, axiosInstance) => async (newItem, dispatch) => {
      const { data } = await axiosInstance.post(path, newItem);
      dispatch({ type: `${name}/add`, value: data });
    },
  },
  update: {
    handler: (name, path, axiosInstance) => async (id, newItem, dispatch) => {
      const { data } = await axiosInstance.patch(`${path}/${id}`, newItem);
      dispatch({ type: `${name}/update`, value: data });
    },
  },
  replace: {
    handler: (name, path, axiosInstance) => async (id, newItem, dispatch) => {
      const { data } = await axiosInstance.put(`${path}/${id}`, newItem);
      dispatch({ type: `${name}/replace`, value: data });
    },
  },
  delete: {
    handler: (name, path, axiosInstance) => async (id, dispatch) => {
      const { data } = await axiosInstance.delete(`${path}/${id}`);
      dispatch({ type: `${name}/delete`, value: data });
    },
  },
};

module.exports = apiRequests;
