import axios from 'axios';
import { useUserContext } from '../context/UserContext';

const useApi = () => {
  const { token } = useUserContext();
  const axiosInstance = axios.create({
    baseURL: '/api/v1/',
    responseType: 'json',

  });

  axiosInstance.interceptors.request.use(config => {
    if (token)
      config = {...config, headers: { 'Authorization': `Token ${token}` }};
    return config;
  })

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
      get: ({ id, url }) => axios.get(url || `/api/v1/${endpointTransform(endpoint, id)}`),
      patch: ({ id, url, data, config }) => axios.patch(url || `/api/v1/${endpointTransform(endpoint, id)}`, data, config),
      post: ({ data, config, id }) => axios.post(`/api/v1/${endpointTransform(endpoint, id)}`, data, config),
    }
  }

  const API = {
    categories: createHyperlinkedEndpoint('categories/'),
    register: { post: (data) => axiosInstance.post('register/', data) },
    verify: { post: (data, type) => axiosInstance.post(`verify/${type}/`, data) },
    mailingList: { post: (data) => axiosInstance.post('mailing-list/', data) },
    partners: createEndpoint('admin/partners/$id/'),
    productList: { get: (partnerId) => axiosInstance.get(`products/${partnerId && '?partner=' + partnerId}`) },
    products: createHyperlinkedEndpoint('admin/products/$id/'),
    productImages: createEndpoint('admin/products/$id/images/'),
    authToken: { post: (data) => axiosInstance.post(`api-token-auth/`, data) },
  };

  return { API, axiosInstance };
}


export default useApi;
