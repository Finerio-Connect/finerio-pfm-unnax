export default interface ITransaction {
  id: number;
  accountId?: number;
  date: number;
  charge: boolean;
  description: string;
  amount: number;
  categoryId: number;
  dateCreated: number | null;
  lastUpdated: number | null;
  average?: number;
  quantity?: number;
}
