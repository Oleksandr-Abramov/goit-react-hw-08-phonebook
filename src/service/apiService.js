import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

export const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = token;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

export const registerUser = data => {
  return axios.post(`/users/signup`, data).then(({ data }) => {
    token.set(data.token);
    // console.log('resp', data);
    return data;
  });
};

export const loginUser = dataUser => {
  return axios.post(`/users/login`, dataUser).then(({ data }) => {
    token.set(data.token);
    // console.log('resp', data);
    return data;
  });
};

export const logOutUser = () => {
  return axios.post(`/users/logout`).then(({ data }) => {
    token.unset();
    // console.log('resp', data);
    return data;
  });
};
export const fetchCurrentUser = () => {
  return axios.get(`/users/current`).then(({ data }) => {
    console.log('resp fetchCurrentUser', data);
    return data;
  });
};

export const getContacts = () => {
  return axios.get(`/contacts`).then(({ data }) => data);
};

export const addContacts = dataContact =>
  axios.post('/contacts', dataContact).then(({ data }) => {
    // console.log('~ data addContacts', data);
    return data;
  });

export const deleteContacts = id =>
  axios.delete(`/contacts/${id}`).then(response => {
    // console.log('~ response deleteContacts', response);
    return id;
  });
