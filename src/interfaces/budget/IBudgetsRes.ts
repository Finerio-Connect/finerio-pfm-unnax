import IBudget from "./IBudget";

export default interface ICategoriesRes {
  data: IBudget[];
  nextCursor: number | null;
}
