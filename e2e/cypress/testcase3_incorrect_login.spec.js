const home = require('../pages/homePage')
const loginPage = require('../pages/loginPage')

describe('Test Case 3: Login User with incorrect email and password', () => {
  it('should show error for incorrect credentials', () => {
    const badEmail = `bad_${Date.now()}@example.com`
    const badPassword = 'wrongpassword'

    home.visit()
    home.getSignupLoginButton().click()

    loginPage.getLoginHeader().should('be.visible')
    loginPage.enterEmail(badEmail)
    loginPage.enterPassword(badPassword)
    loginPage.clickLogin()

    // The site shows: "Your email or password is incorrect!" in an alert or error element
    cy.contains(/your email or password is incorrect/i).should('be.visible')
  })
})