import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import crypto from 'node:crypto';
import PaytmChecksum from 'paytmchecksum';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 4000);

const paytmEnvironment = process.env.PAYTM_ENV === 'production' ? 'production' : 'staging';
const paytmConfig = {
  mid: process.env.PAYTM_MID?.trim() || '',
  merchantKey: process.env.PAYTM_MERCHANT_KEY?.trim() || '',
  website: process.env.PAYTM_WEBSITE?.trim() || (paytmEnvironment === 'production' ? 'DEFAULT' : 'WEBSTAGING'),
  merchantName: process.env.PAYTM_MERCHANT_NAME?.trim() || 'Sujoy Portfolio',
  environment: paytmEnvironment,
};

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function isPaytmConfigured() {
  return Boolean(paytmConfig.mid && paytmConfig.merchantKey);
}

function getGatewayBaseUrl() {
  return paytmConfig.environment === 'production'
    ? 'https://securegw.paytm.in'
    : 'https://securegw-stage.paytm.in';
}

function getCheckoutScriptUrl() {
  return `${getGatewayBaseUrl()}/merchantpgpui/checkoutjs/merchants/${paytmConfig.mid}.js`;
}

function getApiBaseUrl() {
  return getGatewayBaseUrl();
}

function getCallbackUrl(orderId, callbackBaseUrl) {
  const baseUrl = callbackBaseUrl || process.env.PAYTM_CALLBACK_BASE_URL || 'http://localhost:5173';
  const url = new URL('/payment-status', baseUrl);
  url.searchParams.set('orderId', orderId);
  return url.toString();
}

function getCustomerId() {
  return `CUST_${crypto.randomUUID().replace(/-/g, '').slice(0, 18)}`;
}

function createOrderId() {
  return `ORDER_${Date.now()}_${crypto.randomUUID().replace(/-/g, '').slice(0, 8)}`;
}

function formatAmount(amount) {
  const parsedAmount = Number(amount);

  if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
    throw new Error('Amount must be greater than zero.');
  }

  return parsedAmount.toFixed(2);
}

async function postToPaytm(url, body) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.body?.resultInfo?.resultMsg || data?.resultInfo?.resultMsg || 'Paytm request failed.');
  }

  return data;
}

app.get('/api/health', (_request, response) => {
  response.json({ ok: true });
});

app.get('/api/payments/paytm/config', (_request, response) => {
  response.json({
    enabled: isPaytmConfigured(),
    environment: paytmConfig.environment,
    merchantName: paytmConfig.merchantName,
    mid: paytmConfig.mid || null,
    scriptUrl: isPaytmConfigured() ? getCheckoutScriptUrl() : null,
  });
});

app.post('/api/payments/paytm/initiate', async (request, response) => {
  if (!isPaytmConfigured()) {
    response.status(400).json({ message: 'Paytm is not configured. Add PAYTM_MID and PAYTM_MERCHANT_KEY in the server environment.' });
    return;
  }

  try {
    const { amount, serviceName, customer = {}, callbackBaseUrl, metadata = {} } = request.body;
    const orderId = createOrderId();
    const formattedAmount = formatAmount(amount);
    const customerId = customer.customerId?.trim() || getCustomerId();

    const paytmBody = {
      requestType: 'Payment',
      mid: paytmConfig.mid,
      websiteName: paytmConfig.website,
      orderId,
      callbackUrl: getCallbackUrl(orderId, callbackBaseUrl),
      txnAmount: {
        value: formattedAmount,
        currency: 'INR',
      },
      userInfo: {
        custId: customerId,
        firstName: customer.name?.trim() || undefined,
        email: customer.email?.trim() || undefined,
        mobile: customer.phone?.trim() || undefined,
      },
      extendInfo: {
        udf1: serviceName?.toString().slice(0, 99) || 'Portfolio Service',
        udf2: metadata?.hours ? `Hours:${metadata.hours}` : 'Standard',
      },
    };

    const signature = await PaytmChecksum.generateSignature(JSON.stringify(paytmBody), paytmConfig.merchantKey);
    const initiateUrl = `${getApiBaseUrl()}/theia/api/v1/initiateTransaction?mid=${paytmConfig.mid}&orderId=${orderId}`;
    const data = await postToPaytm(initiateUrl, {
      body: paytmBody,
      head: {
        signature,
      },
    });

    const txnToken = data?.body?.txnToken;

    if (!txnToken) {
      throw new Error(data?.body?.resultInfo?.resultMsg || 'Paytm did not return a transaction token.');
    }

    response.json({
      orderId,
      txnToken,
      amount: formattedAmount,
      mid: paytmConfig.mid,
      callbackUrl: paytmBody.callbackUrl,
      resultInfo: data?.body?.resultInfo || null,
    });
  } catch (error) {
    response.status(500).json({
      message: error instanceof Error ? error.message : 'Unable to initiate Paytm payment.',
    });
  }
});

app.get('/api/payments/paytm/status/:orderId', async (request, response) => {
  if (!isPaytmConfigured()) {
    response.status(400).json({ message: 'Paytm is not configured. Add PAYTM_MID and PAYTM_MERCHANT_KEY in the server environment.' });
    return;
  }

  try {
    const { orderId } = request.params;
    const statusBody = {
      mid: paytmConfig.mid,
      orderId,
    };
    const signature = await PaytmChecksum.generateSignature(JSON.stringify(statusBody), paytmConfig.merchantKey);
    const statusUrl = `${getApiBaseUrl()}/v3/order/status`;
    const data = await postToPaytm(statusUrl, {
      body: statusBody,
      head: {
        signature,
      },
    });

    response.json({
      orderId,
      status: data?.body?.resultInfo?.resultStatus || data?.body?.txnStatus || 'PENDING',
      data,
    });
  } catch (error) {
    response.status(500).json({
      message: error instanceof Error ? error.message : 'Unable to fetch Paytm payment status.',
    });
  }
});

app.listen(port, () => {
  console.log(`Paytm backend listening on http://localhost:${port}`);
});