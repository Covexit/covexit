import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api/v1/',
  responseType: 'json'
});

function createEndpoint(endpoint) {
  return {
    get: (id) => axiosInstance.get(endpoint.replace('$id', id || '')),
    put: (id, data, config) => axiosInstance.put(endpoint.replace('$id', id || ''), data, config),
    patch: (id, data, config) => axiosInstance.patch(endpoint.replace('$id', id || ''), data, config),
    post: (data, config, id) => axiosInstance.post(endpoint.replace('$id', id || ''), data, config),
  }
}

function createHyperlinkedEndpoint(endpoint) {
  return {
    get: ({id, url}) => axios.get(url || `/api/v1/${endpoint.replace('$id', id || '')}`),
    patch: ({id, url, data, config}) => axios.patch(url || `/api/v1/${endpoint.replace('$id', id || '')}`, data, config),
    post: ({data, config, id}) => axios.post(`/api/v1/${endpoint.replace('$id', id || '')}`, data, config),
  }
}

const API = {
  company: createEndpoint('company/'),
  product: createEndpoint('product/'),
  categories: createHyperlinkedEndpoint('categories/'),
  register: { post: (data) => axiosInstance.post('register/', data) },
  verify: { post: (data) => axiosInstance.post('verify/', data) },
  partners: createEndpoint('admin/partners/$id/'),
  products: createHyperlinkedEndpoint('admin/products/$id/'),
  productImages: createEndpoint('admin/products/$id/images/'),
};

export { axiosInstance };
export default API;
