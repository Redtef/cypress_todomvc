/// <reference types='cypress' />

describe("All,Active,Completed list and the clear completed tests", () => {
  beforeEach(() => {
    cy.visit("http://todomvc.com/examples/jquery/#/all");
    cy.get(".new-todo").type("build app{enter}");
    cy.get(".new-todo").type("clean the store{enter}");
    cy.get(".new-todo").type("make dinner{enter}");
    cy.get(".new-todo").type("sleep{enter}");
    cy.get(".todo-list li:nth-child(2) .toggle").click();
  });

  it("should filter All todo list", () => {
    cy.contains("All").click();
    cy.get(".todo-list li").should("have.length", 4);
  });
  it("should filter Active todo list", () => {
    cy.contains("Active").click();
    cy.get(".todo-list li").should("have.length", 3);
  });
  it("should filter Completed todo list", () => {
    cy.contains("Completed").click();
    cy.get(".todo-list li").should("have.length", 1);
  });
  it("should clear Completed todos", () => {
    cy.contains("Clear").click();
    cy.get(".todo-list li").should("have.length", 3);
  });
  it.only("should destroy all items", () => {
    cy.get(".todo-list li").each(($li, index, $list) => {
      cy.get(".destroy").click({ force: true, multiple: true });
    });
    cy.get(".todo-list li").should("have.length", 0);
  });
});
