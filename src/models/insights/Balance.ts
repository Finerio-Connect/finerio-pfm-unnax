import { IBalance } from "../../interfaces/insights";

export default class Balance implements IBalance {
  private _date: number;
  private _incomes: number;
  private _expenses: number;

  constructor({ date, incomes, expenses }: IBalance) {
    this._incomes = incomes;
    this._expenses = expenses;
    this._date = date;
  }

  public get date(): number {
    return this._date;
  }

  public set date(date: number) {
    this._date = date;
  }

  public get incomes(): number {
    return this._incomes;
  }

  public set incomes(incomes: number) {
    this._incomes = incomes;
  }

  public get expenses(): number {
    return this._expenses;
  }

  public set expenses(expenses: number) {
    this._expenses = expenses;
  }
}
