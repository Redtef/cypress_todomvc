describe("Input form", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Selects the todos input", () => {
    cy.focused().should("have.class", "new-todo");
  });

  it("accepts input", () => {
    const typedText = "Practice clean code";
    cy.get(".new-todo").type(typedText).should("have.value", typedText);
  });

  context("Form submission", () => {
    const todoText1 = "Finish tp";
    const todoText2 = "Practice clean code";
    const todoText3 = "Learn ES6";
    const todoText4 = "Learn Cypress";

    it("Adds 1 new todo on submit", () => {
      cy.get(".new-todo")
        .type(todoText1)
        .type("{enter}")
        .should("have.value", "");
      cy.get(".todo-list li")
        .should("have.length", 1)
        .and("contain", todoText1);
    });

    it("Adds multiple new todos", () => {
      cy.get(".new-todo")
        .type(todoText1)
        .type("{enter}")
        .should("have.value", "");
      cy.get(".new-todo")
        .type(todoText2)
        .type("{enter}")
        .should("have.value", "");
      cy.get(".new-todo")
        .type(todoText3)
        .type("{enter}")
        .should("have.value", "");
      cy.get(".new-todo")
        .type(todoText4)
        .type("{enter}")
        .should("have.value", "");

      cy.get(".todo-list li")
        .should("have.length", 4)
        .and("contain", todoText1)
        .and("contain", todoText2)
        .and("contain", todoText3)
        .and("contain", todoText4);
    });
  });
});
