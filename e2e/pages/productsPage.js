class ProductDetailPage {
  getProductInformation() {
    return cy.get('.product-information')
  }

  getProductName() {
    return this.getProductInformation().find('h2')
  }

  getCategory() {
    return this.getProductInformation().contains(/category:/i)
  }

  getPrice() {
    return this.getProductInformation().contains(/price:/i)
  }

  getAvailability() {
    return this.getProductInformation().contains(/availability:/i)
  }

  getCondition() {
    return this.getProductInformation().contains(/condition:/i)
  }

  getBrand() {
    return this.getProductInformation().contains(/brand:/i)
  }

  addToCart() {
    // try to click common add-to-cart buttons
    cy.contains(/add to cart/i).click()
    // after adding, a modal usually appears with 'View Cart' or 'Continue Shopping'
    // prefer 'View Cart' to go to the cart page
    cy.get('body').then(($b) => {
      if ($b.find("a:contains('View Cart')").length) {
        cy.contains('a', /view cart/i).click()
      } else if ($b.find("button:contains('View Cart')").length) {
        cy.contains('button', /view cart/i).click()
      }
    })
  }
}

module.exports = new ProductDetailPage()