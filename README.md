rabalho Final - Cypress
This repository contains a Cypress project scaffolded for a page-object model structure and configured to run in GitHub Actions.

Quick start

Install dependencies:

npm install

Open Cypress UI:

npm run cy:open

Run tests headlessly:

npm test

CI

There's a GitHub Actions workflow in .github/workflows/cypress.yml to run tests on push and pull_request.

Project structure

cypress/pages - page objects
cypress/e2e - test specs
cypress/fixtures - test data
cypress/support - custom commands and global config
Feel free to ask for additional pages, tests, or CI customizations.