import { PlainObject } from "../types";

export default class CategoryPayload {
  constructor(
    private _name: string,
    private _color: string,
    private _parentCategoryId: number | null,
    private _userId?: number | null
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

  public get userId(): number | null | undefined {
    return this._userId;
  }

  public set userId(userId: number | null | undefined) {
    this._userId = userId;
  }

  public get plainObject(): PlainObject {
    return {
      name: this._name,
      color: this._color,
      parentCategoryId: this._parentCategoryId,
      userId: this._userId,
    };
  }
}
