import FinerioConnectSDK from "../finerioConnectSDK";
import { IAnalysisResponse, IResumeResponse } from "../interfaces/insights";
import { Analysis, Resume } from "../models";

export default class Insights {
  private resumePath: string = "/resume";
  private analysisPath: string = "/analysis";

  constructor(public fcSdk: FinerioConnectSDK) {}

  resume(accountId?: number, dateFrom?: number, dateTo?: number) {
    const uri = `${this.resumePath}${
      accountId ? `?accountId=${accountId}` : ""
    }${dateFrom ? `&dateFrom=${dateFrom}` : ""}${
      dateTo ? `&dateTo=${dateTo}` : ""
    }`;

    return this.fcSdk.doGet(uri, this.processResumeResponse);
  }

  private processResumeResponse(response: IResumeResponse) {
    return new Resume(response);
  }

  analysis(dateFrom?: number, dateTo?: number) {
    const uri = `${this.analysisPath}${
      dateFrom ? `?dateFrom=${dateFrom}` : ""
    }${dateTo ? `&dateTo=${dateTo}` : ""}`;

    return this.fcSdk.doGet(uri, this.processAnalysisResponse);
  }

  private processAnalysisResponse(response: IAnalysisResponse) {
    return response.data.map((res) => new Analysis(res));
  }
}
