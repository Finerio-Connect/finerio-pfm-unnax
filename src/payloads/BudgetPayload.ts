import { PlainObject } from "../types";

export default class BudgetPayload {
  constructor(
    private _name: string,
    private _amount: number,
    private _warningPercentage: number,
    private _categoryId?: number | null,
    private _userId?: number | null,
  ) {}

  public get categoryId(): number | null | undefined {
    return this._categoryId;
  }

  public set categoryId(categoryId: number | null | undefined) {
    this._categoryId = categoryId;
  }

  public get name(): string {
    return this._name;
  }

  public set name(name: string) {
    this._name = name;
  }

  public get amount(): number {
    return this._amount;
  }

  public set amount(amount: number) {
    this._amount = amount;
  }

  public get warningPercentage(): number {
    return this._warningPercentage;
  }

  public set warningPercentage(warningPercentage: number) {
    this._warningPercentage = warningPercentage;
  }

  public get userId(): number | null | undefined {
    return this._userId;
  }

  public set userId(userId: number | null | undefined) {
    this._userId = userId;
  }

  public get plainObject(): PlainObject {
    return {
      categoryId: this._categoryId,
      name: this._name,
      amount: this._amount,
      warningPercentage: this.warningPercentage,
      userId: this.userId,
    };
  }
}
