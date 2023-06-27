import { AxiosPromise } from 'axios';
import HttpFactory from '../HttpFactory';
import { IResponseResult, IBilling } from '@/types/api';

class BillingModule extends HttpFactory {
  async get(): AxiosPromise<IResponseResult<IBilling>> {
    return await this.call(`billing/get`, 'GET');
  }

  async deleteCard(): AxiosPromise<IResponseResult<null>> {
    return await this.call('/card-delete', 'DELETE');
  }

  async updateCard(): AxiosPromise<IResponseResult<{ link: string }>> {
    return await this.call('/card-update', 'GET');
  }
}

export default BillingModule;
