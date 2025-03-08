import paypal from "paypal/checkout-server-sdk";

const environment = new paypal.core.SandboxEnvironment(
  process.env.CLIENT_ID_KEY,
  process.env.PAYPAL_SECRET_KEY
);
const client = new paypal.core.PayPalHttpClient(environment);

export default client;
