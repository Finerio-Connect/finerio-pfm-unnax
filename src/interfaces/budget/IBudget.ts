export default interface ICategory {
  id: number;
  categoryId: number;
  name: string;
  amount: number;
  warningPercentage: number;
  spent: number;
  leftToSpend: number;
  status: string;
  dateCreated: number | null;
  lastUpdated: number | null;
}
