import { AxiosPromise } from 'axios';
import HttpFactory from '../HttpFactory';
import { ICreateStrategy, IStrategy, IResponseResult, ApiQuery } from '@/types/api';
import { DEFAULT_API_QUERY } from '~~/services/constants';

class DeliveryStrategyModule extends HttpFactory {
  private RESOURCE = '/delivery-strategy';

  async create(strategy: ICreateStrategy): AxiosPromise<IResponseResult<IStrategy>> {
    return await this.call(`${this.RESOURCE}/create`, 'POST', strategy);
  }

  async all(query: ApiQuery = DEFAULT_API_QUERY): AxiosPromise<IResponseResult<IStrategy[]>> {
    const queryString = this.makeQuery(query);
    return await this.call(`${this.RESOURCE}/get${queryString}`, 'GET');
  }

  async get(id: string): AxiosPromise<IResponseResult<IStrategy>> {
    return await this.call(`${this.RESOURCE}/get/${id}`, 'GET');
  }
}

export default DeliveryStrategyModule;
