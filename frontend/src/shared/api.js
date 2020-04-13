import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api/v1/',
  responseType: 'json'
});

function createEndpoint(endpoint) {
  return {
    get: (id) => axiosInstance.get(`${endpoint}/${id ? id : ''}/`),
    put: (id, data) => axiosInstance.put(`${endpoint}/${id ? id : ''}/`, data),
    post: (data) => axiosInstance.post(`${endpoint}/`, data),
  }
}

const API = {
  company: createEndpoint('company'),
  product: createEndpoint('product'),
  productCategory: createEndpoint('product-category'),
  register: { post: (data) => axiosInstance.post('register/', data) },
};

export { axiosInstance };
export default API;
