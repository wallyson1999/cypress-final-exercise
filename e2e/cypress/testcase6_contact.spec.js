const home = require('../pages/homePage')

describe('Test Case 6: Contact Us Form', () => {
  it('should submit contact us form and return to home', () => {
    home.visit()
    // click Contact Us - the site uses a top link 'Contact us'
    home.getContactUsButton().click()

    // Verify GET IN TOUCH is visible
    cy.contains(/get in touch/i).should('be.visible')

    // Fill form fields
    cy.get('input[name="name"]').type('Contact Tester')
    cy.get('input[name="email"]').type('contact_tester@example.com')
    cy.get('input[name="subject"]').type('Test subject')
    cy.get('textarea[name="message"]').type('This is a test message')

    // Upload a small file - create a simple fixture to upload
    const fileName = 'test-upload.txt'
    cy.writeFile(`cypress/fixtures/${fileName}`, 'hello')
    cy.get('input[name="upload_file"]').attachFile(fileName)

    // Submit
    cy.get('input[name="submit"]').click()

    // Handle alert - site presents an alert; accept it
    cy.on('window:alert', (txt) => {
      // assert alert content if needed
      expect(txt).to.match(/success! your details have been submitted successfully\./i)
    })

    // After closing alert, assert success message
    cy.contains(/success! your details have been submitted successfully\./i).should('be.visible')

    // Click Home button and verify landed home
    cy.contains('a', 'Home').click()
    cy.get('header').should('exist')
  })
})