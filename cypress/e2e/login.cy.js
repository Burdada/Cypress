import testdata from "../fixtures/data.json";

describe("login page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("successful authorization", () => {
    cy.login(testdata.mail, testdata.pass);
    cy.get(".pt-2").should("have.text", `Добро пожаловать ${testdata.mail}`);
    cy.contains("Log out").should("be.visible");
  });

  it("logins succesfully", () => {
    cy.login(testdata.mail, testdata.pass);
    cy.contains(`Добро пожаловать ${testdata.mail}`).should("be.visible");
    cy.contains("Log out").should("be.visible");
  });

  it("logins error on empty login", () => {
    cy.login(null, testdata.pass);
    cy.get("#mail").then((el) => {
      expect(el[0].checkValidity()).to.be.false;
    });
  });

  it("logins error on empty password", () => {
    cy.login(testdata.mail, null);
    cy.get("#pass").then((el) => {
      expect(el[0].checkValidity()).to.be.false;
    });
  });
});

describe("Managing Favorites", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login(testdata.mail, testdata.pass);
  });

  it("checking for an empty favorites list", () => {
    cy.contains("Favorites").click();
    cy.contains("Please add some book to favorit on home page!").should(
      "be.visible"
    );
  });

  it("adding a book to favorites from books list", () => {
    cy.addNewBook(testdata.title, testdata.description, testdata.authors);
    cy.contains("Favorites").click();
    cy.contains(`${testdata.title}`).should("be.visible");
    cy.contains(`${testdata.authors}`).should("be.visible");
  });

  it("removing a book from favorites", () => {
    cy.visit("/favorites");
    cy.contains("Delete from favorite").click();
    cy.contains("Please add some book to favorit on home page!").should(
      "be.visible"
    );
    cy.contains("Books list").click();
    cy.contains(`${testdata.title}`).should("be.visible");
    cy.contains(`${testdata.authors}`).should("be.visible");
  });
});
