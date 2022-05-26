import { expect } from "chai";
import { Budget, BUDGET_TYPE, FinerioConnectSDK } from "../src/index";
import { Budget as BudgetModel } from "../src/models";

describe("Budgets", () => {
  const username = "gil.carrillo";
  const password = "password";
  const clientId = 46;
  const fcs = new FinerioConnectSDK({
    includes: BUDGET_TYPE,
    sandbox: true,
  });

  it("Get token", () => {
    return fcs.doLogin(username, password, clientId).then((response) => {
      const token = response.access_token;
      expect(token).to.exist;
      expect(token).to.be.string;

      const { Budgets } = fcs.connect(token);
      it("Should be Exist", () => {
        return expect(Budgets).to.exist;
      });
      const categoryId = 25;
      let budgetTest: BudgetModel;
      describe("#List", () => {
        it("Should return user's budgets", () => {
          return Budgets?.list().catch((response) => {
            expect(response).to.be.an("array");
            expect(response.length).to.be.greaterThan(0);
          });
        });
      });
      describe("#Create", () => {
        it("Should create Budget", () => {
          const budgetPayload = new Budget("Test", 5000, 0.5, categoryId);
          return Budgets?.create(budgetPayload).then((response) => {
            budgetTest = new BudgetModel(response);
            return expect(response).to.exist;
          });
        });
      });
      describe("#Get", () => {
        it("Should be Error", () => {
          return Budgets?.get(0).catch((error) => {
            expect(error).to.be.an("array");
            expect(error.length).to.be.greaterThan(0);
          });
        });
        it("Should get budget", () => {
          return Budgets?.get(budgetTest.id).then((response) => {
            return expect(response).to.exist;
          });
        });
      });

      describe("#Update", () => {
        const budgetPayload = new Budget("Test 2", 6000, 0.6);
        it("Should be Error", () => {
          return Budgets?.update(0, budgetPayload).catch((error) => {
            expect(error).to.be.an("array");
            expect(error.length).to.be.greaterThan(0);
          });
        });
        it("Should update budget's name, amount and warningpercentage", () => {
          return Budgets?.update(budgetTest.id, budgetPayload).then(
            (response) => {
              expect(response).to.exist;
              expect(response.name).to.equal("Test 2");
              expect(response.amount).to.equal(6000);
              expect(response.warningPercentage).to.equal(0.6);
            }
          );
        });
      });

      describe("#Delete", () => {
        it("Should be Error", () => {
          return Budgets?.delete(0).catch((error) => {
            expect(error).to.be.an("array");
            expect(error.length).to.be.greaterThan(0);
          });
        });
        it("Should be deleted", () => {
          return Budgets?.delete(budgetTest.id).then(() => {
            (response: string) => {
              expect(response).to.equal("");
            };
          });
        });
        it("Should be Success", () => {
          return Budgets?.get(budgetTest.id).catch((errors) => {
            expect(errors).to.be.an("array");
            expect(errors.length).to.be.greaterThan(0);
            expect(errors).to.deep.include({
              code: "budget.notFound",
              detail: "The budget ID you requested was not found.",
              title: "Budget not found.",
            });
          });
        });
      });
    });
  });
});
