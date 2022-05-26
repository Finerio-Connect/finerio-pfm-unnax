import { PlainObject } from "../types";

export default class TransactionPayload {
  constructor(
    private _accountId: number,
    private _date: Date | number,
    private _charge: boolean,
    private _description: string,
    private _amount: number,
    private _categoryId: number
  ) {}

  public get charge(): boolean {
    return this._charge;
  }

  public set charge(value: boolean) {
    this._charge = value;
  }

  public get date(): Date | number {
    return this._date;
  }

  public set date(value: Date | number) {
    this._date = value;
  }

  public get description(): string {
    return this._description;
  }

  public get amount(): number {
    return this._amount;
  }

  public get categoryId(): number {
    return this._categoryId;
  }

  public get accountId(): number {
    return this._accountId;
  }

  public set accountId(value: number) {
    this._accountId = value;
  }

  public get plainObject(): PlainObject {
    return {
      accountId: this._accountId,
      amount: this._amount,
      categoryId: this._categoryId,
      charge: this._charge,
      date: this._date as number,
      description: this._description,
    };
  }
}
