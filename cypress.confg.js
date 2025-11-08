const { defineConfig } = require('cypress')

module.exports = defineConfig({
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/results',
    overwrite: false,
    html: false,
    json: true
  },
  e2e: {
    baseUrl: 'http://automationexercise.com',
    specPattern: 'cypress/e2e/**/*.spec.{js,ts}',
    setupNodeEvents(on, config) {
      // intentionally not auto-registering cypress-mochawesome-reporter plugin here.
      // We generate reports via the npm scripts (mochawesome + mochawesome-merge + marge)
      return config
    }
  },
  video: false
})