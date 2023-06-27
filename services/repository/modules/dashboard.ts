import { AxiosPromise } from 'axios';
import HttpFactory from '../HttpFactory';
import { IResponseResult, ITestMode } from '@/types/api';

class DashboardModule extends HttpFactory {
  async toggleTestMode(status: boolean): AxiosPromise<IResponseResult<ITestMode>> {
    const payload: ITestMode = { test_mode: status };
    return await this.call(`/mode/switch`, 'POST', payload);
  }
}

export default DashboardModule;
