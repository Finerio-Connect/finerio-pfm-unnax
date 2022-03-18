import { IBudget } from "../interfaces";
import { PlainObject } from "../types";

export default class Budget implements IBudget {
  private _id: number;
  private _categoryId: number;
  private _name: string;
  private _amount: number;
  private _warningPercentage: number;
  private _spent: number;
  private _leftToSpend: number;
  private _status: string;
  private _dateCreated: number | null;
  private _lastUpdated: number | null;

  constructor({
    id,
    categoryId,
    name,
    amount,
    warningPercentage,
    spent,
    leftToSpend,
    status,
    dateCreated,
    lastUpdated,
  }: IBudget) {
    this._id = id;
    this._categoryId = categoryId;
    this._name = name;
    this._amount = amount;
    this._warningPercentage = warningPercentage;
    this._spent = spent;
    this._leftToSpend = leftToSpend;
    this._status = status;
    this._dateCreated = dateCreated;
    this._lastUpdated = lastUpdated;
  }

  public get id(): number {
    return this._id;
  }

  public get categoryId(): number {
    return this._categoryId;
  }

  public get name(): string {
    return this._name;
  }

  public get amount(): number {
    return this._amount;
  }

  public get warningPercentage(): number {
    return this._warningPercentage;
  }

  public get spent(): number {
    return this._spent;
  }

  public get leftToSpend(): number {
    return this._leftToSpend;
  }

  public get status(): string {
    return this._status;
  }

  public get dateCreated(): number | null {
    return this._dateCreated;
  }

  public get lastUpdated(): number | null {
    return this._lastUpdated;
  }

  public get plainObject(): PlainObject {
    return {
      id: this._id,
      categoryId: this._categoryId,
      name: this._name,
      amount: this._amount,
      warningPercentage: this._warningPercentage,
      spent: this._spent,
      leftToSpend: this._leftToSpend,
      status: this._status,
      dateCreated: this._dateCreated,
      lastUpdated: this._lastUpdated,
    };
  }
}
