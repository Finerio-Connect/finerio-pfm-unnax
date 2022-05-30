import { expect } from "chai";
import { FinerioConnectSDK, TRANSACTION_TYPE, Transaction } from "../src/index";
import { Transaction as TransactionModel } from "../src/models";

describe("Transactions", () => {
  const username = "gil.carrillo";
  const password = "password";
  const clientId = 46;
  const fcs = new FinerioConnectSDK({
    includes: TRANSACTION_TYPE,
    sandbox: true,
  });

  it("Get token", () => {
    return fcs.doLogin(username, password, clientId).then((response) => {
      const token = response.access_token;
      expect(token).to.exist;
      expect(token).to.be.string;

      const { Transactions } = fcs.connect(token);
      it("Should be Exist", () => {
        return expect(Transactions).to.exist;
      });
      const accountId = 23;
      describe("#List", () => {
        it("Should be Error", () => {
          return Transactions?.list(0).catch((error) => {
            expect(error).to.be.an("array");
            expect(error.length).to.be.greaterThan(0);
          });
        });
        it("Should be Success", () => {
          return Transactions?.list(accountId).then((response) => {
            expect(response).to.be.an("array");
            expect(response.length).to.be.greaterThan(0);
          });
        });
        it("Should be Success", () => {
          return Transactions?.list(accountId, { categoryId: 79 }).then(
            (response) => {
              expect(response).to.be.an("array");
              expect(response.length).to.be.greaterThan(0);
            }
          );
        });
      });
      let newTransaction: TransactionModel;

      describe("#Create", () => {
        it("Should be Success", () => {
          let transaction = new Transaction(
            accountId,
            new Date().getTime(),
            true,
            "Mocha Test",
            1111,
            79
          );
          return Transactions?.create(transaction).then((response) => {
            newTransaction = response;
            return expect(response).to.exist;
          });
        });
      });

      describe("#Get", () => {
        it("Should be Error", () => {
          return Transactions?.get(0).catch((error) => {
            expect(error).to.be.an("array");
            expect(error.length).to.be.greaterThan(0);
          });
        });
        it("Should be Success", () => {
          return Transactions?.get(newTransaction.id).then((response) => {
            return expect(response).to.exist;
          });
        });
      });

      describe("#Update", () => {
        it("Should be Error", () => {
          return Transactions?.update(0).catch((error) => {
            expect(error).to.be.an("array");
            expect(error.length).to.be.greaterThan(0);
          });
        });
        it("Should be Success", () => {
          let transaction = new Transaction(
            accountId,
            new Date().getTime(),
            false,
            "Mocha Test",
            1111,
            79
          );
          return Transactions?.update(newTransaction.id, transaction).then(
            (response) => {
              expect(response).to.exist;
              expect(response.charge).to.be.false;
            }
          );
        });
      });

      describe("#Delete", () => {
        it("Should be Error", () => {
          return Transactions?.delete(0).catch((error) => {
            expect(error).to.be.an("array");
            expect(error.length).to.be.greaterThan(0);
          });
        });
        it("Should be Success", () => {
          return Transactions?.delete(newTransaction.id).then(() => {
            return Transactions?.get(newTransaction.id).catch((errors) => {
              expect(errors).to.be.an("array");
              expect(errors.length).to.be.greaterThan(0);
              expect(errors).to.deep.include({
                code: "transaction.notFound",
                detail: "The transaction ID you requested was not found.",
                title: "Transaction not found.",
              });
            });
          });
        });
      });
    });
  });
});
