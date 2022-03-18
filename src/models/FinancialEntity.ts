import { IFinancialEntity } from "../interfaces";
import PlainObject from "../types/PlainObject";

export default class FinancialEntity implements IFinancialEntity {
  private _id: number;
  private _name: string;
  private _code: string;
  private _dateCreated: Date | null;
  private _lastUpdated: Date | null;
  constructor({
    id,
    name,
    code,
    dateCreated,
    lastUpdated,
  }: IFinancialEntity) {
    this._id = id;
    this._name = name;
    this._code = code;
    this._dateCreated = dateCreated ? new Date(dateCreated) : null;
    this._lastUpdated = lastUpdated ? new Date(lastUpdated) : null;
  }

  public get id(): number {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public set name(value: string) {
    this._name = value;
  }

  public get code(): string {
    return this._code;
  }

  public set code(value: string) {
    this._code = value;
  }

  public get dateCreated(): Date | null {
    return this._dateCreated;
  }

  public get lastUpdated(): Date | null {
    return this._lastUpdated;
  }

  public get plainObject(): PlainObject {
    return {
      id: this._id,
      name: this._name,
      code: this._code,
      dateCreated: this._dateCreated && this._dateCreated.getTime() / 1000,
      lastUpdated: this.lastUpdated && this.lastUpdated.getTime() / 1000,
    };
  }
}
