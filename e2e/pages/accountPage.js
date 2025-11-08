class AccountPage {
  getLoggedInAs(username) {
    return cy.contains(`Logged in as ${username}`)
  }

  clickDeleteAccount() {
    cy.contains('a', 'Delete Account').click()
  }

  getAccountDeletedMessage() {
    return cy.contains('Account Deleted!')
  }

  clickLogout() {
    cy.contains('a', 'Logout').click()
  }
}

module.exports = new AccountPage()