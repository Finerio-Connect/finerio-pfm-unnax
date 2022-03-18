import FinerioConnectSDK from "../finerioConnectSDK";
import { ICategory, ICategoriesRes } from "../interfaces";
import { Category, ParentCategory } from "../models";
import { CategoryPayload } from "../payloads";

export default class Categories {
  private path: string = "/b07db4dc65bda086ae37ffeb8e03a126b18ffa6f";

  constructor(public fcSdk: FinerioConnectSDK) {}

  get(id: number): Promise<ICategory> {
    const uri = `${this.path}/${id}`;

    return this.fcSdk.doGet(uri, this.processResponse);
  }

  update(id: number, updateObject: CategoryPayload): Promise<ICategory> {
    const uri = `${this.path}/${id}`;

    return this.fcSdk.doPut(
      uri,
      updateObject.plainObject,
      this.processResponse
    );
  }

  create(createCategory: CategoryPayload): Promise<ICategory> {
    const uri = `${this.path}`;

    return this.fcSdk.doPost(
      uri,
      createCategory.plainObject,
      this.processResponse
    );
  }

  private processResponse(response: ICategory): Category {
    return new Category(response);
  }

  delete(id: number): Promise<ICategory> {
    const uri = `${this.path}/${id}`;

    return this.fcSdk.doDelete(uri, this.processDeleteResponse);
  }

  private processDeleteResponse(status: string): number {
    return status === "" ? 204 : 500;
  }

  list(userId?: number, cursor: number = 1): Promise<any> {
    const uri = `${this.path}${
      userId ? `?userId=${userId}&cursor=${cursor}` : ""
    }`;
    return this.fcSdk.doGet(uri, this.processlistResponse);
  }

  private processlistResponse(response: ICategoriesRes): Category[] {
    return response.data
      ? response.data.reverse().map((cat) => new Category(cat))
      : [];
  }

  listWithSubcategories(userId?: number, cursor: number = 1): Promise<any> {
    const uri = `${this.path}${
      userId ? `?userId=${userId}&cursor=${cursor}` : ""
    }`;
    return this.fcSdk.doGet(uri, this.processListWithSubcategoriesResponse);
  }

  private processListWithSubcategoriesResponse(
    response: ICategoriesRes
  ): ParentCategory[] {
    let categories: ParentCategory[] = [];
    if (response.data) {
      const catsOrd = response.data.reverse();
      categories = catsOrd
        .filter((cat) => !cat.parentCategoryId)
        .map((cat) => new ParentCategory(cat));

      categories.forEach((parcat) => {
        parcat.subcategories = catsOrd
          .filter((rescat) => rescat.parentCategoryId === parcat.id)
          .map((cat) => new Category(cat));
      });
    }
    return categories;
  }
}
