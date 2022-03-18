import { ICategoryInsights, IAnalysis } from "../../interfaces/insights";
import CategoryInsights from "./CategoryInsights";

export default class Analysis implements IAnalysis {
  private _date: number;
  private _categories: CategoryInsights[];

  constructor({ date, categories }: IAnalysis) {
    this._date = date;
    this._categories = categories.map((cat) => new CategoryInsights(cat));
  }

  public get date(): number {
    return this._date;
  }

  public get categories(): ICategoryInsights[] {
    return this._categories;
  }
}
