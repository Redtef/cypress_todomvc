describe("Input form", () => {
  const todoText1 = "Finish tp";
  const todoText2 = "Practice clean code";
  const todoText3 = "Learn ES6";
  const todoText4 = "Learn Cypress";

  beforeEach(() => {
    cy.visit("/");
  });

  context("Todo addition", () => {
    it("Should add new todo", () => {
      const todoList = [todoText1];
      insertTodoFromList(todoList);
      cy.get(".todo-list li")
        .should("have.length", 1)
        .and("contain", todoText1);
    });

    it("Should add multiple new todos", () => {
      const todoList = [todoText1, todoText2, todoText3, todoText4];
      insertTodoFromList(todoList);
      cy.get(".todo-list li")
        .should("have.length", 4)
        .and("contain", todoText1)
        .and("contain", todoText2)
        .and("contain", todoText3)
        .and("contain", todoText4);
    });
  });

  context("Todo Deletion", () => {
    it("Removes 1 element", () => {
      const todoList = [todoText1];
      insertTodoFromList(todoList);
      cy.get(`.todo-list li`)
        .contains(todoText1)
        .get(".destroy")
        .invoke("show")
        .click();
      cy.get(".todo-list").find("li").should("have.length", 0);
    });

    it("Removes multiple elements", () => {
      const todoList = [todoText1, todoText2, todoText3, todoText4];
      insertTodoFromList(todoList);

      cy.get(`.todo-list li`)
        .contains(todoText1)
        .parent()
        .find(".destroy")
        .invoke("show")
        .click();
      cy.get(`.todo-list li`)
        .contains(todoText2)
        .parent()
        .find(".destroy")
        .invoke("show")
        .click();

      cy.get(`.todo-list li`).contains(todoText1).should("not.exist");
      cy.get(`.todo-list li`).contains(todoText2).should("not.exist");
      cy.get(`.todo-list li`).should("have.length", 2).and("contain",todoText3).and("contain",todoText4);
    });
  });
});

function insertTodoFromList(todoList) {
  for (const todo of todoList) {
    cy.get(".new-todo").type(todo).type("{enter}");
  }
}
