const data = require('../fixtures/customer.json')
const customer = data[0];
import homePage from '../pages/homePage.js'
import checkoutPage from '../pages/checkoutPage.js'

it("Successful shoping proces", () => {
    cy.visit(Cypress.env("url"))
    cy.loginForm(Cypress.env("standard_user"), Cypress.env("password"))

    homePage.addBackpack.click()
    homePage.addBackLight.click()
    homePage.shoppingCartLink.click()
    checkoutPage.checkoutButton.click()

    cy.shoppingForm(customer.firstName, customer.lastName, customer.postalCode)

    checkoutPage.itemTotal.should('have.text', 'Item total: $39.98')
    checkoutPage.tax.should('have.text', 'Tax: $3.20')
    checkoutPage.total.should('have.text', 'Total: $43.18')

    checkoutPage.finishButton.click()
    
    checkoutPage.checkoutCompleteTitle.should('have.text', 'Checkout: Complete!')
})
