import loginPage from "../pages/loginPage.js";
import checkoutPage from "../pages/checkoutPage.js";

Cypress.Commands.add('loginForm', (username, password) => {
    if (username === "" && password === "") {
        loginPage.loginBtn.click();
    } else if (username === "") {
        loginPage.inputPassword.clear().type(password);
        loginPage.loginBtn.click();
    } else if (password === "") {
        loginPage.inputUsername.clear().type(username);
        loginPage.loginBtn.click();
    }
    else {
        loginPage.inputUsername.clear().type(username);
        loginPage.inputPassword.clear().type(password);
        loginPage.loginBtn.click();
    }
});

Cypress.Commands.add('shoppingForm', (firstName, lastName, postalCode) => {
    if (firstName === "" && lastName === "" && postalCode === "") {
        checkoutPage.continueButton.click();
    } else if (firstName === "" && lastName === "") {
        checkoutPage.inputPostalCode.clear().type(postalCode);
        checkoutPage.continueButton.click();
    } else if (firstName === "" && postalCode === "") {
        checkoutPage.inputLastName.clear().type(lastName);
        checkoutPage.continueButton.click();
    } else if (firstName === "") {
        checkoutPage.inputLastName.clear().type(lastName);
        checkoutPage.inputPostalCode.clear().type(postalCode);
        checkoutPage.continueButton.click();
    } else if (lastName === "" && postalCode === "") {
        checkoutPage.inputFirstName.clear().type(firstName);
        checkoutPage.continueButton.click();
    } else if (lastName === "") {
        checkoutPage.inputFirstName.clear().type(firstName);
        checkoutPage.inputPostalCode.clear().type(postalCode);
        checkoutPage.continueButton.click();
    } else if (postalCode === "") {
        checkoutPage.inputFirstName.clear().type(firstName);
        checkoutPage.inputLastName.clear().type(lastName);
        checkoutPage.continueButton.click();
    } else {
        checkoutPage.inputFirstName.clear().type(firstName);
        checkoutPage.inputLastName.clear().type(lastName);
        checkoutPage.inputPostalCode.clear().type(postalCode);
        checkoutPage.continueButton.click();
    }
});