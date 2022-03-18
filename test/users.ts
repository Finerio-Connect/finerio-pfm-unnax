import { expect } from "chai";
import { User, USERS_TYPE, FinerioConnectSDK } from "../src/index";
import { User as UserModel } from "../src/models";

describe("Users", () => {
  const fcs = new FinerioConnectSDK(USERS_TYPE);
  const { Users } = fcs.connect("905e0065-a797-4139-81ae-66d671a284b7");
  it("Should be Exist", () => {
    return expect(Users).to.exist;
  });
  let userTest: UserModel;
  describe("#List", () => {
    it("Should return users list", () => {
      return Users?.list().catch((response) => {
        expect(response).to.be.an("array");
        expect(response.length).to.be.greaterThan(0);
      });
    });
  });
  describe("#Create", () => {
    it("Should create User", () => {
      const userPayload = new User("test@test.com");
      return Users?.create(userPayload).then((response) => {
        userTest = new UserModel(response);
        return expect(response).to.exist;
      });
    });
  });
  describe("#Get", () => {
    it("Should be Error", () => {
      return Users?.get(0).catch((error) => {
        expect(error).to.be.an("array");
        expect(error.length).to.be.greaterThan(0);
      });
    });
    it("Should get user", () => {
      return Users?.get(userTest.id).then((response) => {
        return expect(response).to.exist;
      });
    });
  });

  describe("#Update", () => {
    const userPayload = new User("test2@test.com");
    it("Should be Error", () => {
      return Users?.update(0, userPayload).catch((error) => {
        expect(error).to.be.an("array");
        expect(error.length).to.be.greaterThan(0);
      });
    });
    it("Should update user's name", () => {
      return Users?.update(userTest.id, userPayload).then((response) => {
        expect(response).to.exist;
        expect(response.name).to.equal("test2@test.com");
      });
    });
  });

  describe("#Delete", () => {
    it("Should be Error", () => {
      return Users?.delete(0).catch((error) => {
        expect(error).to.be.an("array");
        expect(error.length).to.be.greaterThan(0);
      });
    });
    it("Should be deleted", () => {
      return Users?.delete(userTest.id).then(() => {
        (response: string) => {
          expect(response).to.equal("");
        };
      });
    });
    it("Should be Success", () => {
      return Users?.get(userTest.id).catch((errors) => {
        expect(errors).to.be.an("array");
        expect(errors.length).to.be.greaterThan(0);
        expect(errors).to.deep.include({
          code: "user.notFound",
          detail: "The user ID you requested was not found.",
          title: "User not found.",
        });
      });
    });
  });
});
