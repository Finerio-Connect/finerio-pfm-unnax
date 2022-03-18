import FinerioConnectSDK from "../finerioConnectSDK";
import { IBudget, IBudgetsRes } from "../interfaces";
import { Budget } from "../models";
import { BudgetPayload } from "../payloads";

export default class Budgets {
  path: string = "/205e33ba58fee3ee07ef1a8cccc4ba9b97d3caf2";

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

  list(userId: number): Promise<any> {
    const uri = `${this.path}${`?userId=${userId}`}`;
    return this.fcSdk.doGet(uri, this.processlistResponse);
  }

  private processlistResponse(response: IBudgetsRes): Budget[] {
    return response.data
      ? response.data.reverse().map((bud) => new Budget(bud))
      : [];
  }
}
