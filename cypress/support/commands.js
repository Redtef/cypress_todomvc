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