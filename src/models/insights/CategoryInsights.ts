import { ICategoryInsights } from "../../interfaces/insights";
import Transaction from "../Transaction";
import Subcategory from "./Subcategory";

export default class CategoryInsights implements ICategoryInsights {
  private _categoryId: number;
  private _amount: number;
  private _average?: number;
  private _quantity?: number;
  private _subcategories?: Subcategory[];
  private _transactions?: Transaction[];

  constructor({
    categoryId,
    amount,
    average,
    quantity,
    subcategories,
    transactions,
  }: ICategoryInsights) {
    this._categoryId = categoryId;
    this._amount = amount;
    this._average = average;
    this._quantity = quantity;
    this._subcategories = subcategories
      ? subcategories.map((subcat) => new Subcategory(subcat))
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
  public get subcategories(): Subcategory[] | undefined {
    return this._subcategories;
  }
  public get transactions(): Transaction[] | undefined {
    return this._transactions;
  }
}
