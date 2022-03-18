import ITransaction from "../transaction/ITransaction";

export default interface ITransactionsByDate {
  date: number;
  transactions: ITransaction[];
}
