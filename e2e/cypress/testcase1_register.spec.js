const home = require('../pages/homePage')
const signup = require('../pages/signupPage')
const account = require('../pages/accountPage')

function randomEmail() {
  return `user_${Date.now()}@example.com`
}

describe('Test Case 1: Register User', () => {
  it('should register a new user and delete account', () => {
    home.visit()
    // Verify home page visible (check main slider or logo)
    cy.get('header').should('exist')
    cy.get('body').should('include.text', 'Home')

    home.getSignupLoginButton().click()
  signup.getNewUserSignupHeader().should('be.visible')

    const name = 'Test User'
    const email = randomEmail()
    signup.enterName(name)
    signup.enterEmail(email)
  signup.clickSignup()

  // Wait for registration form
  signup.getEnterAccountInformation().should('be.visible')

  // Title radio may be present as name attributes
  signup.selectTitleMr()
    signup.enterPassword('Password123')
    signup.selectDOB('1', 'January', '2000')
    signup.checkNewsletter()
    signup.checkOffers()

    signup.fillAddress({
      firstName: 'Test',
      lastName: 'User',
      company: 'ACME',
      address1: '123 Main St',
      address2: 'Suite 1',
      country: 'United States',
      state: 'CA',
      city: 'Los Angeles',
      zipcode: '90001',
      mobileNumber: '5551234567'
    })

    signup.clickCreateAccount()

    signup.getAccountCreatedMessage().should('be.visible')
    signup.clickContinue()

    // Confirm logged in
    account.getLoggedInAs('Test User').should('be.visible')

    account.clickDeleteAccount()
    account.getAccountDeletedMessage().should('be.visible')
    // click continue after deletion
    cy.contains('a', 'Continue').click()
  })
})