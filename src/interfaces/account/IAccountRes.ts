import IAccount from "./IAccount";

export default interface IAccountRes {
  data: IAccount[];
  nextCursor: number | null;
}
