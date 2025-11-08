const home = require('../pages/homePage')
const products = require('../pages/productsPage')
const detail = require('../pages/productDetailPage')

describe('Test Case 8: Verify All Products and product detail page', () => {
  it('should navigate to products and verify details for first product', () => {
    home.visit()

    // verify home loaded
    cy.get('header').should('exist')

    // go to products
    products.clickProducts()
    products.getAllProductsHeader().should('be.visible')

    // verify product list is visible and has at least one product
    products.getProductList().should('have.length.greaterThan', 0)

    // view first product
    products.clickViewProduct(0)

    // verify product detail page
    detail.getProductName().should('be.visible')

    // product information block should include category, availability, condition, brand and a price number
    detail.getProductInformation().invoke('text').then((text) => {
      const t = text.toLowerCase()
      expect(t).to.match(/category/) // category label should exist
      expect(t).to.match(/availability|in stock|out of stock/) // availability
      expect(t).to.match(/condition/) // condition
      expect(t).to.match(/brand/) // brand
      // price: look for at least one digit (price may be displayed without the label)
      expect(t).to.match(/\d/)
    })
  })
})