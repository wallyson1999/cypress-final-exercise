const account = require('../pages/accountPage')

describe('Test Case 4: Logout User', () => {
  it('should login and then logout successfully', () => {
    const user = {
      name: 'LogoutUser',
      email: `logout_${Date.now()}@example.com`,
      password: 'Password123',
      title: 'Mr',
      dob: { day: '1', month: 'January', year: '1990' },
      newsletter: true,
      offers: true,
      address: {
        firstName: 'Logout',
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

    // register using reusable command
    cy.register(user)

    // verify logged in
    account.getLoggedInAs(user.name).should('be.visible')

    // click logout
    account.clickLogout()

    // after logout, the login page should be visible
    cy.contains(/login to your account/i).should('be.visible')
  })
})