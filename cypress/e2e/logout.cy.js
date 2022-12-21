const valid_data = require('../fixtures/valid_data.json')

describe("Valid logout", () => {
    it("as standard user", () => {
        cy.visit(valid_data.base_url)
        cy.loginForm(valid_data.standard_user, valid_data.password)
        cy.get('#react-burger-menu-btn').click()
        cy.get('#logout_sidebar_link').click({force:true})
        cy.url().should('eq', 'https://www.saucedemo.com/')
    })
})