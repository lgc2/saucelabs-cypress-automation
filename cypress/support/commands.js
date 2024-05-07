Cypress.Commands.add('login', (userName, password) => {
    cy.get('[data-test=username]')
        .clear()
        .type(userName)
        .should('have.value', userName)

    cy.get('[data-test="password"]')
        .clear()
        .type(password)
        .should('have.value', password)

    cy.get('[data-test="login-button"]')
        .click()
})

Cypress.Commands.add('logout', () => {
    cy.get('#react-burger-menu-btn')
        .should('be.visible')
        .click()

    cy.get('[data-test="logout-sidebar-link"]')
        .should('be.visible')
        .click()
})