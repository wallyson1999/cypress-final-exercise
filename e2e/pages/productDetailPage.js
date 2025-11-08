class ProductsPage {
  clickProducts() {
    cy.contains('a', 'Products').click()
  }

  getAllProductsHeader() {
    // site shows 'All Products' heading
    return cy.contains(/all products/i)
  }

  getProductList() {
    // product list items - target product containers
    return cy.get('.features_items .col-sm-4')
  }

  clickViewProduct(index = 0) {
    // each product has 'View Product' link/button
    this.getProductList().eq(index).contains(/view product/i).click()
  }

  // Search helpers
  enterSearchTerm(term) {
    cy.get('#search_product').clear().type(term)
  }

  clickSearchButton() {
    cy.get('#submit_search').click()
  }

  getSearchedProductsHeader() {
    return cy.contains(/searched products/i)
  }

  getSearchedProductList() {
    // results are rendered in the same features_items list
    return cy.get('.features_items .col-sm-4')
  }
}

module.exports = new ProductsPage()

module.exports = new ProductDetailPage()