import ITransaction from "../transaction/ITransaction";
import ISubcategory from "./ISubcategory";

export default interface ICategoryInsights {
  categoryId: number;
  amount: number;
  average?: number;
  quantity?: number;
  subcategories?: ISubcategory[];
  transactions?: ITransaction[];
}
