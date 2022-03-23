import { expect } from "chai";
import { FinerioConnectSDK, ACCOUNT_TYPE, Account } from "../src/index";
import { Account as AccountModel } from "../src/models";

describe("Accounts", () => {
  const fcs = new FinerioConnectSDK(ACCOUNT_TYPE);
  const { Accounts } = fcs.connect({
    token: "905e0065-a797-4139-81ae-66d671a284b7",
    sandbox: true,
  });
  it("Should be Exist", () => {
    return expect(Accounts).to.exist;
  });
  const userId = 1115164;
  describe("#List", () => {
    it("Should be Error", () => {
      return Accounts?.list(0).catch((error) => {
        expect(error).to.be.an("array");
        expect(error.length).to.be.greaterThan(0);
      });
    });
    it("Should be Success", () => {
      return Accounts?.list(userId).then((response) => {
        expect(response).to.be.an("array");
        expect(response.length).to.be.greaterThan(0);
      });
    });
  });
  let newAccount: AccountModel;

  describe("#Create", () => {
    it("Should be Success", () => {
      let account = new Account(
        userId,
        743443,
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

  describe("#Update", () => {
    it("Should be Error", () => {
      return Accounts?.update(0).catch((error) => {
        expect(error).to.be.an("array");
        expect(error.length).to.be.greaterThan(0);
      });
    });
    it("Should be Success", () => {
      let account = new Account(
        userId,
        743443,
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
  });

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
