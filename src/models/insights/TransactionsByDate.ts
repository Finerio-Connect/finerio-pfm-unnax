import { ITransactionsByDate } from "../../interfaces/insights";
import Transaction from "../Transaction";

export default class TransactionsByDate implements ITransactionsByDate {
  private _date: number;
  private _transactions: Transaction[];

  constructor({ date, transactions }: ITransactionsByDate) {
    this._date = date;
    this._transactions = transactions.map(
      (transaction) => new Transaction(transaction)
    );
  }

  public get date(): number {
    return this._date;
  }

  public get transactions(): Transaction[] {
    return this._transactions;
  }
}
