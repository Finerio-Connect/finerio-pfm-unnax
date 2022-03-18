import { expect } from "chai";
import { INSIGHTS_TYPE, FinerioConnectSDK } from "../src/index";

describe("Insights", () => {
  const fcs = new FinerioConnectSDK(INSIGHTS_TYPE);
  const { Insights } = fcs.connect("905e0065-a797-4139-81ae-66d671a284b7");
  const userId = 1115162;
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
      return Insights?.resume(userId).catch((response) => {
        expect(response.incomes).to.exist;
        expect(response.expenses).to.exist;
        expect(response.balances).to.exist;
        expect(
          response.expenses[0].categories[0].subcategories[0]
            .transactionsByDate[0].transactions
        ).to.be.an("array");
        expect(
          response.expenses[0].categories[0].subcategories[0]
            .transactionsByDate[0].transactions
        ).to.be.greaterThan(0);
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
      return Insights?.analysis(userId).catch((response) => {
        expect(response).to.be.an("array");
        expect(response.length).to.be.greaterThan(0);
        expect(
          response[0].categories[0].subcategories[0].transactions
        ).to.be.an("array");
        expect(
          response[0].categories[0].subcategories[0].transactions
        ).to.be.greaterThan(0);
      });
    });
  });
});
