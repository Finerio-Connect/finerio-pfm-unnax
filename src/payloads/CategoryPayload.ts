import { PlainObject } from "../types";

export default class CategoryPayload {
  constructor(
    private _name: string,
    private _color: string,
    private _parentCategoryId: number | null
  ) {}

  public get name(): string {
    return this._name;
  }

  public set name(name: string) {
    this._name = name;
  }

  public get color(): string {
    return this._color;
  }

  public set color(color: string) {
    this._color = color;
  }

  public get parentCategoryId(): number | null {
    return this._parentCategoryId;
  }

  public set parentCategoryId(parentCategoryId: number | null) {
    this._parentCategoryId = parentCategoryId;
  }

  public get plainObject(): PlainObject {
    return {
      name: this._name,
      color: this._color,
      parentCategoryId: this._parentCategoryId,
    };
  }
}
