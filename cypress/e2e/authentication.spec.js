/// <reference types="cypress" />

import standardUserData from '../fixtures/standard-user-data.json'

describe('authentication tests', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('baseUrl'))
  })

  it('should log in successfully', () => {
    cy.login(standardUserData.userName, standardUserData.password)

    // If login was successful, it should redirect to 'https://www.saucedemo.com/inventory.html'
    cy.url().should('equal', `${Cypress.env('baseUrl')}/inventory.html`)
  })

  it('should display the products page after logging in successfully', () => {
    cy.login(standardUserData.userName, standardUserData.password)

    /*
      If login was successful, it should redirect to 'https://www.saucedemo.com/inventory.html'
      and the title of the page shoud be 'Products'
      and it should have at least one product item
    */
    cy.url().should('equal', `${Cypress.env('baseUrl')}/inventory.html`)
    cy.get('.title').contains('Products').should('be.visible')
    cy.get('.inventory_item_name').should('have.length.greaterThan', 0)
  })

  it('should show an error message when logging in with invalid credentials', () => {
    const invalidCredentialsErrorMessage = "Epic sadface: Username and password do not match any user in this service"

    cy.login('invalidUsername', 'invalidPassword')

    /*
      If login was not successful, it shouldn't redirect to another page
      and it should show an error message
    */
    cy.url().should('equal', `${Cypress.env('baseUrl')}/`)
    cy.get('[data-test="error"]')
      .should('be.visible')
      .contains(invalidCredentialsErrorMessage)
  })

  it('should log out successfully', () => {
    cy.login(standardUserData.userName, standardUserData.password)
    cy.url().should('equal', `${Cypress.env('baseUrl')}/inventory.html`)

    cy.logout()
    cy.url().should('equal', `${Cypress.env('baseUrl')}/`)
  })
})
