import { LoginResponse } from "../interfaces/login/LoginResponse";

export default class Login implements LoginResponse {
  private _access_token: string;
  private _refresh_token: string;
  private _token_type: string;
  private _expires_in: number;
  private _id: number;
  private _username: string;
  private _roles: string[];
  private _api_key: string;

  constructor({
    access_token,
    refresh_token,
    token_type,
    expires_in,
    id,
    username,
    roles,
    api_key,
  }: LoginResponse) {
    this._access_token = access_token;
    this._refresh_token = refresh_token;
    this._token_type = token_type;
    this._expires_in = expires_in;
    this._id = id;
    this._username = username;
    this._roles = roles;
    this._api_key = api_key;
  }

  public get access_token(): string {
    return this._access_token;
  }
  public get refresh_token(): string {
    return this._refresh_token;
  }
  public get token_type(): string {
    return this._token_type;
  }
  public get expires_in(): number {
    return this._expires_in;
  }
  public get id(): number {
    return this._id;
  }
  public get username(): string {
    return this._username;
  }
  public get roles(): string[] {
    return this._roles;
  }
  public get api_key(): string {
    return this._api_key;
  }
}
