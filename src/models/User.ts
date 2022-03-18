import { IUser } from "../interfaces";
import { PlainObject } from "../types";

export default class User implements IUser {
  private _id: number;
  private _name: string;
  private _dateCreated: number;

  constructor({ id, name, dateCreated }: IUser) {
    this._id = id;
    this._name = name;
    this._dateCreated = dateCreated;
  }

  public get id(): number {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get dateCreated(): number {
    return this._dateCreated;
  }

  public get plainObject(): PlainObject {
    return {
      id: this._id,
      name: this._name,
      dateCreated: this._dateCreated,
    };
  }
}
