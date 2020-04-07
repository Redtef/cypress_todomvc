/// <reference types='cypress' />
function filer(filterType) {
  cy.contains(filterType).click();
  if (filterType == "All") {
    cy.get(".todo-list li")
      .should("have.length", 4)
      .and("contain", "build app")
      .and("contain", "clean the store")
      .and("contain", "make dinner")
      .and("contain", "sleep");
  }
  if (filterType == "Active") {
    cy.get(".todo-list li")
      .should("have.length", 3)
      .and("contain", "build app")
      .and("contain", "make dinner")
      .and("contain", "sleep")
      .and("not.contain", "clean the store");
  }
  if (filterType == "Completed") {
    cy.get(".todo-list li")
      .should("have.length", 1)
      .and("contain", "clean the store")
      .and("not.contain", "build app")
      .and("not.contain", "sleep")
      .and("not.contain", "make dinner");
  }
  if (filterType == "Clear") {
    cy.get(".todo-list li").should("have.length", 0);
    cy.contains("All").click();
    cy.get(".todo-list li")
      .should("not.contain", "clear the store")
      .and("have.length", "3");
  }
}

describe("All,Active,Completed list and the clear completed tests", () => {
  beforeEach(() => {
    cy.visit("http://todomvc.com/examples/jquery/#/all");
  });

  it("should filter the todo list as All,Active,Completed or clear all completed items", () => {
    cy.get(".new-todo").type("build app{enter}");
    cy.get(".new-todo").type("clean the store{enter}");
    cy.get(".new-todo").type("make dinner{enter}");
    cy.get(".new-todo").type("sleep{enter}");
    cy.get(".todo-list li:nth-child(2) .toggle").click();

    filer("All");
    filer("Active");
    filer("Completed");
    filer("Clear");
  });

  it("should destroy all items", () => {
    cy.get(".new-todo").type("build app{enter}");
    cy.get(".new-todo").type("clean the store{enter}");
    cy.get(".new-todo").type("make dinner{enter}");
    cy.get(".new-todo").type("sleep{enter}");
    cy.get(".todo-list li:nth-child(2) .toggle").click();
    cy.get(".todo-list li").each(() => {
      cy.get(".destroy").click({ force: true, multiple: true });
    });
    cy.get(".todo-list li").should("have.length", 0);
  });
});
