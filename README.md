# Portfolio

React frontend plus a small Node.js backend for Paytm payment initiation and payment-status verification.

## Run Locally

1. Copy `.env.example` to `.env`.
2. Add your Paytm merchant credentials to `.env`.
3. Start both frontend and backend:

```bash
npm run dev:full
```

4. Open the Vite app URL, usually `http://localhost:5173`.

## Paytm Setup

Add these values in `.env`:

```env
VITE_API_BASE_URL=http://localhost:4000
PORT=4000
PAYTM_ENV=staging
PAYTM_MID=YOUR_PAYTM_MID
PAYTM_MERCHANT_KEY=YOUR_PAYTM_MERCHANT_KEY
PAYTM_WEBSITE=WEBSTAGING
PAYTM_MERCHANT_NAME=Sujoy Portfolio
PAYTM_CALLBACK_BASE_URL=http://localhost:5173
```

For production:

- change `PAYTM_ENV=production`
- use your live `PAYTM_MID`
- use your live `PAYTM_MERCHANT_KEY`
- set `PAYTM_WEBSITE=DEFAULT` unless Paytm gave you another website name
- set `PAYTM_CALLBACK_BASE_URL` to your live frontend domain

## Real Payment Flow

1. User selects a service in the React payment section.
2. React calls the Node backend at `/api/payments/paytm/initiate`.
3. Node signs the request with your Paytm merchant key and requests a `txnToken` from Paytm.
4. React loads Paytm CheckoutJS and opens the Paytm payment page.
5. User completes payment inside Paytm.
6. Paytm redirects back to `/payment-status?orderId=...`.
7. The payment status page calls `/api/payments/paytm/status/:orderId`.
8. Node verifies the order with Paytm and returns the real transaction state.

## What You Need To Do For Real Payments

1. Create or log into your Paytm Business account.
2. Get your staging MID and merchant key from the Paytm dashboard.
3. Put those values into `.env`.
4. Test in staging first using Paytm test instruments.
5. After Paytm approves your live account, replace staging credentials with production credentials.
6. Update your live callback URL in Paytm dashboard to match your deployed frontend domain.
7. Deploy the Node backend on a public HTTPS URL.
8. Keep the merchant key only on the backend, never in React.

## Commands

```bash
npm run dev
npm run server
npm run dev:full
npm run build
```
