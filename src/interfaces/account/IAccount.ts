export default interface IAccount {
  id: number;
  nature: string;
  name: string;
  number: string;
  balance: number;
  chargeable: boolean;
  dateCreated?: number | Date | null;
  lastUpdated?: number | Date | null;
}
