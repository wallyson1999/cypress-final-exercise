class LoginPage {
  getLoginHeader() {
    return cy.contains('Login to your account')
  }

  enterEmail(email) {
    cy.get('input[data-qa="login-email"]').clear().type(email)
  }

  enterPassword(pw) {
    cy.get('input[data-qa="login-password"]').clear().type(pw)
  }

  clickLogin() {
    cy.get('button[data-qa="login-button"]').click()
  }
}

module.exports = new LoginPage()