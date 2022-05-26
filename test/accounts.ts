import { expect } from "chai";
import { FinerioConnectSDK, ACCOUNT_TYPE, Account } from "../src/index";
import { Account as AccountModel } from "../src/models";

describe("Accounts", () => {
  const username = "gil.carrillo";
  const password = "password";
  const clientId = 46;
  const fcs = new FinerioConnectSDK({
    includes: ACCOUNT_TYPE,
    sandbox: true,
  });

  it("Get token", () => {
    return fcs.doLogin(username, password, clientId).then((response) => {
      const token = response.access_token;
      expect(token).to.exist;
      expect(token).to.be.string;
      const { Accounts } = fcs.connect(token);

      it("Should be Exist", () => {
        return expect(Accounts).to.exist;
      });
      describe("#List", () => {
        it("Should be Error", () => {
          return Accounts?.list(0).catch((error) => {
            expect(error).to.be.an("array");
            expect(error.length).to.be.greaterThan(0);
          });
        });
        it("Should be Success", () => {
          return Accounts?.list(23).then((response) => {
            expect(response).to.be.an("array");
            expect(response.length).to.be.greaterThan(0);
          });
        });
      });
      let newAccount: AccountModel;
      const financialEntityId = 103;

      describe("#Create", () => {
        it("Should be Success", () => {
          let account = new Account(
            financialEntityId,
            "Mortgage",
            "Cuenta prueba",
            "1111 1111 1111 1111",
            1000
          );
          return Accounts?.create(account).then((response) => {
            newAccount = response;
            return expect(response).to.exist;
          });
        });
      });

      describe("#Get", () => {
        it("Should be Error", () => {
          return Accounts?.get(0).catch((error) => {
            expect(error).to.be.an("array");
            expect(error.length).to.be.greaterThan(0);
          });
        });
        it("Should be Success", () => {
          return Accounts?.get(newAccount.id).then((response) => {
            return expect(response).to.exist;
          });
        });
      });
/*
      describe("#Update", () => {
        it("Should be Error", () => {
          return Accounts?.update(0).catch((error) => {
            expect(error).to.be.an("array");
            expect(error.length).to.be.greaterThan(0);
          });
        });
        it("Should be Success", () => {
          let account = new Account(
            financialEntityId,
            "Mortgage",
            "Cambio",
            "1111 1111 1111 1111",
            1000
          );
          return Accounts?.update(newAccount.id, account).then((response) => {
            expect(response).to.exist;
            expect(response.name).to.equal("Cambio");
          });
        });
      });*/
      
      describe("#Delete", () => {
        it("Should be Error", () => {
          return Accounts?.delete(0).catch((error) => {
            expect(error).to.be.an("array");
            expect(error.length).to.be.greaterThan(0);
          });
        });
        it("Should be Success", () => {
          return Accounts?.delete(newAccount.id).then(() => {
            return Accounts?.get(newAccount.id).catch((errors) => {
              expect(errors).to.be.an("array");
              expect(errors.length).to.be.greaterThan(0);
              expect(errors).to.deep.include({
                code: "account.notFound",
                detail: "The account ID you requested was not found.",
                title: "Account not found.",
              });
            });
          });
        });
      });
    });
  });
});
