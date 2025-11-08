const home = require('../pages/homePage')
const products = require('../pages/productsPage')

describe('Test Case 9: Search Product', () => {
  it('should search for a product and show searched results', () => {
    home.visit()

    // verify home loaded
    cy.get('header').should('exist')

    // go to products
    products.clickProducts()
    products.getAllProductsHeader().should('be.visible')

  // perform a search for a specific product term
  const term = 'Shirt'
    products.enterSearchTerm(term)
    products.clickSearchButton()

    // verify searched products header
    products.getSearchedProductsHeader().should('be.visible')

    // verify results exist
    products.getSearchedProductList().should('have.length.greaterThan', 0)

    // ensure the searched results contain the term 'Shirt' (case-insensitive)
    products.getSearchedProductList().then(($list) => {
      const combined = $list.text().toLowerCase()
      expect(combined).to.include(term.toLowerCase())
    })
  })
})