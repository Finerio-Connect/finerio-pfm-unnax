import axios, { AxiosError, AxiosRequestHeaders, AxiosInstance } from "axios";

import Error from "../error";
import {
  ACCOUNT_TYPE,
  CATEGORY_TYPE,
  TRANSACTION_TYPE,
  BUDGET_TYPE,
  INSIGHTS_TYPE,
  SERVER_URL_SAND,
  SERVER_URL_PROD,
} from "../constants";
import { IErrorResponse } from "../interfaces";
import Categories from "../categories/Categories";
import Budgets from "../budgets/Budgets";
import Accounts from "../accounts";
import Transactions from "../transactions/Transactions";
import Insights from "../insights/Insights";
import Login from "../models/Login";
import { LoginResponse } from "../interfaces/login/LoginResponse";

interface IClassesDictionary {
  Accounts?: Accounts;
  Categories?: Categories;
  Transactions?: Transactions;
  Budgets?: Budgets;
  Insights?: Insights;
}

interface IConnectParams {
  includes?: string | string[];
  sandbox?: boolean;
}

export default class FinerioConnectSDK {
  private _includedClasses: string[];
  private _apiToken: string = "";
  private _refreshToken: string = "";
  private _sandbox: boolean;
  private _axiosApiInstance: AxiosInstance;
  constructor(arg?: IConnectParams | string[] | string) {
    this._includedClasses = [];
    this._sandbox = false;
    if (arg) {
      if (Array.isArray(arg) || typeof arg === "string") {
        this._includedClasses = this.getIncludedClasses(arg);
      } else if (typeof arg === "object") {
        if (arg.includes) {
          this._includedClasses = this.getIncludedClasses(arg.includes);
        }
        if (arg.sandbox) {
          this._sandbox = arg.sandbox;
        }
      }
    }

    if (this._sandbox) {
      this._axiosApiInstance = axios.create({
        baseURL: SERVER_URL_SAND,
      });
    } else {
      this._axiosApiInstance = axios.create({
        baseURL: SERVER_URL_PROD,
      });
    }
  }

  public connect(apiToken: string, refreshToken: string): IClassesDictionary {
    this._apiToken = apiToken;
    this._refreshToken = refreshToken;
    this._axiosApiInstance.interceptors.request.use(
      (config) => {
        config.headers = {
          Authorization: `Bearer ${apiToken}`,
        };
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );

    /* this._axiosApiInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 403 && !originalRequest._retry) {
          originalRequest._retry = true;
          const access_token = await refreshAccessToken();
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + access_token;
          return this._axiosApiInstance(originalRequest);
        }
        return Promise.reject(error);
      }
    ); */

    if (this._includedClasses.length) {
      return this._includedClasses.reduce((acc, current) => {
        switch (current) {
          case ACCOUNT_TYPE:
            return { ...acc, Accounts: new Accounts(this) };
          case CATEGORY_TYPE:
            return { ...acc, Categories: new Categories(this) };
          case BUDGET_TYPE:
            return { ...acc, Budgets: new Budgets(this) };
          case TRANSACTION_TYPE:
            return { ...acc, Transactions: new Transactions(this) };
          case INSIGHTS_TYPE:
            return { ...acc, Insights: new Insights(this) };
          default:
            return acc;
        }
      }, {});
    }
    return {
      Accounts: new Accounts(this),
      Categories: new Categories(this),
      Transactions: new Transactions(this),
      Budgets: new Budgets(this),
      Insights: new Insights(this),
    };
  }

  private getIncludedClasses = (
    arg?: string[] | string | IConnectParams
  ): string[] => {
    if (arg) {
      if (Array.isArray(arg)) {
        return arg;
      }
      if (typeof arg === "string") {
        return [arg];
      }
    }
    return [];
  };

  get apiToken(): string {
    return this._apiToken;
  }

  get refreshToken(): string {
    return this._refreshToken;
  }

  public doGet(uri: string, success: (response: any) => any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this._axiosApiInstance
        .get(uri)
        .then((response) => resolve(success(response.data)))
        .catch((error) => this.processErrors(error, reject));
    });
  }

  public doPost(
    uri: string,
    body: any,
    success: (response: any) => any
  ): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this._axiosApiInstance
        .post(uri, body)
        .then((response) => {
          resolve(success(response.data));
        })
        .catch((error) => this.processErrors(error, reject));
    });
  }

  public doPut(
    uri: string,
    body: any,
    success: (response: any) => any
  ): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this._axiosApiInstance
        .put(uri, body)
        .then((response) => resolve(success(response.data)))
        .catch((error) => this.processErrors(error, reject));
    });
  }

  public doDelete(uri: string, success: (response: any) => any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this._axiosApiInstance
        .delete(uri)
        .then((response) => resolve(success(response.data)))
        .catch((error) => this.processErrors(error, reject));
    });
  }

  public login(
    username: string,
    password: string,
    clientId: number
  ): Promise<IClassesDictionary> {
    return new Promise((resolve, reject) => {
      const uri = `/login`;
      this.doPost(uri, { username, password, clientId }, this.processLogin)
        .then((response) => {
          const { access_token, refresh_token } = response;
          resolve(this.connect(access_token, refresh_token));
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  private processLogin(response: LoginResponse): Login {
    return new Login(response);
  }

  private processErrors(
    error: AxiosError,
    reject: { (reason?: any): void; (arg0: AxiosError<any, any>): void }
  ) {
    if (
      error.response &&
      error.response.data &&
      error.response.status !== 500
    ) {
      reject(this.createErrorBadRequest(error.response?.data));
    } else if (error.response && error.response.status) {
      reject(this.createErrorResObject(error));
    } else {
      reject(this.createErrorObject(error));
    }
  }

  private createErrorBadRequest(errors: IErrorResponse) {
    const errorsList: Error[] = [];

    errors.errors.forEach((error) => {
      errorsList.push(new Error(error.code, error.title, error.detail));
    });

    return errorsList;
  }

  private createErrorResObject(axiosError: AxiosError) {
    const { response: error } = axiosError;
    return new Error(
      `${error!.status}`,
      error!.statusText!,
      error!.status === 404 ? "The item you requested was not found" : ""
    );
  }

  private createErrorObject(error: AxiosError) {
    return new Error(`${error.code}`, "", "");
  }
}
