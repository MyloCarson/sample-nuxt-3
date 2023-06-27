import { AxiosPromise } from 'axios';
import HttpFactory from '../HttpFactory';
import { ApiQuery, ICreateOrder, IOrder, IResponseResult } from '~~/types/api';
import { DEFAULT_API_QUERY } from '~~/services/constants';

class DispatchModule extends HttpFactory {
  private RESOURCE = '/order';

  async all(query: ApiQuery = DEFAULT_API_QUERY): AxiosPromise<IResponseResult<IOrder[]>> {
    const queryString = this.makeQuery(query);
    return await this.call(`${this.RESOURCE}/get${queryString}`, 'GET');
  }

  async create(order: ICreateOrder): AxiosPromise<IResponseResult<IOrder>> {
    return await this.call(`${this.RESOURCE}/create`, 'POST', order);
  }

  async updateStatus(orderId: string, status: string): AxiosPromise<IResponseResult<null>> {
    return await this.call(`${this.RESOURCE}/update/${orderId}`, 'PUT', { status });
  }
}

export default DispatchModule;
