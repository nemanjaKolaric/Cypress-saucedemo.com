class HomePage {

    get menuLink() {
        return cy.get('#react-burger-menu-btn')
    }

    get logoutLink() {
        return cy.get('#logout_sidebar_link')
    }

    get allItemsLink() {
        return cy.get('#inventory_sidebar_link')
    }

    get aboutLink() {
        return cy.get('#about_sidebar_link')
    }

    get addBackpack() {
        return cy.get('[data-test="add-to-cart-sauce-labs-backpack"]')
    }

    get removeBackpack() {
        return cy.get('#remove-sauce-labs-backpack')
    }

    get itemTitleBackpack() {
        return cy.get('.inventory_item:nth-child(1) .inventory_item_name')
    }

    get addBackLight() {
        return cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]')
    }

    get resetAppStateLink() {
        return cy.get('#reset_sidebar_link')
    }

    get shoppingCartBadge() {
        return cy.get('.shopping_cart_badge')
    }

    get shoppingCartLink() {
        return cy.get('.shopping_cart_link')
    }

    allItems() {
        this.itemTitleBackpack.click()
        this.menuLink.click()
        this.allItemsLink.click({ force: true })
    }

    logOut() {
        this.menuLink.click()
        this.logoutLink.click({ force: true })
    }

    resetAppState() {
        this.menuLink.click()
        this.resetAppStateLink.click({ force: true })
    }

}
export default new HomePage()