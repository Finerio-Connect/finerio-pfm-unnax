import { expect } from "chai";
import {
  FinerioConnectSDK,
  FINANCIAL_ENTITY_TYPE,
  FinancialEntity,
} from "../src/index";
import { FinancialEntity as FinancialEntityModel } from "../src/models";

describe("FinancialEntities", () => {
  const fcs = new FinerioConnectSDK(FINANCIAL_ENTITY_TYPE);
  const { FinancialEntities } = fcs.connect(
    "905e0065-a797-4139-81ae-66d671a284b7"
  );
  it("Should be Exist", () => {
    return expect(FinancialEntities).to.exist;
  });
  describe("#List", () => {
    it("Should be Success", () => {
      return FinancialEntities?.list().then((response) => {
        expect(response).to.be.an("array");
        expect(response.length).to.be.greaterThan(0);
      });
    });
  });
  let newFinancialEntity: FinancialEntityModel;

  describe("#Create", () => {
    it("Should be Success", () => {
      let financialEntity = new FinancialEntity(
        "National Bank of Wakanda 123",
        "WAKANDA-NB-123"
      );
      return FinancialEntities?.create(financialEntity).then((response) => {
        newFinancialEntity = response;
        return expect(response).to.exist;
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
      return FinancialEntities?.get(newFinancialEntity.id).then((response) => {
        return expect(response).to.exist;
      });
    });
  });

  describe("#Update", () => {
    it("Should be Error", () => {
      return FinancialEntities?.update(0).catch((error) => {
        expect(error).to.be.an("array");
        expect(error.length).to.be.greaterThan(0);
      });
    });
    it("Should be Success", () => {
      let financialEntity = new FinancialEntity(
        "Cambio de banco",
        "WAKANDA-NB-124"
      );
      return FinancialEntities?.update(newFinancialEntity.id, financialEntity).then((response) => {
        expect(response).to.exist;
        expect(response.name).to.equal("Cambio de banco");
        expect(response.code).to.equal("WAKANDA-NB-124");
      });
    });
  });

  describe("#Delete", () => {
    it("Should be Error", () => {
      return FinancialEntities?.delete(0).catch((error) => {
        expect(error).to.be.an("array");
        expect(error.length).to.be.greaterThan(0);
      });
    });
    it("Should be Success", () => {
      return FinancialEntities?.delete(newFinancialEntity.id).then(() => {
        return FinancialEntities?.get(newFinancialEntity.id).catch((errors) => {
          expect(errors).to.be.an("array");
          expect(errors.length).to.be.greaterThan(0);
          expect(errors).to.deep.include({
            code: "financialEntity.notFound",
            title: "Financial entity not found.",
            detail: "The financial entity ID you requested was not found.",
          });
        });
      });
    });
  });
});
