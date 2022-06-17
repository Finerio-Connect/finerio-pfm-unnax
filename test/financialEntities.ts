import { expect } from "chai";
import { FinerioConnectSDK, FINANCIAL_ENTITY_TYPE } from "../src/index";

describe("Financial Entities", () => {
  const username = "gil.carrillo";
  const password = "password";
  const clientId = 46;
  const fcs = new FinerioConnectSDK({
    includes: FINANCIAL_ENTITY_TYPE,
    sandbox: true,
  });

  it("Get token", () => {
    return fcs
      .login(username, password, clientId)
      .then(({ FinancialEntities }) => {
        it("Should be Exist", () => {
          return expect(FinancialEntities).to.exist;
        });
        describe("#List", () => {
          it("Should be Error", () => {
            return FinancialEntities?.list(0).catch((error) => {
              expect(error).to.be.an("array");
              expect(error.length).to.be.greaterThan(0);
            });
          });
          it("Should be Success", () => {
            return FinancialEntities?.list().then((response) => {
              expect(response).to.be.an("array");
              expect(response.length).to.be.greaterThan(0);
            });
          });
        });

        describe("#Get", () => {
          it("Should be Error", () => {
            return FinancialEntities?.get(0).catch((error) => {
              expect(error).to.be.an("array");
              expect(error.length).to.be.greaterThan(0);
            });
          });
          it("Should be Success", () => {
            return FinancialEntities?.get(105).then((response) => {
              return expect(response).to.exist;
            });
          });
        });
      });
  });
});
