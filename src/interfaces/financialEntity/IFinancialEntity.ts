export default interface IFinancialEntity {
  id: number;
  name: string;
  code: string;
  image_path?: string;
  dateCreated?: number | Date | null;
  lastUpdated?: number | Date | null;
}
