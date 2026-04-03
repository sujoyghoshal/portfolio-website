import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Clock3, ReceiptText } from 'lucide-react';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

function getApiUrl(path) {
  return `${API_BASE_URL}${path}`;
}

function getStatusMeta(status) {
  if (status === 'TXN_SUCCESS' || status === 'S') {
    return {
      title: 'Payment successful',
      copy: 'Paytm has confirmed the transaction. You can now track the order from the transaction details below.',
      tone: 'success',
      Icon: CheckCircle2,
    };
  }

  if (status === 'PENDING') {
    return {
      title: 'Payment pending',
      copy: 'The payment is still being processed by Paytm. Refresh this page after a few seconds to check again.',
      tone: 'pending',
      Icon: Clock3,
    };
  }

  return {
    title: 'Payment not completed',
    copy: 'Paytm did not mark this payment as successful. Review the transaction details and try again if needed.',
    tone: 'failed',
    Icon: AlertCircle,
  };
}

export default function PaymentStatus() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [paymentData, setPaymentData] = useState(null);
  const orderId = searchParams.get('orderId');

  useEffect(() => {
    async function loadStatus() {
      if (!orderId) {
        setError('Missing order id. Start the Paytm checkout flow again from the payment section.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(getApiUrl(`/api/payments/paytm/status/${encodeURIComponent(orderId)}`));
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.message || 'Unable to verify Paytm payment status.');
        }

        setPaymentData(data);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Unable to verify Paytm payment status.');
      } finally {
        setLoading(false);
      }
    }

    loadStatus();
  }, [orderId]);

  const status = paymentData?.status || 'PENDING';
  const meta = getStatusMeta(status);
  const transaction = paymentData?.data?.body || {};
  const Icon = meta.Icon;

  return (
    <main className="payment-status-shell">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card payment-status-card"
      >
        <div className={`payment-status-badge is-${meta.tone}`}>
          <Icon size={18} /> {loading ? 'Checking status' : meta.title}
        </div>

        <h1 className="payment-status-title">Paytm Payment Status</h1>
        <p className="payment-status-copy">
          {loading ? 'Connecting to the Paytm transaction status API and verifying your order.' : meta.copy}
        </p>

        {error && <div className="payment-error-banner">{error}</div>}

        {!loading && paymentData && (
          <div className="payment-status-grid">
            <div className="card payment-status-panel">
              <div className="payment-status-panel-head">
                <ReceiptText size={18} /> Order Summary
              </div>
              <div className="payment-status-list">
                <div>
                  <span>Order ID</span>
                  <strong>{paymentData.orderId}</strong>
                </div>
                <div>
                  <span>Transaction Status</span>
                  <strong>{status}</strong>
                </div>
                <div>
                  <span>Amount</span>
                  <strong>{transaction.txnAmount ? `₹${transaction.txnAmount}` : 'Unavailable'}</strong>
                </div>
              </div>
            </div>

            <div className="card payment-status-panel">
              <div className="payment-status-panel-head">
                <CheckCircle2 size={18} /> Transaction Details
              </div>
              <div className="payment-status-list">
                <div>
                  <span>Transaction ID</span>
                  <strong>{transaction.txnId || 'Pending'}</strong>
                </div>
                <div>
                  <span>Payment Mode</span>
                  <strong>{transaction.paymentMode || 'Pending'}</strong>
                </div>
                <div>
                  <span>Gateway</span>
                  <strong>{transaction.gatewayName || 'Unavailable'}</strong>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="payment-status-actions">
          <Link to="/" className="orange-btn payment-status-btn">Back To Home</Link>
          {!loading && orderId && (
            <button type="button" className="outline-btn payment-status-btn" onClick={() => window.location.reload()}>
              Refresh Status
            </button>
          )}
        </div>
      </motion.section>
    </main>
  );
}