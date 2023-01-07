class HomePage {

    get hamburgerMenu() {
        return cy.get('#react-burger-menu-btn')
    }

    get logoutLink() {
        return cy.get('#logout_sidebar_link')
    }

    get addBackpack() {
        return cy.get('[data-test="add-to-cart-sauce-labs-backpack"]')
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

    logOutLink() {
        this.hamburgerMenu.click()
        this.logoutLink.click({ force: true })
    }

    resetAppState() {
        this.hamburgerMenu.click()
        this.resetAppStateLink.click({ force: true })
    }
    
}
export default new HomePage()