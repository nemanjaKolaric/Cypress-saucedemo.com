import homePage from '../pages/homePage.js'
import itemPage from '../pages/itemPage.js'
import checkoutPage from '../pages/checkoutPage.js'

describe("Adding and removing items", () => {
    beforeEach(() => {
        cy.visit(Cypress.env("url"))
        cy.loginForm(Cypress.env("standard_user"), Cypress.env("password"))
    })

    it("user add item from home page", () => {
        homePage.addBackpack.click()
        homePage.shoppingCartBadge.should('exist')
    })

    it("user remove item from home page", () => {
        homePage.addBackpack.click()
        homePage.removeBackpack.click()
        homePage.shoppingCartBadge.should('not.exist')
    })

    it("user add item from item page", () => {
        homePage.itemTitleBackpack.click()
        itemPage.addBackpack.click()
        homePage.shoppingCartBadge.should('exist')
    })

    it("user remove item from item page", () => {
        homePage.itemTitleBackpack.click()
        itemPage.addBackpack.click()
        itemPage.removeBackpack.click()
        homePage.shoppingCartBadge.should('not.exist')
    })

    it("user remove item from checkout page", () => {
        homePage.addBackpack.click()
        homePage.shoppingCartLink.click()
        checkoutPage.removeBackpack.click()
        homePage.shoppingCartBadge.should('not.exist')
    })
})