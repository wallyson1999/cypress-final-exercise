class CartPage {
  visit() {
    cy.contains('a', 'Cart').click()
  }

  getCartHeader() {
    return cy.contains(/cart/i)
  }

  clickProceedToCheckout() {
    // common button text variations
    cy.contains(/proceed to checkout/i).click()
  }

  getCartItems() {
    return cy.get('.cart_info, .cart_item, .table-condensed tbody tr')
  }
}

module.exports = new CartPage()