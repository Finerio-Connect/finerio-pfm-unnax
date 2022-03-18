import { ISubcategory } from "../../interfaces/insights";
import Transaction from "../Transaction";
import TransactionsByDate from "./TransactionsByDate";

export default class Subcategory implements ISubcategory {
  private _categoryId: number;
  private _amount: number;
  private _average?: number;
  private _quantity?: number;
  private _transactionsByDate?: TransactionsByDate[];
  private _transactions?: Transaction[];

  constructor({
    categoryId,
    amount,
    average,
    quantity,
    transactionsByDate,
    transactions,
  }: ISubcategory) {
    this._categoryId = categoryId;
    this._amount = amount;
    this._average = average;
    this._quantity = quantity;
    this._transactionsByDate = transactionsByDate
      ? transactionsByDate.map(
          (transaction) => new TransactionsByDate(transaction)
        )
      : [];
    this._transactions = transactions
      ? transactions.map((transaction) => new Transaction(transaction))
      : [];
  }

  public get categoryId(): number {
    return this._categoryId;
  }
  public get amount(): number {
    return this._amount;
  }
  public get average(): number | undefined {
    return this._average;
  }
  public get quantity(): number | undefined {
    return this._quantity;
  }
  public get transactionsByDate(): TransactionsByDate[] | undefined {
    return this._transactionsByDate;
  }
  public get transactions(): Transaction[] | undefined {
    return this._transactions;
  }
}
