const valid_data = require('../fixtures/valid_data.json')
const customer = valid_data.customer

describe("Shopping Process", () => {
    beforeEach(() => {
        cy.visit(valid_data.base_url)
        cy.loginForm(valid_data.standard_user, valid_data.password)
    })

    it("standard user buying two items", () => {
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
        cy.get('.shopping_cart_link').click()
        cy.get('[data-test="checkout"]').click()

        cy.get('[data-test="firstName"]').type(customer.first_name)
        cy.get('[data-test="lastName"]').type(customer.last_name)
        cy.get('[data-test="postalCode"]').type(customer.postal_code)
        cy.get('[data-test="continue"]').click()
        
        cy.get('.summary_subtotal_label')
            .should('have.text', 'Item total: $39.98')

        cy.get('.summary_tax_label')
            .should('have.text', 'Tax: $3.20')

        cy.get('.summary_total_label')
            .should('have.text', 'Total: $43.18')

        cy.get('[data-test="finish"]').click()
        cy.get('.title').should('have.text', 'Checkout: Complete!')
    })
})