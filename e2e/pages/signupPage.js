class SignupPage {
  getNewUserSignupHeader() {
    return cy.contains('New User Signup!')
  }

  enterName(name) {
    cy.get('input[data-qa="signup-name"]').clear().type(name)
  }

  enterEmail(email) {
    cy.get('input[data-qa="signup-email"]').clear().type(email)
  }

  clickSignup() {
    cy.get('button[data-qa="signup-button"]').click()
  }

  getEnterAccountInformation() {
    // the site uses 'Enter Account Information' in uppercase sometimes; use case-insensitive match
    return cy.contains(/enter account information/i)
  }

  selectTitleMr() {
    cy.get('#id_gender1').check()
  }

  enterPassword(pw) {
    cy.get('#password').type(pw)
  }

  selectDOB(day, month, year) {
    // select by value or visible text
    cy.get('#days').select(String(day))
    cy.get('#months').select(month)
    cy.get('#years').select(String(year))
  }

  checkNewsletter() {
    cy.get('#newsletter').check()
  }

  checkOffers() {
    cy.get('#optin').check()
  }

  fillAddress(details) {
    if (details.firstName) cy.get('#first_name').type(details.firstName)
    if (details.lastName) cy.get('#last_name').type(details.lastName)
    if (details.company) cy.get('#company').type(details.company)
    if (details.address1) cy.get('#address1').type(details.address1)
    if (details.address2) cy.get('#address2').type(details.address2)
    if (details.country) cy.get('#country').select(details.country)
    if (details.state) cy.get('#state').type(details.state)
    if (details.city) cy.get('#city').type(details.city)
    if (details.zipcode) cy.get('#zipcode').type(details.zipcode)
    if (details.mobileNumber) cy.get('#mobile_number').type(details.mobileNumber)
  }

  clickCreateAccount() {
    cy.get('button[data-qa="create-account"]').click()
  }

  getAccountCreatedMessage() {
    return cy.contains('Account Created!')
  }

  clickContinue() {
    cy.contains('a', 'Continue').click()
  }
}

module.exports = new SignupPage()