const home = require('../pages/homePage')
const products = require('../pages/productsPage')
const productDetail = require('../pages/productDetailPage')
const cart = require('../pages/cartPage')
const checkout = require('../pages/checkoutPage')

describe('Test Case 15: Place Order - Register before Checkout', () => {
  it('registers a user, adds product to cart, checks out and places an order', () => {
    // create a user object for registration
    const user = {
      name: `user${Date.now()}`,
      email: `user${Date.now()}@example.com`,
      password: 'Password123!',
      title: 'Mr',
      dob: { day: '1', month: 'January', year: '1990' },
      newsletter: false,
      offers: false,
      address: {
        firstName: 'Test',
        lastName: 'User',
        company: 'Company',
        address1: 'Street 1',
        address2: 'Apt 2',
        country: 'Canada',
        state: 'State',
        city: 'City',
        zipcode: '00000',
        mobileNumber: '1234567890'
      }
    }

    // register via custom command
    cy.register(user)

    // go to products page and add the first product to cart
    products.clickProducts()
    products.getAllProductsHeader().should('be.visible')
    products.clickViewProduct(0)

    // ensure product detail visible then add to cart
    productDetail.getProductName().should('be.visible')
    productDetail.addToCart()

    // if the modal did not navigate, ensure we can visit cart via nav
    cy.url().then((u) => {
      if (!/view_cart|cart/.test(u)) {
        cy.contains('a', /cart/i).click()
      }
    })

    // verify cart and proceed to checkout
    cart.getCartHeader().should('be.visible')
    cart.getCartItems().should('have.length.greaterThan', 0)
    cart.clickProceedToCheckout()

    // verify checkout sections
    checkout.getAddressDetails().should('be.visible')
    checkout.getReviewYourOrder().should('be.visible')

    // enter a comment and place order
    checkout.enterOrderComment('Please deliver between 9am-5pm')
    checkout.clickPlaceOrder()

    // fill payment details (test card)
    checkout.enterCardDetails({
      name: `${user.name}`,
      number: '4242424242424242',
      cvc: '123',
      month: '12',
      year: '2025'
    })
    checkout.clickPayAndConfirm()

    // verify order placed - be permissive about exact phrasing
    cy.on('window:alert', (txt) => {
      expect(txt.toLowerCase()).to.include('order')
    })

    cy.contains(/your order has been placed successfully|order has been placed|order placed successfully|order placed/i, { timeout: 10000 }).should('be.visible')

    // cleanup: delete account
    cy.contains('a', /delete account/i).click()
    cy.contains(/account deleted/i).should('be.visible')
  })
})