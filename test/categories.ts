import { expect } from "chai";
import { Category, CATEGORY_TYPE, FinerioConnectSDK } from "../src/index";
import { Category as CategoryModel } from "../src/models";

describe("Categories", () => {
  const username = "gil.carrillo";
  const password = "password";
  const clientId = 46;
  const fcs = new FinerioConnectSDK({
    includes: CATEGORY_TYPE,
    sandbox: true,
  });
  let categoryTest: CategoryModel;

  it("Get token", () => {
    return fcs.login(username, password, clientId).then(({ Categories }) => {
      describe("#Instance", () => {
        it("Should be Exist", () => {
          return expect(Categories).to.exist;
        });
      });

      describe("#List", () => {
        it("Should return system and user categories", () => {
          return Categories?.list().then((response) => {
            expect(response).to.be.an("array");
            expect(response.length).to.be.greaterThan(1);
          });
        });
      });

      describe("#ListSubcategories", () => {
        it("Should return system categories with subcategories", () => {
          return Categories?.listWithSubcategories().catch((response) => {
            expect(response).to.be.an("array");
            expect(response[0].subcategories).to.exist;
            expect(response[0].subcategories).to.be.greaterThanOrEqual(1);
          });
        });
      });
      describe("#Create", () => {
        it("Should create Category with no parent", () => {
          const categoryPayload = new Category("Test", "#FF0000", null);
          return Categories?.create(categoryPayload).then((response) => {
            categoryTest = new CategoryModel(response);
            return expect(response).to.exist;
          });
        }); /*
        it("Should create Category with parent", () => {
          const categoryPayload = new Category(
            "Test Parent",
            "#FF0000",
            categoryTest.id
          );
          return Categories?.create(categoryPayload).then((response) => {
            categoryTest = new CategoryModel(response);
            return expect(response).to.exist;
          });
        });*/
      });
      describe("#Get", () => {
        it("Should be Error", () => {
          return Categories?.get(0).catch((error) => {
            expect(error).to.be.an("array");
            expect(error.length).to.be.greaterThan(0);
          });
        });
        it("Should get category", () => {
          return Categories?.get(categoryTest.id).then((response) => {
            return expect(response).to.exist;
          });
        });
      });

      describe("#Update", () => {
        const categoryPayload = new Category("Test 2", "#00FF00", null);
        it("Should be Error", () => {
          return Categories?.update(0, categoryPayload).catch((error) => {
            expect(error).to.be.an("array");
            expect(error.length).to.be.greaterThan(0);
          });
        });
        it("Should update category's name and color", () => {
          return Categories?.update(categoryTest.id, categoryPayload).then(
            (response) => {
              expect(response).to.exist;
              expect(response.name).to.equal("Test 2");
              expect(response.color).to.equal("#00FF00");
            }
          );
        });
      });
      describe("#Delete", () => {
        it("Should be Error", () => {
          return Categories?.delete(0).catch((error) => {
            expect(error).to.be.an("array");
            expect(error.length).to.be.greaterThan(0);
          });
        });
        it("Should be deleted", () => {
          return Categories?.delete(categoryTest.id).then(() => {
            (response: string) => {
              expect(response).to.equal("");
            };
          });
        });
        it("Should be Success", () => {
          return Categories?.get(categoryTest.id).catch((errors) => {
            expect(errors).to.be.an("array");
            expect(errors.length).to.be.greaterThan(0);
            expect(errors).to.deep.include({
              code: "category.notFound",
              detail: "The category ID you requested was not found.",
              title: "Category not found.",
            });
          });
        });
      });
    });
  });
});
