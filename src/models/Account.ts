import { IAccount } from "../interfaces";
import PlainObject from "../types/PlainObject";

export default class Account implements IAccount {
  private _id: number;
  private _nature: string;
  private _name: string;
  private _number: string;
  private _balance: number;
  private _chargeable: boolean;
  private _dateCreated: number | Date | null;
  private _lastUpdated: number | Date | null;
  constructor({
    id,
    nature,
    name,
    number,
    balance,
    chargeable,
    dateCreated,
    lastUpdated,
  }: IAccount) {
    this._id = id;
    this._nature = nature;
    this._name = name;
    this._number = number;
    this._balance = balance;
    this._chargeable = chargeable;
    this._dateCreated = dateCreated ? dateCreated : null;
    this._lastUpdated = lastUpdated ? lastUpdated : null;
  }

  public get id(): number {
    return this._id;
  }

  public get nature(): string {
    return this._nature;
  }

  public set nature(value: string) {
    this._nature = value;
  }

  public get name(): string {
    return this._name;
  }

  public set name(value: string) {
    this._name = value;
  }

  public get number(): string {
    return this._number;
  }

  public set number(value: string) {
    this._number = value;
  }

  public get balance(): number {
    return this._balance;
  }

  public set balance(value: number) {
    this._balance = value;
  }

  public get chargeable(): boolean {
    return this._chargeable;
  }

  public set chargeable(value: boolean) {
    this._chargeable = value;
  }

  public get dateCreated(): number | Date | null {
    return this._dateCreated;
  }

  public get lastUpdated(): number | Date | null {
    return this._lastUpdated;
  }

  public get plainObject(): PlainObject {
    return {
      id: this._id,
      nature: this._nature,
      name: this._name,
      number: this._number,
      balance: this._balance,
      chargeable: this._chargeable,
      dateCreated: this._dateCreated && (this._dateCreated as number),
      lastUpdated: this._lastUpdated && (this._lastUpdated as number),
    };
  }
}
