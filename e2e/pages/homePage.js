class HomePage {
  visit() {
    cy.visit('/')
  }

  getSignupLoginButton() {
    return cy.contains('a', 'Signup / Login')
  }

  getContactUsButton() {
    return cy.contains('a', 'Contact us')
  }

  getProductsButton() {
    return cy.contains('a', 'Products')
  }
}

module.exports = new HomePage()