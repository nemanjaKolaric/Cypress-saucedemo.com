import homePage from '../pages/homePage.js'

describe('Menu functionality test suite', () => {

    beforeEach(() => {
        cy.visit(Cypress.env("url"))
        cy.loginForm(Cypress.env("standard_user"), Cypress.env("password"))
    })

    it("All items link", () => {
        homePage.allItems()
        cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')
    })

    it("About link", () => {
        homePage.menuLink.click()
        homePage.aboutLink.should('have.attr', 'href', 'https://saucelabs.com/')
    })

    it("Logout link", () => {
        homePage.logOut()
        cy.url().should('eq', 'https://www.saucedemo.com/')
    })

    it("Reset aplication state link", () => {
        homePage.addBackpack.click()
        homePage.addBackLight.click()
        homePage.resetAppState()
        homePage.shoppingCartBadge.should('not.exist')
    })

})