import { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios';
import { ApiQuery, IResponseResult } from '~~/types/api';

type MethodType = 'POST' | 'DELETE' | 'GET' | 'PUT';
type K = (url: string, data?: any | undefined, config?: AxiosRequestConfig<any>) => Promise<any>;

class HttpFactory {
  private $axios: AxiosInstance;
  private methods: Record<MethodType, K>;

  constructor(axios: AxiosInstance) {
    this.$axios = axios;

    this.methods = {
      POST: axios.post,
      GET: axios.get,
      DELETE: axios.delete,
      PUT: axios.put
    };
  }

  private getMethod(methodName: MethodType) {
    return this.methods[methodName];
  }

  protected makeQuery(query: ApiQuery): string {
    return useBuildQuery(query as Record<string, string>);
  }

  protected async call<T>(url: string, method: MethodType, data?: object, options?: object) {
    const axios$ = this.getMethod(method);
    const res: AxiosPromise<IResponseResult<T>> = await axios$(url, data, options);
    return res;
  }
}

export default HttpFactory;
