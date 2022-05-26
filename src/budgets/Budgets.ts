import FinerioConnectSDK from "../finerioConnectSDK";
import { IBudget, IBudgetsRes } from "../interfaces";
import { Budget } from "../models";
import { BudgetPayload } from "../payloads";

export default class Budgets {
  path: string = "/budgets";

  constructor(public fcSdk: FinerioConnectSDK) {}

  get(id: number): Promise<IBudget> {
    const uri = `${this.path}/${id}`;

    return this.fcSdk.doGet(uri, this.processResponse);
  }

  update(id: number, updateObject: BudgetPayload): Promise<IBudget> {
    const uri = `${this.path}/${id}`;

    return this.fcSdk.doPut(
      uri,
      updateObject.plainObject,
      this.processResponse
    );
  }

  create(createBudget: BudgetPayload): Promise<IBudget> {
    const uri = `${this.path}`;

    return this.fcSdk.doPost(
      uri,
      createBudget.plainObject,
      this.processResponse
    );
  }

  private processResponse(response: IBudget): Budget {
    return new Budget(response);
  }

  delete(id: number): Promise<IBudget> {
    const uri = `${this.path}/${id}`;

    return this.fcSdk.doDelete(uri, this.processDeleteResponse);
  }

  private processDeleteResponse(status: string): number {
    return status === "" ? 204 : 500;
  }

  list(cursor?: number): Promise<any> {
    const uri = `${this.path}${cursor ? `?userId=${cursor}` : ""}`;
    return this.fcSdk.doGet(uri, this.processlistResponse);
  }

  private processlistResponse(response: IBudgetsRes): Budget[] {
    return response.data
      ? response.data.reverse().map((bud) => new Budget(bud))
      : [];
  }
}
