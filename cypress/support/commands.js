Cypress.Commands.add('loginForm', (username, password) => {    
    cy.get('[data-test="username"]')
        .clear()
        .type(username);

    cy.get('[data-test="password"]')
        .clear()
        .type(password);

    cy.get('[data-test="login-button"]').click();
});

Cypress.Commands.add('shoppingForm', (firstName, lastName, postalCode) => {    
    cy.get('[data-test="firstName"]')
        .clear()
        .type(firstName);

    cy.get('[data-test="lastName"]')
        .clear()
        .type(lastName);

    cy.get('[data-test="postalCode"]')
        .clear()
        .type(postalCode);

    cy.get('[data-test="continue"]').click()
});

