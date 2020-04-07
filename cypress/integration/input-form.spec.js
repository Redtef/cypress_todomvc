describe("Input form", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  context("Todo addition", () => {
    it("Should add new todo", () => {
      const todoText = "Finish tp";
      cy.insertTodos([todoText]);
      cy.get(".todo-list li").should("have.length", 1).and("contain", todoText);
    });

    it("Should add multiple new todos", () => {
      const todoText1 = "Finish tp";
      const todoText2 = "Practice clean code";
      const todoText3 = "Learn ES6";
      const todoText4 = "Learn Cypress";

      cy.insertTodos([todoText1, todoText2, todoText3, todoText4]);
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
      cy.insertTodos([todoText1]);
      cy.deleteTodos([todoText1]);
      cy.get(".todo-list").find("li").should("have.length", 0);
    });

    it("Removes multiple elements", () => {
      const todoText1 = "Finish tp";
      const todoText2 = "Practice clean code";
      const todoText3 = "Learn ES6";
      const todoText4 = "Learn Cypress";

      cy.insertTodos([todoText1, todoText2, todoText3, todoText4]);

      cy.deleteTodos([todoText1, todoText2]);
      cy.shouldElementNotContains('.todo-list li',[todoText1, todoText2])
      cy.get(`.todo-list li`)
        .should("have.length", 2)
        .and("contain", todoText3)
        .and("contain", todoText4);
    });
  });
});





