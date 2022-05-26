import FinerioConnectSDK from "../finerioConnectSDK";
import { IListOptions, ITransaction, ITransactionRes } from "../interfaces";
import { Transaction } from "../models";
import { TransactionPayload } from "../payloads";

export default class Transactions {
  private path: string = "/transactions";

  constructor(public fcSdk: FinerioConnectSDK) {}

  private processResponse(response: ITransaction): Transaction {
    return new Transaction(response);
  }

  private processDeleteResponse(status: string): number {
    return status === "" ? 204 : 500;
  }

  private processListResponseBuild(
    accountId: number
  ): (response: ITransactionRes) => Transaction[] {
    return (response: ITransactionRes): Transaction[] => {
      if (!response.data) {
        return [];
      }
      return response.data.map(
        (transaction) => new Transaction({ ...transaction, accountId })
      );
    };
  }

  /*  */

  get(id: number): Promise<ITransaction> {
    return this.fcSdk.doGet(`${this.path}/${id}`, this.processResponse);
  }

  update(id: number, updateObject?: TransactionPayload): Promise<Transaction> {
    return this.fcSdk.doPut(
      `${this.path}/${id}`,
      updateObject ? updateObject.plainObject : {},
      this.processResponse
    );
  }

  create(transactionToCreate: TransactionPayload): Promise<Transaction> {
    return this.fcSdk.doPost(
      this.path,
      transactionToCreate.plainObject,
      this.processResponse
    );
  }

  delete(id: number): Promise<ITransaction> {
    return this.fcSdk.doDelete(
      `${this.path}/${id}`,
      this.processDeleteResponse
    );
  }

  list(accountId: number, listOptions?: IListOptions): Promise<Transaction[]> {
    const uri = `${this.path}?accountId=${accountId}`;
    if (!listOptions) {
      return this.fcSdk.doGet(uri, this.processListResponseBuild(accountId));
    }
    const {
      categoryId,
      description,
      charge,
      minAmount,
      maxAmount,
      dateFrom,
      dateTo,
      cursor,
    } = listOptions;
    const newUri = `${uri}${categoryId ? `&categoryId=${categoryId}` : ""}${
      description ? `&description=${description}` : ""
    }${charge ? `&charge=${charge}` : ""}${
      minAmount ? `&minAmount=${minAmount}` : ""
    }${maxAmount ? `&maxAmount=${maxAmount}` : ""}${
      dateFrom ? `&dateFrom=${dateFrom}` : ""
    }${dateTo ? `&dateTo=${dateTo}` : ""}${cursor ? `&cursor=${cursor}` : ""}`;
    return this.fcSdk.doGet(newUri, this.processListResponseBuild(accountId));
  }
}
