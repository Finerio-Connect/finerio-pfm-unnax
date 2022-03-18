import ITransaction from "./ITransaction";

export default interface ITransactionRes {
  data: ITransaction[];
  nextCursor: number | null;
}
