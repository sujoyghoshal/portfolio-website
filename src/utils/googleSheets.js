// Google Sheets via Apps Script — GET with URL params (most reliable, no CORS issues)
const SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL;

function postToSheet(params) {
  if (!SCRIPT_URL) throw new Error('VITE_APPS_SCRIPT_URL not set in .env');
  const url = new URL(SCRIPT_URL);
  Object.entries(params).forEach(([k, v]) => url.searchParams.append(k, v));
  return fetch(url.toString(), { method: 'GET', mode: 'no-cors' });
}

export async function submitContactForm({ name, email, subject, message }) {
  await postToSheet({
    sheet: 'ContactForm',
    timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    name,
    email,
    subject,
    message,
  });
}

export async function submitCollabEmail(email) {
  await postToSheet({
    sheet: 'CollabEmails',
    timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    email,
  });
}
