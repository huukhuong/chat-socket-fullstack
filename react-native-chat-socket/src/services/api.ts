import { ResponseModel } from '@models/ResponseModel';
import Constants from '@utils/constants';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import Toast from 'react-native-toast-message';

class Api {
  private axiosInstance: AxiosInstance;
  private token: string = '';
  private readonly timeout: number = 30000;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: Constants.API_URL,
      timeout: this.timeout,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
  }

  public updateBearerToken(token: string) {
    this.token = token;

    this.axiosInstance.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${token}`;

    this.axiosInstance.interceptors.request.use(config => {
      config.headers.Authorization = token ? `Bearer ${token}` : '';
      return config;
    });
  }

  public async get<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<ResponseModel<T | null> | null> {
    config = {
      ...config,
      headers: { Authorization: `Bearer ${this.token}` },
    };

    try {
      const response = await this.axiosInstance.get(url, config);

      console.log('====================================');
      console.log('[GET]', this.axiosInstance.defaults.baseURL + url);
      if (config?.params) {
        console.log('Params:\n' + JSON.stringify(config?.params, null, 2));
      }
      console.log('Response:\n' + JSON.stringify(response.data));
      console.log('====================================');

      if (!response.data.isSuccess) {
        this.handleError(response.data);
      }
      return response.data;
    } catch (error: any) {
      this.handleError(error);
      return null;
    }
  }

  public async post<T>(
    url: string,
    params?: any,
    config?: AxiosRequestConfig,
  ): Promise<ResponseModel<T | null> | null> {
    config = {
      ...config,
      headers: { Authorization: `Bearer ${this.token}` },
    };

    try {
      const response = await this.axiosInstance.post(url, params, config);

      console.log('====================================');
      console.log('[POST]', this.axiosInstance.defaults.baseURL + url);
      if (params) {
        console.log('Body:\n' + JSON.stringify(params));
      }
      console.log('Response:\n' + JSON.stringify(response.data));
      console.log('====================================');

      if (!response.data.isSuccess) {
        this.handleError(response.data);
      }
      return response.data;
    } catch (error: any) {
      this.handleError(error);
      return null;
    }
  }

  private handleError(error: any) {
    console.log('====================================');
    console.log('[FETCH ERROR]', JSON.stringify(error, null, 2));
    console.log('====================================');

    if (error.response) {
      const json: any = error.response.data;
      if (json) {
        console.log('error.response', json);

        if (json.code === 401) {
          // logout
        }

        if (json.message) {
          this.showErrorToast(json.message);
        }
      } else {
        this.showErrorToast(`${error.name}: ${error.message}`);
      }
    } else {
      const message = `${error.message}`;
      console.log('[AXIOS ERROR MESSAGE]', message);

      if (message.includes(`${this.timeout}ms`)) {
        this.showErrorToast(
          `Mạng yếu, vui lòng kểm tra lại kết nối.\n\n${message}`,
        );
      } else if (message.includes('ERR_NETWORK')) {
        this.showErrorToast(
          `Lỗi mạng, vui lòng kết nối mạng và thử lại.\n\n${message}`,
        );
      } else {
        this.showErrorToast(`${message}`);
      }
    }
  }

  private showErrorToast(message: string) {
    setTimeout(() => {
      Toast.show({
        type: 'error',
        text2: `${message}`,
        text2Style: { color: '#333' },
      });
    }, 300);
  }
}

const api = new Api();
export default api;
