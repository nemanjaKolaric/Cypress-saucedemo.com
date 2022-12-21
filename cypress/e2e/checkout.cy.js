const valid_data = require('../fixtures/valid_data.json')
const customer = valid_data.customer

describe("Checkout process - test customer information form", () => {
    beforeEach(() => {
        cy.visit(valid_data.base_url)
        cy.loginForm(valid_data.standard_user, valid_data.password)
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('.shopping_cart_link').click()
        cy.get('[data-test="checkout"]').click()
    })

    describe("success checkout process", () => {
        it("valid data inserted", () => {
            cy.shoppingForm(customer.first_name, customer.last_name, customer.postal_code)

            cy.get('.title').should('have.text', 'Checkout: Overview')
        })
    })

    describe("fail checkout process", () => {
        it("all fields empty", () => {
            cy.get('[data-test="continue"]').click()

            cy.get('[data-test="error"]')
                .should('have.text', 'Error: First Name is required')

            cy.get('[data-test="firstName"]').should("have.class", "error")
            cy.get('[data-test="lastName"]').should("have.class", "error")
            cy.get('[data-test="postalCode"]').should("have.class", "error")
        })

        it("empty first name field", () => {
            cy.get('[data-test="firstName"]').clear()
            cy.get('[data-test="lastName"]').type(customer.last_name)
            cy.get('[data-test="postalCode"]').type(customer.postal_code)
            cy.get('[data-test="continue"]').click()

            cy.get('[data-test="error"]')
                .should('have.text', 'Error: First Name is required')

            cy.get('[data-test="firstName"]').should("have.class", "error")
            cy.get('[data-test="lastName"]').should("have.class", "error")
            cy.get('[data-test="postalCode"]').should("have.class", "error")
        })

        it("empty last name and postal code fields", () => {
            cy.get('[data-test="firstName"]').type(customer.first_name)
            cy.get('[data-test="lastName"]').clear()
            cy.get('[data-test="postalCode"]').clear()
            cy.get('[data-test="continue"]').click()

            cy.get('[data-test="error"]')
                .should('have.text', 'Error: Last Name is required')
            cy.get('[data-test="firstName"]').should("have.class", "error")
            cy.get('[data-test="lastName"]').should("have.class", "error")
            cy.get('[data-test="postalCode"]').should("have.class", "error")
        })

        it("empty postal code field", () => {
            cy.get('[data-test="firstName"]').type(customer.first_name)
            cy.get('[data-test="lastName"]').type(customer.last_name)
            cy.get('[data-test="postalCode"]').clear()
            cy.get('[data-test="continue"]').click()

            cy.get('[data-test="error"]')
                .should('have.text', 'Error: Postal Code is required')

            cy.get('[data-test="firstName"]').should("have.class", "error")
            cy.get('[data-test="lastName"]').should("have.class", "error")
            cy.get('[data-test="postalCode"]').should("have.class", "error")
        })
    })
})