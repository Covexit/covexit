import axios from 'axios';
import { useUserContext } from '../context/UserContext';
import React, { useEffect } from 'react';
import i18n from 'i18n';
import { useToastContext } from '../context/ToastContext';
import { useTranslation } from 'react-i18next';


const axiosInstance = axios.create({
  baseURL: '/api/v1/',
  responseType: 'json',
});

function endpointTransform(endpoint, id) {
  let needle = '$id';
  if (!id)
    needle = '$id/';
  return endpoint.replace(needle, id || '');
}

function createEndpoint(endpoint, instance) {
  return {
    get: (id) => instance.get(endpointTransform(endpoint, id)),
    put: (id, data, config) => instance.put(endpointTransform(endpoint, id), data, config),
    patch: (id, data, config) => instance.patch(endpointTransform(endpoint, id), data, config),
    post: (data, config, id) => instance.post(endpointTransform(endpoint, id), data, config),
  }
}

function createHyperlinkedEndpoint(endpoint) {
  return {
    get: ({ id, url }) => axios.get(url || `/api/v1/${endpointTransform(endpoint, id)}`),
    patch: ({ id, url, data, config }) => axios.patch(url || `/api/v1/${endpointTransform(endpoint, id)}`, data, config),
    post: ({ data, config, id }) => axios.post(`/api/v1/${endpointTransform(endpoint, id)}`, data, config),
  }
}

const useApi = () => {
  const { setToast } = useToastContext();
  const [t] = useTranslation();
  const { token } = useUserContext();

  const axiosInstance = axios.create({
    baseURL: '/api/v1/',
    responseType: 'json',
  });

  if (token) {
    axiosInstance.interceptors.request.use(config => {
      return { ...config, headers: { 'Authorization': `Token ${token}`, ...config.headers } };
    })
  }

  axiosInstance.interceptors.request.use(config => {
    return { ...config, headers: { 'Accept-Language': i18n.language } };
  });

  axiosInstance.interceptors.response.use(res => res, err => {
    switch (err.response.status) {
      case 404:
        setToast({ message: t('notFoundError'), type: 'error' })
        break;

      case 401:
        setToast({ message: t('unauthorizedError'), type: 'error' })
        break;

      default:
        if (err.response.data) {
          const strings = Object.values(err.response.data).flat();
          setToast({ message: strings.map(str => <>{str}<br/></>), type: 'error' })
          break;
        }

      // eslint-disable-next-line no-fallthrough
      case 500:
        setToast({ message: t('serverError'), type: 'error' })
        break;
    }
    throw err
  });

  const API = React.useMemo(() => ({
    categories: createHyperlinkedEndpoint('categories/'),
    register: { post: (data) => axiosInstance.post('register/', data) },
    verify: { post: (data, type) => axiosInstance.post(`verify/${type}/`, data) },
    mailingList: { post: (data) => axiosInstance.post('mailing-list/', data) },
    partners: createEndpoint('admin/partners/$id/', axiosInstance),
    productList: { get: (partnerId) => axiosInstance.get(`products/${partnerId && '?partner=' + partnerId}`) },
    products: createHyperlinkedEndpoint('admin/products/$id/'),
    productImages: createEndpoint('admin/products/$id/images/', axiosInstance),
    authToken: { post: (data) => axiosInstance.post(`api-token-auth/`, data) },
  }), []);

  return { API, axiosInstance };
}


export default useApi;
