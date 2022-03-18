import ITransaction from "../transaction/ITransaction";
import ITransactionsByDate from "./ITransactionsByDate";

export default interface ISubcategory {
  categoryId: number;
  amount: number;
  average?: number;
  quantity?: number;
  transactionsByDate?: ITransactionsByDate[];
  transactions?: ITransaction[];
}
