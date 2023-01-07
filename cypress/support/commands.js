import loginPage from "../pages/loginPage.js";
import checkoutPage from "../pages/checkoutPage.js";

Cypress.Commands.add('loginForm', (username, password) => {
    loginPage.inputUsername
        .clear()
        .type(username);

    loginPage.inputPassword
        .clear()
        .type(password);

    loginPage.loginBtn
        .click();
});

Cypress.Commands.add('shoppingForm', (firstName, lastName, postalCode) => {
    checkoutPage.inputFirstName
        .clear()
        .type(firstName);

    checkoutPage.inputLastName
        .clear()
        .type(lastName);

    checkoutPage.inputPostalCode
        .clear()
        .type(postalCode);

        checkoutPage.continueButton
        .click();
});

