import { IFinancialEntity } from "../interfaces";
import PlainObject from "../types/PlainObject";

export default class FinancialEntity implements IFinancialEntity {
  private _id: number;
  private _name: string;
  private _code: string;
  private _image_path: string;
  private _dateCreated: number | Date | null;
  private _lastUpdated: number | Date | null;
  constructor({
    id,
    name,
    code,
    image_path,
    dateCreated,
    lastUpdated,
  }: IFinancialEntity) {
    this._id = id;
    this._name = name;
    this._code = code;
    this._image_path = image_path || '';
    this._dateCreated = dateCreated ? dateCreated : null;
    this._lastUpdated = lastUpdated ? lastUpdated : null;
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

  public get image_path(): string {
    return this._image_path;
  }

  public set image_path(value: string) {
    this._image_path = value;
  }

  public get code(): string {
    return this._code;
  }

  public set code(value: string) {
    this._code = value;
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
      name: this._name,
      code: this._code,
      dateCreated: this._dateCreated && (this._dateCreated as number),
      lastUpdated: this._lastUpdated && (this._lastUpdated as number),
    };
  }
}
