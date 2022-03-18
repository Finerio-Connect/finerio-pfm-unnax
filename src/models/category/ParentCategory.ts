import { ICategory } from "../../interfaces";
import Category from "./Category";

export default class ParentCategory extends Category {
  private _subcategories: Category[];

  constructor(
    {
      id,
      name,
      color,
      parentCategoryId,
      userId,
      dateCreated,
      lastUpdated,
    }: ICategory,
    subcategories: Category[] = []
  ) {
    super({
      id,
      name,
      color,
      parentCategoryId,
      userId,
      dateCreated,
      lastUpdated,
    });
    this._subcategories = subcategories;
  }

  public get subcategories(): Category[] {
    return this._subcategories;
  }

  public set subcategories(subcategories: Category[]) {
    this._subcategories = subcategories;
  }
}
