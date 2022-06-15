import FinerioConnectSDK from "../finerioConnectSDK";
import { IFinancialEntity, IFinancialEntityRes } from "../interfaces";
import { FinancialEntity } from "../models";
import { FinancialEntityPayload } from "../payloads";

export default class FinancialEntitites {
  private path: string = "/financial-entities";

  constructor(public fcSdk: FinerioConnectSDK) {}

  private processResponse(response: IFinancialEntity): FinancialEntity {
    return new FinancialEntity(response);
  }

  private processDeleteResponse(status: string): number {
    return status === "" ? 204 : 500;
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

  update(id: number, updateObject?: FinancialEntityPayload): Promise<FinancialEntity> {
    return this.fcSdk.doPut(
      `${this.path}/${id}`,
      updateObject ? updateObject.plainObject : {},
      this.processResponse
    );
  }

  create(financialEntityToCreate: FinancialEntityPayload): Promise<FinancialEntity> {
    return this.fcSdk.doPost(
      this.path,
      financialEntityToCreate.plainObject,
      this.processResponse
    );
  }

  delete(id: number): Promise<IFinancialEntity> {
    return this.fcSdk.doDelete(
      `${this.path}/${id}`,
      this.processDeleteResponse
    );
  }

  list(cursor: number): Promise<FinancialEntity[]> {
    const uri = `${this.path}?cursor=${cursor}`;
    return this.fcSdk.doGet(uri, this.processListResponse);
  }
}
