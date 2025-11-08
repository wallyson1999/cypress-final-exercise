const home = require('../pages/homePage')

describe('Test Case 10: Verify Subscription in home page', () => {
  it("should subscribe using the footer subscription input and show success message", () => {
    home.visit()

    // basic smoke to ensure page loaded
    cy.get('header').should('exist')

    // scroll to footer where the subscription widget is expected
    cy.get('footer').scrollIntoView()
    cy.contains(/subscription/i).should('be.visible')

    // create a unique email for the subscription
    const email = `test+subscribe+${Date.now()}@example.com`

    // track if an alert was shown (some implementations use an alert)
    let alertSeen = false
    cy.on('window:alert', (txt) => {
      alertSeen = true
      expect(txt.toLowerCase()).to.include('you have been successfully subscribed')
    })

    // within the footer, find an email input and the subscribe button and submit
    cy.get('footer').within(() => {
      // try to find common email input types
      cy.get('input[type="email"], input[type="text"]').first().type(email)

      // click the first visible button inside the footer (usually the subscribe arrow)
      cy.get('button[type="submit"], button').filter(':visible').first().click()
    })

    // if the site doesn't use an alert, verify the success message appears in the DOM
    cy.get('body').then(($b) => {
      if (!alertSeen) {
        expect($b.text().toLowerCase()).to.include('you have been successfully subscribed')
      }
    })
  })
})