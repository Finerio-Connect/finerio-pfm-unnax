import { PlainObject } from "../types";

export default class AccountPayload {
  constructor(
    private _userId: number,
    private _financialEntityId: number,
    private _nature: string,
    private _name: string,
    private _number: string,
    private _balance: number
  ) {}

  public get userId(): number {
    return this._userId;
  }

  public set userId(value: number) {
    this._userId = value;
  }

  public get financialEntityId(): number {
    return this._financialEntityId;
  }

  public set financialEntityId(value: number) {
    this._financialEntityId = value;
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

  public get plainObject(): PlainObject {
    return {
      userId: this._userId,
      financialEntityId: this._financialEntityId,
      nature: this._nature,
      name: this._name,
      number: this._number,
      balance: this._balance,
    };
  }
}
