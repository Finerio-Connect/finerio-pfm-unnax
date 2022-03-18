import { IError } from "../interfaces";

export default class Error implements IError {
  constructor(
    public code: string,
    public title: string,
    public detail: string
  ) {}
}
