import axios from 'axios';

axios.defaults.baseURL = 'https://62efc7a48d7bc7c2eb7fe4b3.mockapi.io/contacts';

export const getContacts = () => {
  return axios.get(``).then(({ data }) => data);
};

export const addContacts = data =>
  axios.post('', data).then(response => {
    return response;
  });

export const deleteContacts = id =>
  axios.delete(`/${id}`).then(response => {
    return response.data;
  });
