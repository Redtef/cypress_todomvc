describe("Input form", () => {
  const todoText1 = "Finish tp";
  const todoText2 = "Practice clean code";
  const todoText3 = "Learn ES6";
  const todoText4 = "Learn Cypress";


  //* split code into sections to avoid long files 
  //* avoid code duplication 
  //* tests start with should 
  //* find elements by content not by indice 
  //* use table of element to avoid adding 1 by 1 
  //* put cypress in test script
  //* remove tests not asked for 
  
  beforeEach(() => {
    cy.visit("/");
  });


  context("Form submission", () => {
    it("Should add new todo", () => {
      const todoList = [todoText1];
      insertTodoFromList(todoList);
      cy.get(".todo-list li")
        .should("have.length", 1)
        .and("contain", todoText1);
    });

    it("Should add multiple new todos", () => {
      const todoList = [todoText1,todoText2,todoText3,todoText4];
      insertTodoFromList(todoList);
      cy.get(".todo-list li")
        .should("have.length", 4)
        .and("contain", todoText1)
        .and("contain", todoText2)
        .and("contain", todoText3)
        .and("contain", todoText4);
    });
  });

  context("List items actions", () => {

    it("Removes 1 element", () => {
      const todoList = [todoText1];
      insertTodoFromList(todoList);
      cy.get(`.todo-list li`).eq(0).get(".destroy").invoke("show").click();
    });

    it("Removes multiple elements", () => {
      const todoList = [todoText1,todoText2,todoText3,todoText4];
      insertTodoFromList(todoList);
      cy.get(`.todo-list li`).eq(2).find(".destroy").invoke("show").click();
      cy.get(`.todo-list li`).contains(todoText3).should("not.exist");

      cy.get(`.todo-list li`).eq(1).find(".destroy").invoke("show").click();
      cy.get(`.todo-list li`).contains(todoText2).should("not.exist");
      cy.get(`.todo-list li`).should("have.length", 1);
    });
  });
});

function insertTodoFromList(todoList) {
  for (const todo of todoList) {
    cy.get(".new-todo")
    .type(todo)
    .type("{enter}")
  } 
}

