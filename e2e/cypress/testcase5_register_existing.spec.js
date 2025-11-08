const home = require('../pages/homePage')
const signup = require('../pages/signupPage')
const account = require('../pages/accountPage')

function randomEmail() {
  return `exists_${Date.now()}@example.com`
}

describe('Test Case 5: Register User with existing email', () => {
  it("should show error when trying to register with an already registered email", () => {
    const user = {
      name: 'ExistingUser',
      email: randomEmail(),
      password: 'Password123',
      title: 'Mr',
      dob: { day: '1', month: 'January', year: '1990' },
      newsletter: true,
      offers: true,
      address: {
        firstName: 'Existing',
        lastName: 'User',
        company: 'ACME',
        address1: '123 Test St',
        address2: '',
        country: 'United States',
        state: 'CA',
        city: 'Los Angeles',
        zipcode: '90001',
        mobileNumber: '5551234567'
      }
    }

    // Register the user first
    cy.register(user)

    // Ensure we're logged in and then logout to attempt signup as a guest
    account.getLoggedInAs(user.name).should('be.visible')
    account.clickLogout()

    // Go to signup/login and attempt to sign up with the same email
    home.getSignupLoginButton().click()
    signup.getNewUserSignupHeader().should('be.visible')
    signup.enterName(user.name)
    signup.enterEmail(user.email)
    signup.clickSignup()

    // The application should show an error indicating the email already exists
    cy.contains(/email address already exist/i).should('be.visible')

    // Cleanup: login and delete the created account so subsequent runs are clean
    // Login
    // Use login form
    cy.loginUI(user.email, user.password)
    // Delete account
    account.clickDeleteAccount()
    account.getAccountDeletedMessage().should('be.visible')
  })
})