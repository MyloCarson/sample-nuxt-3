import { AxiosPromise } from 'axios';
import HttpFactory from '../HttpFactory';
import { ApiQuery, IHook, IResponseResult, IWebHook } from '~~/types/api';
import { DEFAULT_API_QUERY } from '~~/services/constants';

class WebhookModule extends HttpFactory {
  private RESOURCE = '/webhook';

  async create(hook: IHook): AxiosPromise<IResponseResult<IWebHook>> {
    return await this.call(`${this.RESOURCE}/create`, 'POST', hook);
  }

  async all(query: ApiQuery = DEFAULT_API_QUERY): AxiosPromise<IResponseResult<IWebHook[]>> {
    const queryString = this.makeQuery(query);
    return await this.call(`${this.RESOURCE}/get${queryString}`, 'GET');
  }

  async get(id: string): AxiosPromise<IResponseResult<IWebHook>> {
    return await this.call(`${this.RESOURCE}/get/${id}`, 'GET');
  }
}

export default WebhookModule;
