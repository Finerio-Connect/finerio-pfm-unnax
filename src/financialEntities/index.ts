import FinerioConnectSDK from "../finerioConnectSDK";
import { IFinancialEntity, IFinancialEntityRes } from "../interfaces";
import { FinancialEntity } from "../models";

export default class FinancialEntitites {
  private path: string = "/financialEntities";

  constructor(public fcSdk: FinerioConnectSDK) {}

  private processResponse(response: IFinancialEntity): FinancialEntity {
    return new FinancialEntity(response);
  }

  private processListResponse(response: IFinancialEntityRes): FinancialEntity[] {
    if (!response.data) {
      return [];
    }
    return response.data.map((financialEntity: IFinancialEntity) => new FinancialEntity(financialEntity));
  }

  get(id: number): Promise<IFinancialEntity> {
    return this.fcSdk.doGet(`${this.path}/${id}`, this.processResponse);
  }

  list(): Promise<FinancialEntity[]> {
    const uri = `${this.path}`;
    return this.fcSdk.doGet(uri, this.processListResponse);
  }
}
