import { expect } from "chai";
import { INSIGHTS_TYPE, FinerioConnectSDK } from "../src/index";

describe("Insights", () => {
  const username = "gil.carrillo";
  const password = "password";
  const clientId = 46;
  const fcs = new FinerioConnectSDK({
    includes: INSIGHTS_TYPE,
    sandbox: true,
  });

  it("Get token", () => {
    return fcs.login(username, password, clientId).then(({ Insights }) => {
      it("Should be Exist", () => {
        return expect(Insights).to.exist;
      });
      describe("#Resume", () => {
        it("Should be Error", () => {
          return Insights?.resume(0).catch((error) => {
            expect(error).to.be.an("array");
            expect(error.length).to.be.greaterThan(0);
          });
        });
        it("Should return user's resume", () => {
          return Insights?.resume().then((response) => {
            expect(response.incomes).to.exist;
            expect(response.expenses).to.exist;
            expect(response.balances).to.exist;
            expect(response.expenses[0].categories[0].subcategories).to.be.an(
              "array"
            );
            /* expect(
              response.expenses[0].categories[0].subcategories[0]
                .transactionsByDate[0].transactions
            ).to.be.an("array");
            expect(
              response.expenses[0].categories[0].subcategories[0]
                .transactionsByDate[0].transactions
            ).to.be.greaterThan(0); */
          });
        });
      });
      describe("#Analysis", () => {
        it("Should be Error", () => {
          return Insights?.analysis(0).catch((error) => {
            expect(error).to.be.an("array");
            expect(error.length).to.be.greaterThan(0);
          });
        });
        it("Should return user's analysis", () => {
          return Insights?.analysis().then((response) => {
            expect(response).to.be.an("array");
            expect(response.length).to.be.greaterThan(0);
            expect(response[0].categories[0].subcategories).to.be.an("array");
            /*  expect(
              response[0].categories[0].subcategories[0].transactions
            ).to.be.an("array");
            expect(
              response[0].categories[0].subcategories[0].transactions
            ).to.be.greaterThan(0); */
          });
        });
      });
    });
  });
});
