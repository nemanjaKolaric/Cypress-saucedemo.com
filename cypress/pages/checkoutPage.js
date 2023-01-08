class CheckoutPage {
    get checkoutButton() {
        return cy.get('[data-test="checkout"]')
    }

    get inputFirstName() {
        return cy.get('[data-test="firstName"]')
    }

    get inputLastName() {
        return cy.get('[data-test="lastName"]')
    }

    get inputPostalCode() {
        return cy.get('[data-test="postalCode"]')
    }

    get continueButton() {
        return cy.get('[data-test="continue"]')
    }

    get itemTotal() {
        return cy.get('.summary_subtotal_label')
    }

    get tax() {
        return cy.get('.summary_tax_label')
    }

    get total() {
        return cy.get('.summary_total_label')
    }

    get finishButton() {
        return cy.get('#finish')
    }

    get checkoutCompleteTitle() {
        return cy.get('.title')
    }

    get msgError() {
        return cy.get('[data-test="error"]')
    }

    get removeBackpack() {
        return cy.get('#remove-sauce-labs-backpack')
    }

}
export default new CheckoutPage()