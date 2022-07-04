import axios, { AxiosError, AxiosRequestHeaders, AxiosInstance } from "axios";

import Error from "../error";
import {
  ACCOUNT_TYPE,
  CATEGORY_TYPE,
  FINANCIAL_ENTITY_TYPE,
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
import FinancialEntities from "../financialEntities/index";
import Login from "../models/Login";
import { LoginResponse } from "../interfaces/login/LoginResponse";

interface IClassesDictionary {
  Accounts?: Accounts;
  Categories?: Categories;
  Transactions?: Transactions;
  Budgets?: Budgets;
  Insights?: Insights;
  FinancialEntities?: FinancialEntities;
}

interface IConnectParams {
  includes?: string | string[];
  sandbox?: boolean;
}

export default class FinerioConnectSDK {
  private _includedClasses: string[];
  private _apiToken: string = "";
  private _apiKey: string = "";
  private _baseURL: string = "";
  private _refreshToken: string = "";
  private _sandbox: boolean;
  private _axiosApiInstance: AxiosInstance;
  private _tokenExpiresDate: Date | null = null;
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
      this._baseURL = SERVER_URL_SAND;
    } else {
      this._baseURL = SERVER_URL_PROD;
    }
    this._axiosApiInstance = axios.create({
      baseURL: this._baseURL,
    });
    this._axiosApiInstance.interceptors.request.use(
      async (config) => {
        if (this._apiToken && this._tokenExpiresDate) {
          if (Date.now() >= this._tokenExpiresDate.getTime()) {
            await this.refreshApiToken();
          }
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${this._apiToken}`,
          };
        }
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );
    this._axiosApiInstance.interceptors.response.use(
      (response) => {
        return response.data;
      },
      async (error) => {
        const originalRequest = error.config;
        if (
          this.refreshToken &&
          error.response.status === 401 &&
          this._refreshToken &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;
          await this.refreshApiToken();
          /* this._axiosApiInstance.defaults.headers.common["Authorization"] =
            "Bearer " + access_token; */
          return this._axiosApiInstance(originalRequest);
        }
        return Promise.reject(error);
      }
    );
  }

  public connect(apiKey?: string): IClassesDictionary {
    if (apiKey) {
      this._apiKey = apiKey;
    }
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
          case FINANCIAL_ENTITY_TYPE:
            return { ...acc, FinancialEntities: new FinancialEntities(this) };
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
      FinancialEntities: new FinancialEntities(this)
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
        .then((response) => resolve(success(response)))
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
          resolve(success(response));
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
        .then((response) => resolve(success(response)))
        .catch((error) => this.processErrors(error, reject));
    });
  }

  public doDelete(uri: string, success: (response: any) => any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this._axiosApiInstance
        .delete(uri)
        .then((response) => resolve(success(response)))
        .catch((error) => this.processErrors(error, reject));
    });
  }

  private setNewAccessData(data: LoginResponse) {
    const { access_token, refresh_token, expires_in } = data;
    const currentTimeAsMs = Date.now();
    this._apiToken = access_token;
    this._refreshToken = refresh_token;
    this._tokenExpiresDate = new Date(currentTimeAsMs + expires_in);
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
          this.setNewAccessData(response);
          resolve(this.connect());
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  public refreshApiToken(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const uri = `${this._baseURL}/oauth/access_token?refresh_token=${this._refreshToken}`;
      axios
        .post(uri, "", {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${this._apiToken}`,
          },
        })
        .then(({ data }) => {
          this.setNewAccessData(data);
          resolve(true);
        })
        .catch((error) => {
          reject(
            new Error(
              `${error.response.status}`,
              error.response.data.path,
              error.response.data.error
            )
          );
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
    if (errors.errors)
      errors.errors.forEach((error) => {
        errorsList.push(new Error(error.code, error.title, error.detail));
      });
    else if (errors.error)
      errorsList.push(
        new Error(`${errors.status}`, errors.error, `${errors.path}`)
      );

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
