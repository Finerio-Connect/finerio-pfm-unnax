import ICategory from "./ICategory";

export default interface ICategoriesRes {
  data: ICategory[];
  nextCursor: number | null;
}
