import { ITransaction } from "../interfaces";
import PlainObject from "../types/PlainObject";

export default class Transaction implements ITransaction {
  private _id: number;
  private _date: number;
  private _charge: boolean;
  private _description: string;
  private _amount: number;
  private _categoryId: number;
  private _accountId?: number;
  private _dateCreated: number | null;
  private _lastUpdated: number | null;
  private _average?: number;
  private _quantity?: number;
  constructor({
    id,
    accountId,
    amount,
    categoryId,
    charge,
    date,
    dateCreated,
    description,
    lastUpdated,
    average,
    quantity,
  }: ITransaction) {
    this._id = id;
    this._accountId = accountId;
    this._amount = amount;
    this._charge = charge;
    this._date = date;
    this._description = description;
    this._categoryId = categoryId;
    this._dateCreated = dateCreated;
    this._lastUpdated = lastUpdated;
    this._average = average;
    this._quantity = quantity;
  }

  public get id(): number {
    return this._id;
  }

  public get charge(): boolean {
    return this._charge;
  }

  public set charge(value: boolean) {
    this._charge = value;
  }

  public get date(): number {
    return this._date;
  }

  public set date(value: number) {
    this._date = value;
  }

  public get dateCreated(): number | null {
    return this._dateCreated;
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

  public get accountId(): number | undefined {
    return this._accountId;
  }

  public set accountId(value: number | undefined) {
    this._accountId = value;
  }

  public get lastUpdated(): number | null {
    return this._lastUpdated;
  }

  public get average(): number | undefined {
    return this._average;
  }

  public get quantity(): number | undefined {
    return this._quantity;
  }

  public get plainObject(): PlainObject {
    return {
      id: this._id,
      amount: this._amount,
      categoryId: this._categoryId,
      charge: this._charge,
      date: this._date,
      description: this._description,
      dateCreated: this._dateCreated,
      lastUpdated: this.lastUpdated,
    };
  }
}
