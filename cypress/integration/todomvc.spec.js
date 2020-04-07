/// <reference types='cypress' />
function shouldStateContainsList(itemState, list, listLength) {
  cy.contains(itemState).click();
  cy.get(".todo-list li").should("have.length", listLength);
  for (const item of list) {
    cy.get(".todo-list li").should("contain", item);
  }
}

function addNewItems(todos, itemNumberToBeComplete) {
  for (const todo of todos) {
    cy.get(".new-todo").type(todo).type("{enter}");
  }
  cy.get(
    ".todo-list li:nth-child(" + itemNumberToBeComplete + ") .toggle"
  ).click();
}

describe("All,Active,Completed list and the clear completed tests", () => {
  beforeEach(() => {
    cy.visit("http://todomvc.com/examples/jquery/#/all");
  });

  it("should filter the todo list as All,Active,Completed or clear all completed items", () => {
    addNewItems(["make dinner", "build app", "sleep", "clean the store"], 4);
    shouldStateContainsList(
      "All",
      ["make dinner", "build app", "sleep", "clean the store"],
      4
    );
    shouldStateContainsList("Active", ["make dinner", "build app", "sleep"], 3);
    shouldStateContainsList("Completed", ["clean the store"], 1);
    shouldStateContainsList("Clear", [], 0);
  });

  it("should destroy all items", () => {
    addNewItems(["make dinner", "build app", "sleep", "clear the store"], 2);
    cy.get(".todo-list li").each(() => {
      cy.get(".destroy").click({ force: true, multiple: true });
    });
    cy.get(".todo-list li").should("have.length", 0);
  });
});
