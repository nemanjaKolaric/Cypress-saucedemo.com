import homePage from '../pages/homePage.js'

it("positive logout as standard_user", () => {
    cy.visit(Cypress.env("url"))
    cy.loginForm(Cypress.env("standard_user"), Cypress.env("password"))
    homePage.logOutLink()
    cy.url().should('eq', 'https://www.saucedemo.com/')
})