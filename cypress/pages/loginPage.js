class LoginPage{
    get inputUsername(){
        return cy.get("#user-name")
    }

    get inputPassword() {
        return cy.get("#password")
    }

    get loginBtn() {
        return cy.get("#login-button")
    }

    get msgError(){
        return cy.get('[data-test="error"]')
    }

}
export default new LoginPage()