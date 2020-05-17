import axios from 'axios';
import { TrackJS } from 'trackjs';
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

function createEndpoint(endpoint) {
  return {
    get: (id) => axiosInstance.get(endpointTransform(endpoint, id)),
    put: (id, data, config) => axiosInstance.put(endpointTransform(endpoint, id), data, config),
    patch: (id, data, config) => axiosInstance.patch(endpointTransform(endpoint, id), data, config),
    post: (data, id) => axiosInstance.post(endpointTransform(endpoint, id), data),
  }
}

function createHyperlinkedEndpoint(endpoint) {
  return {
    get: ({ id, url }) => axiosInstance.get(url || endpointTransform(endpoint, id)),
    patch: ({ id, url, data, config }) => axiosInstance.patch(url || endpointTransform(endpoint, id), data, config),
    post: ({ data, id }) => axiosInstance.post(endpointTransform(endpoint, id), data),
  }
}

const useApi = () => {
  const { setToast } = useToastContext();
  const [t] = useTranslation();
  const { token } = useUserContext();

  useEffect(() => {
    let interceptor;
    if (token) {
      interceptor = axiosInstance.interceptors.request.use(config => {
        return { ...config, headers: { 'Authorization': `Token ${token}`, ...config.headers } };
      })
    }
    return () => {
      if (interceptor) {
        axiosInstance.interceptors.request.eject(interceptor);
      }
    }
  }, [token])

  useEffect(() => {
    axiosInstance.interceptors.request.use(config => {
      return { ...config, headers: { 'Accept-Language': i18n.language.toLowerCase() } };
    });
  }, [])


  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(res => res, err => {
      if (process.env.NODE_ENV === 'production') {
        TrackJS.console.log({
          url: err.response.url,
          status: err.response.status,
          statusText: err.response.statusText,
          request: err.response.data,
        });

        TrackJS.track(err.response.status + " " + err.response.statusText + ": " + err.response.url);
      }

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

    return () => {
      if (interceptor) {
        axiosInstance.interceptors.response.eject(interceptor);
      }
    }
  }, [setToast, t])

  const API = React.useMemo(() => ({
    categories: createHyperlinkedEndpoint('categories/'),
    register: { post: (data) => axiosInstance.post('register/', data) },
    verify: { post: (data, type) => axiosInstance.post(`verify/${type}/`, data) },
    mailingList: { post: (data) => axiosInstance.post('mailing-list/', data) },
    partners: createEndpoint('admin/partners/$id/'),
    productList: { get: (partnerId) => axiosInstance.get(`products/${partnerId && '?partner=' + partnerId}`) },
    products: createHyperlinkedEndpoint('admin/products/$id/'),
    productImages: createEndpoint('admin/products/$id/images/'),
    authToken: { post: (data) => axiosInstance.post(`api-token-auth/`, data) },
  }), []);

  return { API, axiosInstance };
}


export default useApi;
