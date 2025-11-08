import './commands'
import 'cypress-file-upload'
// register mochawesome reporter (adds screenshots metadata to results)
import 'cypress-mochawesome-reporter/register'

// Optionally set up global hooks
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false
})