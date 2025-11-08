class CheckoutPage {
  getAddressDetails() {
    return cy.contains(/address details/i)
  }

  getReviewYourOrder() {
    return cy.contains(/review your order/i)
  }

  enterOrderComment(text) {
    // try common textarea selectors
    cy.get('textarea[name="message"], textarea[name="comment"], textarea').first().type(text)
  }

  clickPlaceOrder() {
    cy.contains(/place order/i).click()
  }

  // payment form helpers
  enterCardDetails({ name, number, cvc, month, year }) {
    // pick inputs by name or placeholder - be permissive
    cy.get('input[name="name_on_card"], input[placeholder*="Name"], input[id*="name"]').first().type(name)
    cy.get('input[name="card_number"], input[placeholder*="Card"] , input[id*="card"]').first().type(number)
    cy.get('input[name="cvc"], input[placeholder*="CVC"], input[id*="cvc"]').first().type(cvc)
    cy.get('input[name="expiry_month"], input[placeholder*="Month"], input[id*="month"]').first().type(month)
    cy.get('input[name="expiry_year"], input[placeholder*="Year"], input[id*="year"]').first().type(year)
  }

  clickPayAndConfirm() {
    cy.contains(/pay and confirm order/i).click()
  }

  getOrderPlacedMessage() {
    return cy.contains(/your order has been placed successfully/i)
  }
}

module.exports = new CheckoutPage()