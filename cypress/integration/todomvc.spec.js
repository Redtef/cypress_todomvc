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
        .and("contain", "sleep");
    }
    if (filterType == "Completed") {
      cy.get(".todo-list li")
        .should("have.length", 1)
        .and("contain", "clean the store");
    }
    if (filterType == "Clear") {
      cy.get(".todo-list li .selected").should("have.length", 0);
    }
  }
  it("should filter the todo list as All,Active,Completed or clear all completed items", () => {
    filer("All");
    filer("Active");
    filer("Completed");
    filer("Clear");
  });

  it("should destroy all items", () => {
    cy.get(".todo-list li").each(() => {
      cy.get(".destroy").click({ force: true, multiple: true });
    });
    cy.get(".todo-list li").should("have.length", 0);
  });
});
