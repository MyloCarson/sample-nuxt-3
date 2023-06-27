import { AxiosPromise } from 'axios';
import HttpFactory from '../HttpFactory';
import { IAuthData, ICreateAccountResponse, IResponseResult } from '~~/types/api';
import { Credentials, ResetPasswordInput, VerifyCredentials } from '~~/types';

class AuthModule extends HttpFactory {
  private RESOURCE = '/auth';

  async signUp(credentials: Credentials): AxiosPromise<IResponseResult<ICreateAccountResponse>> {
    return await this.call(`${this.RESOURCE}/signup`, 'POST', credentials);
  }

  async verifyEmail(credentials: VerifyCredentials): AxiosPromise<IResponseResult<IAuthData>> {
    return await this.call(`${this.RESOURCE}/confirm-email`, 'POST', credentials);
  }

  async login(credentials: Credentials): AxiosPromise<IResponseResult<IAuthData>> {
    return await this.call(`${this.RESOURCE}/signin`, 'POST', credentials);
  }

  async forgotPassword(email: string): AxiosPromise<IResponseResult<null>> {
    return await this.call(`${this.RESOURCE}/request-password-reset`, 'POST', { email });
  }

  async reset(credentials: ResetPasswordInput): AxiosPromise<IResponseResult<IAuthData>> {
    return await this.call(`${this.RESOURCE}/request-password-confirm`, 'POST', credentials);
  }
}

export default AuthModule;
