const valid_data = require('../fixtures/valid_data.json')

describe("Adding and removing items", () => {
    beforeEach(() => {
        cy.visit(valid_data.base_url)
        cy.loginForm(valid_data.standard_user, valid_data.password)
    })

    it("user add item from home page", () => {
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('.shopping_cart_badge').should('exist')     
    })

    it("user remove item from home page", () => {
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('#remove-sauce-labs-backpack').click()
        cy.get('.shopping_cart_badge').should('not.exist')     
    })

    it("user add item from item page", () => {
        cy.get('.inventory_item:nth-child(1) .inventory_item_name').click()
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('.shopping_cart_badge').should('exist')     
    })

    it("user remove item from item page", () => {
        cy.get('.inventory_item:nth-child(1) .inventory_item_name').click()
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('#remove-sauce-labs-backpack').click()
        cy.get('.shopping_cart_badge').should('not.exist')     
    })

    it("user remove item from checkout page", () => {
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('.shopping_cart_link').click()
        cy.get('#remove-sauce-labs-backpack').click()
        cy.get('.shopping_cart_badge').should('not.exist')     
    })
})