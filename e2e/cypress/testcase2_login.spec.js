const home = require('../pages/homePage')
const signup = require('../pages/signupPage')
const account = require('../pages/accountPage')

function randomEmail() {
  return `user_${Date.now()}@example.com`
}

describe('Test Case 2: Login User with correct email and password', () => {
  it('should login with correct credentials and delete account', () => {
    const user = {
      name: 'LoginUser',
      email: randomEmail(),
      password: 'Password123',
      title: 'Mr',
      dob: { day: '1', month: 'January', year: '1990' },
      newsletter: true,
      offers: true,
      address: {
        firstName: 'Login',
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

    // register via reusable command
    cy.register(user)

    // ensure logged in
    account.getLoggedInAs(user.name).should('be.visible')

    // logout
    account.clickLogout()

    // now login via UI using reusable command
    cy.loginUI(user.email, user.password)

    // verify logged in
    account.getLoggedInAs(user.name).should('be.visible')

    // Delete account
    account.clickDeleteAccount()
    account.getAccountDeletedMessage().should('be.visible')
  })
})