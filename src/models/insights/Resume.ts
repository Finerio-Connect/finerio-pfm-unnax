import { IResumeResponse } from "../../interfaces/insights";
import Balance from "./Balance";
import IncomeExpense from "./IncomeExpense";

export default class Resume implements IResumeResponse {
  private _incomes: IncomeExpense[];
  private _expenses: IncomeExpense[];
  private _balances: Balance[];
  constructor({ incomes, expenses, balances }: IResumeResponse) {
    this._incomes = incomes.map((income) => new IncomeExpense(income));
    this._expenses = expenses.map((expense) => new IncomeExpense(expense));
    this._balances = balances.map((balance) => new Balance(balance));
  }

  public get incomes(): IncomeExpense[] {
    return this._incomes;
  }
  public get expenses(): IncomeExpense[] {
    return this._expenses;
  }

  public get balances(): Balance[] {
    return this._balances;
  }
}
