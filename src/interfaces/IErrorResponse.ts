import IError from "./IError";

export default interface IErrorResponse {
  errors?: IError[];
  timestamp?: string;
  status?: number;
  error?: string;
  path?: string;
}
