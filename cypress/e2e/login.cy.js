const valid_data = require('../fixtures/valid_data.json')
const invalid_data = require('../fixtures/invalid_data.json')

describe("Test Login Form", () => {
    beforeEach(() => {
        cy.visit(valid_data.base_url)
    })

    describe("Valid Login", () => {
        it("as standard user", () => {
            cy.loginForm(valid_data.standard_user, valid_data.password)

            cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')

            cy.get('.title').should('have.text', "Products")

            cy.get('#react-burger-menu-btn').click()
            cy.get('#logout_sidebar_link').should('exist')
        })

        it("as problem user", () => {
            cy.loginForm(valid_data.problem_user, valid_data.password)

            cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')
        })

        it("as performance glitch user", () => {
            cy.loginForm(valid_data.performance_glitch_user, valid_data.password)

            cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')
        })
    })

    describe("Invalid Login", () => {
        it("as locked out user", () => {
            cy.loginForm(valid_data.locked_out_user, valid_data.password)

            cy.get('[data-test="error"]')
                .should('have.text', 'Epic sadface: Sorry, this user has been locked out.')
        })

        it("wrong username", () => {
            cy.loginForm(invalid_data.wrong_username, valid_data.password)
            cy.get('[data-test="error"]')
                .should('have.text', 'Epic sadface: Username and password do not match any user in this service')
        })

        it("wrong password standard user", () => {
            cy.loginForm(valid_data.standard_user, invalid_data.wrong_password)
            cy.get('[data-test="error"]')
                .should('have.text', 'Epic sadface: Username and password do not match any user in this service')
        })

        it("wrong password problem user", () => {
            cy.loginForm(valid_data.problem_user, invalid_data.wrong_password)
            cy.get('[data-test="error"]')
                .should('have.text', 'Epic sadface: Username and password do not match any user in this service')
        })

        it("wrong password performance glitch user", () => {
            cy.loginForm(valid_data.performance_glitch_user, invalid_data.wrong_password)
            cy.get('[data-test="error"]')
                .should('have.text', 'Epic sadface: Username and password do not match any user in this service')
        })

        it("wrong username and password", () => {
            cy.loginForm(invalid_data.wrong_username, invalid_data.wrong_password)
            cy.get('[data-test="error"]')
                .should('have.text', 'Epic sadface: Username and password do not match any user in this service')
        })

        it("empty password field", () => {
            cy.get('[data-test="username"]')
                .type(valid_data.standard_user)

            cy.get('[data-test="password"]')
                .invoke('val', '')

            cy.get('[data-test="login-button"]').click()
            cy.get('[data-test="error"]')
                .should('have.text', 'Epic sadface: Password is required')
        })

        it("empty username field", () => {
            cy.get('[data-test="username"]')
                .clear()

            cy.get('[data-test="password"]')
                .type(valid_data.password)

            cy.get('[data-test="login-button"]').click()
            cy.get('[data-test="error"]')
                .should('have.text', 'Epic sadface: Username is required')
        })

        it("empty username and password fields", () => {
            cy.get('[data-test="username"]')
                .clear()

            cy.get('[data-test="password"]')
                .clear()

            cy.get('[data-test="login-button"]').click()
            cy.get('[data-test="error"]')
                .should('have.text', 'Epic sadface: Username is required')
        })
    })
})