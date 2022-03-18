import { ICategory } from "../../interfaces";
import { PlainObject } from "../../types";

export default class Category implements ICategory {
  private _id: number;
  private _name: string;
  private _color: string;
  private _parentCategoryId: number | null;
  private _userId: number | null;
  private _dateCreated: number | null;
  private _lastUpdated: number | null;

  constructor({
    id,
    name,
    color,
    parentCategoryId,
    userId,
    dateCreated,
    lastUpdated,
  }: ICategory) {
    this._id = id;
    this._name = name;
    this._color = color;
    this._parentCategoryId = parentCategoryId;
    this._userId = userId;
    this._dateCreated = dateCreated;
    this._lastUpdated = lastUpdated;
  }

  public get id(): number {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get color(): string {
    return this._color;
  }

  public get parentCategoryId(): number | null {
    return this._parentCategoryId;
  }

  public get userId(): number | null {
    return this._userId;
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
      name: this._name,
      color: this._color,
      parentCategoryId: this._parentCategoryId,
      userId: this._userId,
      dateCreated: this._dateCreated,
      lastUpdated: this._lastUpdated,
    };
  }
}
