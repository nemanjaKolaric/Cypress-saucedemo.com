import loginPage from '../pages/loginPage.js'
const user = require('../fixtures/users.json')

describe("Login test suite", () => {
    beforeEach(() => {
        cy.visit(Cypress.env("url"))
    })

    user.forEach((data) => {
        it(`Login with ${data.credential}: ${data.username}`, () => {
            cy.loginForm(data.username, data.password)
            cy.url().should('include', data.url)
            if (data.hasError) {
                loginPage.msgError.should('be.visible')
            }
        })
    })
})