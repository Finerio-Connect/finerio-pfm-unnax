import FinerioConnectSDK from "../finerioConnectSDK";
import { IAccount, IAccountRes } from "../interfaces";
import { Account } from "../models";
import { AccountPayload } from "../payloads";

export default class Accounts {
  private path: string = "/ddde998e39f1892650715c23817c09e102ac1ec4";

  constructor(public fcSdk: FinerioConnectSDK) {}

  private processResponse(response: IAccount): Account {
    return new Account(response);
  }

  private processDeleteResponse(status: string): number {
    return status === "" ? 204 : 500;
  }

  private processListResponse(response: IAccountRes): Account[] {
    if (!response.data) {
      return [];
    }
    return response.data.map((account: IAccount) => new Account(account));
  }

  get(id: number): Promise<IAccount> {
    return this.fcSdk.doGet(`${this.path}/${id}`, this.processResponse);
  }

  update(id: number, updateObject?: AccountPayload): Promise<Account> {
    return this.fcSdk.doPut(
      `${this.path}/${id}`,
      updateObject ? updateObject.plainObject : {},
      this.processResponse
    );
  }

  create(accountToCreate: AccountPayload): Promise<Account> {
    return this.fcSdk.doPost(
      this.path,
      accountToCreate.plainObject,
      this.processResponse
    );
  }

  delete(id: number): Promise<IAccount> {
    return this.fcSdk.doDelete(
      `${this.path}/${id}`,
      this.processDeleteResponse
    );
  }

  list(userId: number, cursor?: number): Promise<Account[]> {
    const uri = `${this.path}?userId=${userId}${
      cursor ? `&cursor=${cursor}` : ""
    }`;
    return this.fcSdk.doGet(uri, this.processListResponse);
  }
}
