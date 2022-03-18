import FinerioConnectSDK from "../finerioConnectSDK";
import { IUser, IUserRes } from "../interfaces";
import { User } from "../models";
import { UserPayload } from "../payloads";

export default class Users {
  private path: string = "/00611e5e13b4853ed35571e62220ab1542c3678c";

  constructor(public fcSdk: FinerioConnectSDK) {}

  get(id: number): Promise<IUser> {
    const uri = `${this.path}/${id}`;

    return this.fcSdk.doGet(uri, this.processResponse);
  }

  update(id: number, updateObject: UserPayload): Promise<IUser> {
    const uri = `${this.path}/${id}`;

    return this.fcSdk.doPut(
      uri,
      updateObject.plainObject,
      this.processResponse
    );
  }

  create(createUser: UserPayload): Promise<IUser> {
    const uri = `${this.path}`;

    return this.fcSdk.doPost(uri, createUser.plainObject, this.processResponse);
  }

  private processResponse(response: IUser): User {
    return new User(response);
  }

  delete(id: number): Promise<IUser> {
    const uri = `${this.path}/${id}`;

    return this.fcSdk.doDelete(uri, this.processDeleteResponse);
  }

  private processDeleteResponse(status: string): number {
    return status === "" ? 204 : 500;
  }

  list(cursor: number = 0): Promise<IUserRes> {
    const uri = `${this.path}${`?cursor=${cursor}`}`;
    return this.fcSdk.doGet(uri, this.processlistResponse);
  }

  private processlistResponse(response: IUserRes): User[] {
    return response.data ? response.data.map((user) => new User(user)) : [];
  }
}
