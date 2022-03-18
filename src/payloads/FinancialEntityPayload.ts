import PlainObject from "../types/PlainObject";

export default class FinancialEntityPayload {
  constructor(private _name: string, private _code: string) {}

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

  public get plainObject(): PlainObject {
    return {
      name: this._name,
      code: this._code,
    };
  }
}
