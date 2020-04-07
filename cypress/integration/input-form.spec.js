describe("Input form", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  context("Todo addition", () => {
    it("Should add new todo", () => {
      const todoText = "Finish tp";
      insertTodoFromList([todoText]);
      cy.get(".todo-list li").should("have.length", 1).and("contain", todoText);
    });

    it("Should add multiple new todos", () => {
      const todoText1 = "Finish tp";
      const todoText2 = "Practice clean code";
      const todoText3 = "Learn ES6";
      const todoText4 = "Learn Cypress";

      insertTodoFromList([todoText1, todoText2, todoText3, todoText4]);
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
      const todoText1 = "Finish tp";
      insertTodoFromList([todoText1]);
      deleteElements([todoText1]);
      cy.get(".todo-list").find("li").should("have.length", 0);
    });

    it("Removes multiple elements", () => {
      const todoText1 = "Finish tp";
      const todoText2 = "Practice clean code";
      const todoText3 = "Learn ES6";
      const todoText4 = "Learn Cypress";

      insertTodoFromList([todoText1, todoText2, todoText3, todoText4]);

      deleteElements([todoText1, todoText2]);
      shouldElementNotContains('.todo-list li',[todoText1, todoText2])
      cy.get(`.todo-list li`)
        .should("have.length", 2)
        .and("contain", todoText3)
        .and("contain", todoText4);
    });
  });
});

function shouldElementNotContains(element,todoList){
  for (const todo of todoList) {
    cy.get(element).contains(todo).should("not.exist");
  }
}

function deleteElements(todoList){
  for (const todo of todoList) {
    cy.get(`.todo-list li`)
        .contains(todo)
        .parent()
        .find(".destroy")
        .invoke("show")
        .click();
  }
}
function insertTodoFromList(todoList) {
  for (const todo of todoList) {
    cy.get(".new-todo").type(todo).type("{enter}");
  }
}
