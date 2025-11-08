// Custom commands for the project
const signup = require('../pages/signupPage')
const loginPage = require('../pages/loginPage')
const home = require('../pages/homePage')

// register via UI using page objects
Cypress.Commands.add('register', (user) => {
  home.visit()
  home.getSignupLoginButton().click()
  signup.getNewUserSignupHeader().should('be.visible')
  signup.enterName(user.name)
  signup.enterEmail(user.email)
  signup.clickSignup()

  signup.getEnterAccountInformation().should('be.visible')
  if (user.title === 'Mr') signup.selectTitleMr()
  if (user.password) signup.enterPassword(user.password)
  if (user.dob) signup.selectDOB(user.dob.day, user.dob.month, user.dob.year)
  if (user.newsletter) signup.checkNewsletter()
  if (user.offers) signup.checkOffers()
  signup.fillAddress(user.address || {})
  signup.clickCreateAccount()
  signup.getAccountCreatedMessage().should('be.visible')
  signup.clickContinue()
})

// login via UI
Cypress.Commands.add('loginUI', (email, password) => {
  home.visit()
  home.getSignupLoginButton().click()
  loginPage.getLoginHeader().should('be.visible')
  loginPage.enterEmail(email)
  loginPage.enterPassword(password)
  loginPage.clickLogin()
})