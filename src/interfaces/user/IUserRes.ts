import IUser from "./IUser";

export default interface IUserRes {
  data: IUser[];
  nextCursor: number;
}
