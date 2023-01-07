import homePage from '../pages/homePage.js'

it("Reset aplication state after ordering two items as standard user", () => {
    cy.visit(Cypress.env("url"))
    cy.loginForm(Cypress.env("standard_user"), Cypress.env("password"))

    homePage.addBackpack.click()
    homePage.addBackLight.click()
   
    homePage.resetAppState()
    
    homePage.shoppingCartBadge.should('not.exist')
})