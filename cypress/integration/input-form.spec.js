describe("Input form", () => {
  const todoText1 = "Finish tp";
  const todoText2 = "Practice clean code";
  const todoText3 = "Learn ES6";
  const todoText4 = "Learn Cypress";

  beforeEach(() => {
    cy.visit("/");
  });

  it("Selects the todos input", () => {
    cy.focused().should("have.class", "new-todo");
  });

  it("accepts input", () => {
    cy.get(".new-todo").type(todoText4).should("have.value", todoText4);
  });

  context("Form submission", () => {
    it("Adds 1 new todo on submit", () => {
      cy.get(".new-todo")
        .type(todoText1)
        .type("{enter}")
        .should("have.value", "");
      cy.get(".todo-list li")
        .should("have.length", 1)
        .and("contain", todoText1);
    });

    it.only("Show number of todos in footer", () => {
      cy.get(".new-todo")
        .type(todoText1)
        .type("{enter}")
        .should("have.value", "");
      cy.get(".new-todo")
        .type(todoText2)
        .type("{enter}")
        .should("have.value", "");
      cy.get(".todo-count").should("contain", 2);
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

  context("List items actions", () => {
    it("check if remove button is not visible", () => {
      cy.get(".new-todo")
        .type(todoText4)
        .type("{enter}")
        .should("have.value", "");
      cy.get(`.todo-list li`).eq(0).find(".destroy").should("not.be.visible");
    });

    it("checks if the remove button is hidden", () => {
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
      cy.get(`.todo-list li`).find(".destroy").should("not.visible");
    });

    it("shows the remove button on hover", () => {
      cy.get(".new-todo")
        .type(todoText4)
        .type("{enter}")
        .should("have.value", "");
      cy.get(`.todo-list li`)
        .eq(0)
        .get(".destroy")
        .invoke("show")
        .should("be.visible");
    });

    it("Removes 1 element", () => {
      cy.get(".new-todo")
        .type(todoText4)
        .type("{enter}")
        .should("have.value", "");
      cy.get(`.todo-list li`).eq(0).get(".destroy").invoke("show").click();
    });

    it("Removes multiple elements", () => {
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
      cy.get(`.todo-list li`).eq(2).find(".destroy").invoke("show").click();
      cy.get(`.todo-list li`).contains(todoText3).should("not.exist");

      cy.get(`.todo-list li`).eq(1).find(".destroy").invoke("show").click();
      cy.get(`.todo-list li`).contains(todoText2).should("not.exist");
      cy.get(`.todo-list li`).should("have.length", 1);
    });
  });
});
