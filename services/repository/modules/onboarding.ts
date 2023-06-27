import { AxiosPromise } from 'axios';
import HttpFactory from '../HttpFactory';
import { IBusinessDetail, IResponseResult, IUser, IPersonalDetail } from '~~/types/api';

class OnboardingModule extends HttpFactory {
  private RESOURCE = '/onboard';

  async business(details: IBusinessDetail): AxiosPromise<IResponseResult<IUser>> {
    return await this.call(`${this.RESOURCE}/business`, 'POST', details);
  }

  async personal(details: IPersonalDetail): AxiosPromise<IResponseResult<IUser>> {
    return await this.call(`${this.RESOURCE}/personal`, 'POST', details);
  }
}

export default OnboardingModule;
