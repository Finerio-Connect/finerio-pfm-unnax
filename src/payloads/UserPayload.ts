import { PlainObject } from "../types";

export default class UserPayload {
  constructor(private _name: string) {}

  public get name(): string {
    return this._name;
  }

  public set name(name: string) {
    this._name = name;
  }

  public get plainObject(): PlainObject {
    return {
      name: this._name,
    };
  }
}
