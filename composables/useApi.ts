import axios, { AxiosError, AxiosRequestHeaders } from 'axios';
import { AUTH_DATA } from '~~/services/constants';
import { useRootStore } from '~~/store';
import { IAuthData, IResponseResult } from '~~/types/api';

import AuthModule from '~~/services/repository/modules/auth';
import DashboardModule from '~~/services/repository/modules/dashboard';
import OnboardingModule from '~~/services/repository/modules/onboarding';
import TransactionModule from '~~/services/repository/modules/transaction';
import WebhookModule from '~~/services/repository/modules/webhook';
import DeliveryStrategyModule from '~~/services/repository/modules/strategy';
import DispatchModule from '~~/services/repository/modules/dispatch';
import BillingModule from '~~/services/repository/modules/billing';

interface ApiInstance {
  auth: AuthModule;
  billing: BillingModule;
  dashboard: DashboardModule;
  dispatch: DispatchModule;
  onboard: OnboardingModule;
  strategy: DeliveryStrategyModule;
  transaction: TransactionModule;
  webhook: WebhookModule;
}

const config = useRuntimeConfig();
const toast = useToast();
const { getErrorMessage } = useUtils();

const axiosInstance = axios.create({
  baseURL: `${config.public.apiUrl}/internal/api/v1`,
  headers: {
    'Content-Type': 'application/json'
  },
  validateStatus(status) {
    return status < 300;
  }
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    const authData = useCookie<IAuthData>(AUTH_DATA);
    // Do something before request is sent
    // add token to request
    if (authData && authData.value && authData.value.access_token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${authData.value.access_token}`
      } as AxiosRequestHeaders;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // const originalRequest = error.config as AxiosRequestConfig & { _retry: boolean}

    // if( error.response?.status === 401  && !originalRequest._retry ) {
    //   originalRequest._retry = true;

    //   try {
    //     const { data } = await axios.post<IResponseResult<IAuthData>>(`${config.public.apiUrl}/internal/api/v1/auth/refresh`,
    //     {refresh_token: authData.value.refresh_token},
    //       {
    //       headers: {
    //         Authorization: `Bearer ${authData.value.access_token}`
    //       }
    //     })

    //     const { access_token, refresh_token, user}  = data.data
    //     authSetup(access_token, refresh_token, user)

    //     axiosInstance.defaults.headers.common.Authorization = `Bearer ${access_token}` ;

    //     const headers = { ...originalRequest.headers, Authorization: `Bearer ${access_token}` } as AxiosRequestHeaders
    //     originalRequest.headers = headers

    //     console.log(originalRequest)

    //     // console.log('first')
    //     return axiosInstance(originalRequest)

    //   } catch(refreshError) {
    //     return Promise.reject(refreshError)
    //   }
    // }
    if (error.response?.status === 401) {
      // console.log(error.response)
      const rootStore = useRootStore();
      rootStore.$reset();
      const response = error.response.data as IResponseResult<null>;
      toast.error(response.message);
    } else if (error.response?.status === 418) {
      toast.info('Subscription inactive. Kindly subscribe or contact support');
    } else {
      const { message } = getErrorMessage(error);
      toast.error(message);
    }
    return Promise.reject(error);
  }
);

export default function useApi(): ApiInstance {
  return {
    auth: new AuthModule(axiosInstance),
    billing: new BillingModule(axiosInstance),
    dashboard: new DashboardModule(axiosInstance),
    dispatch: new DispatchModule(axiosInstance),
    onboard: new OnboardingModule(axiosInstance),
    strategy: new DeliveryStrategyModule(axiosInstance),
    transaction: new TransactionModule(axiosInstance),
    webhook: new WebhookModule(axiosInstance)
  };
}
