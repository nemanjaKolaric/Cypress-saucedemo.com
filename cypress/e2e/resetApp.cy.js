const valid_data = require('../fixtures/valid_data.json')

describe("Reset application state", () => {
    it("after ordering two items", () => {
        cy.visit(valid_data.base_url)
        cy.loginForm(valid_data.standard_user, valid_data.password)
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
        cy.get('#react-burger-menu-btn').click()
        cy.get('#reset_sidebar_link').click({force:true})
        cy.get('.shopping_cart_badge').should('not.exist')
    })
})