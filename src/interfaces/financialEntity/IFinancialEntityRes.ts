import IFinancialEntity from "./IFinancialEntity";

export default interface IFinancialEntityRes {
  data: IFinancialEntity[];
  nextCursor: number | null;
}
