import React from "react"
import { Link } from 'gatsby'

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

class Button extends React.Component {

  componentDidMount() {
    this.stripe = window.Stripe(process.env.STRIPE_SECRET_KEY);
  }

  render() {
    return (
      <form onSubmit={event => {
        event.preventDefault();
        this.stripe
          .redirectToCheckout({
            items: [{ sku: 'sku_FZHfRgXFC38haf', quantity: 1 }],

            // Do not rely on the redirect to the successUrl for fulfilling
            // purchases, customers may not always reach the success_url after
            // a successful payment.
            // Instead use one of the strategies described in
            // https://stripe.com/docs/payments/checkout/fulfillment
            successUrl: 'http://localhost:8000/success',
            cancelUrl: 'http://localhost:8000/canceled',
          })
          .then(function (result) {
            if (result.error) {
              // If `redirectToCheckout` fails due to a browser or network
              // error, display the localized error message to your customer.
              var displayError = document.getElementById('error-message');
              displayError.textContent = result.error.message;
            }
          });
      }
      }>
        <button type="submit" >Buy Prodkt</button>
      </form>
    );
  }
}

const IndexPage = () => (
  <Layout>
    <script src="https://js.stripe.com/v3/"></script>
    <SEO title="Stark's Plastics" />
    <h1>Welcome to Stark's</h1>
    <p>This is our new website!.</p>
    <Button />

    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export default IndexPage
