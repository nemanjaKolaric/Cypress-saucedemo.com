class ItemPage {

    get addBackpack() {
        return cy.get('[data-test="add-to-cart-sauce-labs-backpack"]')
    }

    get removeBackpack() {
        return cy.get('#remove-sauce-labs-backpack')
    }
}
export default new ItemPage()