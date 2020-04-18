import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api/v1/',
  responseType: 'json'
});

function createEndpoint(endpoint) {
  return {
    get: (id) => axiosInstance.get(`${endpoint}/${id ? id : ''}/`),
    put: (id, data, config) => axiosInstance.put(`${endpoint}/${id ? id : ''}/`, data, config),
    patch: (id, data, config) => axiosInstance.patch(`${endpoint}/${id ? id : ''}/`, data, config),
    post: (data, config) => axiosInstance.post(`${endpoint}/`, data, config),
  }
}

function createHyperlinkedEndpoint(endpoint) {
  return {
    get: ({id, url}) => axios.get(url || `/api/v1/${endpoint}/${id ? id : ''}/`),
  }
}

const API = {
  company: createEndpoint('company'),
  product: createEndpoint('product'),
  categories: createHyperlinkedEndpoint('categories'),
  register: { post: (data) => axiosInstance.post('register/', data) },
  verify: { post: (data) => axiosInstance.post('verify/', data) },
  partners: createEndpoint('admin/partners'),
};

export { axiosInstance };
export default API;
