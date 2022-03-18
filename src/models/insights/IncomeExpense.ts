import { IIncomeExpense } from "../../interfaces/insights";
import CategoryInsights from "./CategoryInsights";

export default class IncomeExpense implements IIncomeExpense {
  private _date: number;
  private _categories: CategoryInsights[];
  private _amount: number;

  constructor({ date, categories, amount }: IIncomeExpense) {
    this._date = date;
    this._categories = categories.map((cat) => new CategoryInsights(cat));
    this._amount = amount;
  }

  public get date(): number {
    return this._date;
  }
  public get categories(): CategoryInsights[] {
    return this._categories;
  }

  public get amount(): number {
    return this._amount;
  }
}
