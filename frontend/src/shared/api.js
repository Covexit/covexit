import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api/v1/',
  responseType: 'json'
});

function endpointTransform(endpoint, id) {
  let needle = '$id';
  if (!id)
    needle = '$id/';
  return endpoint.replace(needle, id || '');
}

function createEndpoint(endpoint) {
  return {
    get: (id) => axiosInstance.get(endpointTransform(endpoint, id)),
    put: (id, data, config) => axiosInstance.put(endpointTransform(endpoint, id), data, config),
    patch: (id, data, config) => axiosInstance.patch(endpointTransform(endpoint, id), data, config),
    post: (data, config, id) => axiosInstance.post(endpointTransform(endpoint, id), data, config),
  }
}

function createHyperlinkedEndpoint(endpoint) {
  return {
    get: ({id, url}) => axios.get(url || `/api/v1/${endpointTransform(endpoint, id)}`),
    patch: ({id, url, data, config}) => axios.patch(url || `/api/v1/${endpointTransform(endpoint, id)}`, data, config),
    post: ({data, config, id}) => axios.post(`/api/v1/${endpointTransform(endpoint, id)}`, data, config),
  }
}

const API = {
  categories: createHyperlinkedEndpoint('categories/'),
  register: { post: (data) => axiosInstance.post('register/', data) },
  verify: { post: (data, type) => axiosInstance.post(`verify/${type}/`, data) },
  mailingList: { post: (data) => axiosInstance.post('mailing-list/', data) },
  partners: createEndpoint('admin/partners/$id/'),
  products: createHyperlinkedEndpoint('admin/products/$id/'),
  productImages: createEndpoint('admin/products/$id/images/'),
  users: { get: (data) => axiosInstance.get('admin/users/', data)},
  authToken: { post: (data) => axiosInstance.post(`api-token-auth/`, data) }
};

export { axiosInstance };
export default API;
