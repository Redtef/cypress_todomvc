Cypress.Commands.add("insertTodos", (todoList) => {
  for (const todo of todoList) {
    cy.get(".new-todo").type(todo).type("{enter}");
  }
});

Cypress.Commands.add("deleteTodos", (todoList) => {
  for (const todo of todoList) {
    cy.get(`.todo-list li`)
      .contains(todo)
      .parent()
      .find(".destroy")
      .invoke("show")
      .click();
  }
});
Cypress.Commands.add("shouldElementNotContains", (element,todoList) => {
    for (const todo of todoList) {
        cy.get(element).contains(todo).should("not.exist");
      }
  });
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
