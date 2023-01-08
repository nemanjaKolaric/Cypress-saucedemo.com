const customer = require('../fixtures/customer.json')
import homePage from '../pages/homePage.js'
import checkoutPage from '../pages/checkoutPage.js'

describe("Test suite - 'CHECKOUT: YOUR INFORMATION' page", () => {
    beforeEach(() => {
        cy.visit(Cypress.env("url"))
        cy.loginForm(Cypress.env("standard_user"), Cypress.env("password"))
        homePage.shoppingCartLink.click()
        checkoutPage.checkoutButton.click()
    })

    customer.forEach((data) => {
        it(`Filling customer informations ${data.info}`, () => {
            cy.shoppingForm(data.firstName, data.lastName, data.postalCode);
            cy.url().should('include', data.url);
            if (data.hasError) {
                checkoutPage.msgError.should('be.visible')
            }
        })
    })
})