import { expect } from "chai";
import { FinerioConnectSDK, ACCOUNT_TYPE, Account } from "../src/index";
import { Account as AccountModel } from "../src/models";

describe("Access", () => {
  const username = "gil.carrillo";
  const password = "password";
  const clientId = 46;
  const fcs = new FinerioConnectSDK({
    sandbox: true,
  });

  it("Login", () => {
    return fcs.login(username, password, clientId).then(() => {
      describe("#Tokens", () => {
        it("Api Token Should be Exist", () => {
          return expect(fcs.apiToken).to.exist;
        });
        it("Refresh Token Should be Exist", () => {
          return expect(fcs.refreshToken).to.exist;
        });
      });
     
      describe("#Refresh Api Token", () => {
        it("Should be Success", () => {
          return fcs
            .refreshApiToken()
            .then((response) => {
              expect(response).to.exist;
            })
            .catch((error) => {
              return expect(error).to.not.exist;
            });
        });
      });
    });
  });
});
