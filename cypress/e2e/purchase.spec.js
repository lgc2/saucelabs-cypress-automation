/// <reference types="cypress" />

import standardUserData from '../fixtures/standard-user-data.json'
import purchaseData from '../fixtures/purchase-data.json'

describe('purchase flow tests', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('baseUrl'))
  })

  it('should complete the purchase flow successfully', () => {
    cy.login(standardUserData.userName, standardUserData.password)

    // verify if the first product is the one I expect
    cy.get('.inventory_item_name').first().invoke('text').then((productTitle) => {
      if (productTitle !== purchaseData.products[0].name) {
        cy.fail(`The first product is not ${purchaseData.products[0].name}`)
      }
    })

    // add the first product to the shopping cart
    cy.get(`[data-test="add-to-cart-sauce-labs-${purchaseData.products[0].selector}"]`)
      .click()

    // access the cart page and verify if the product is there
    cy.get('[data-test="shopping-cart-link"]')
      .click()

    cy.get('[data-test="inventory-item"]')
      .its('length')
      .should('eq', purchaseData.products.length)

    cy.get('[data-test="inventory-item-name"]')
      .should('be.visible')
      .and('have.text', purchaseData.products[0].name)

    cy.get('[data-test="inventory-item-price"]')
      .should('be.visible')
      .and('contain.text', purchaseData.products[0].price)

    cy.get('[data-test="checkout"]')
      .click()

    // fill out the checkout information
    cy.get('[data-test="firstName"]')
      .clear()
      .type(purchaseData.firstName)
      .should('have.value', purchaseData.firstName)

    cy.get('[data-test="lastName"]')
      .clear()
      .type(purchaseData.lastName)
      .should('have.value', purchaseData.lastName)

    cy.get('[data-test="postalCode"]')
      .clear()
      .type(purchaseData.zipCode)
      .should('have.value', purchaseData.zipCode)

    cy.get('[data-test="continue"]')
      .click()

    // validate informations on the checkout step 2 page
    cy.get('[data-test="inventory-item-name"]')
      .should('be.visible')
      .and('have.text', purchaseData.products[0].name)

    cy.get('[data-test="subtotal-label"]')
      .should('be.visible')
      .and('contain.text', purchaseData.products[0].price)

    cy.get('[data-test="tax-label"]')
      .should('be.visible')
      .and('contain.text', purchaseData.tax)

    cy.get('[data-test="total-label"]')
      .should('be.visible')
      .and('contain.text', purchaseData.total)

    cy.get('[data-test="finish"]')
      .click()

    // validate that the purchase is complete
    cy.url().should('eq', `${Cypress.env('baseUrl')}/checkout-complete.html`)

    cy.get('[data-test="complete-header"]')
      .should('be.visible')
      .and('have.text', 'Thank you for your order!')
  })
})
