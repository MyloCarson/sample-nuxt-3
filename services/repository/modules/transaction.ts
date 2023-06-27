import { AxiosPromise } from 'axios';
import HttpFactory from '../HttpFactory';
import { ApiQuery, IResponseResult, ITransaction } from '~~/types/api';
import { DEFAULT_API_QUERY } from '~~/services/constants';

class TransactionModule extends HttpFactory {
  private RESOURCE = '/transactions';

  async all(query: ApiQuery = DEFAULT_API_QUERY): AxiosPromise<IResponseResult<ITransaction[]>> {
    const queryString = this.makeQuery(query);
    return await this.call(`${this.RESOURCE}${queryString}`, 'GET');
  }
}

export default TransactionModule;
