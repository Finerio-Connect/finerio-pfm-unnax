import FinerioConnectSDK from "../finerioConnectSDK";
import { IAnalysisResponse, IResumeResponse } from "../interfaces/insights";
import { Analysis, Resume } from "../models";

export default class Insights {
  private resumePath: string = "/f4f8faab7f280eaf05fc812c285c7902f6a6d05a";
  private analysisPath: string = "/824aa15eed3dfc815bd0bec5c34354d471a44557";

  constructor(public fcSdk: FinerioConnectSDK) {}

  resume(
    userId: number,
    accountId?: number,
    dateFrom?: number,
    dateTo?: number
  ) {
    const uri = `${this.resumePath}?userId=${userId}${
      accountId ? `?accountId=${accountId}` : ""
    }${dateFrom ? `?dateFrom=${dateFrom}` : ""}${
      dateTo ? `?accountId=${dateTo}` : ""
    }`;

    return this.fcSdk.doGet(uri, this.processResumeResponse);
  }

  private processResumeResponse(response: IResumeResponse) {
    return new Resume(response);
  }

  analysis(
    userId: number,
    accountId?: number,
    dateFrom?: number,
    dateTo?: number
  ) {
    const uri = `${this.analysisPath}?userId=${userId}${
      accountId ? `?accountId=${accountId}` : ""
    }${dateFrom ? `?dateFrom=${dateFrom}` : ""}${
      dateTo ? `?accountId=${dateTo}` : ""
    }`;

    return this.fcSdk.doGet(uri, this.processAnalysisResponse);
  }

  private processAnalysisResponse(response: IAnalysisResponse) {
    return response.data.map((res) => new Analysis(res));
  }
}
