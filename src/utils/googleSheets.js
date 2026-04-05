const CONTACT_URL = import.meta.env.VITE_GOOGLE_SHEET_CONTACT_URL;
const COLLAB_URL = import.meta.env.VITE_GOOGLE_SHEET_COLLAB_URL;

export async function submitContactForm(data) {
  if (!CONTACT_URL) throw new Error('Google Sheet contact URL not configured');
  const res = await fetch(CONTACT_URL, {
    method: 'POST',
    body: JSON.stringify({ ...data, timestamp: new Date().toISOString() }),
  });
  if (!res.ok) throw new Error('Submission failed');
  return res;
}

export async function submitCollabEmail(email) {
  if (!COLLAB_URL) throw new Error('Google Sheet collab URL not configured');
  const res = await fetch(COLLAB_URL, {
    method: 'POST',
    body: JSON.stringify({ email, timestamp: new Date().toISOString() }),
  });
  if (!res.ok) throw new Error('Submission failed');
  return res;
}
