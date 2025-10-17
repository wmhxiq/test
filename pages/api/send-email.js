import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, age, gender } = req.body;

  if (!name || !email || !age || !gender) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const msg = {
    to: email,
    from: process.env.FROM_EMAIL,
    subject: 'Thank you for your submission!',
    text: `Hi ${name},\n\nWe received your submission:\n- Age: ${age}\n- Gender: ${gender}\n\nThank you!`,
    html: `<p>Hi ${name},</p><p>We received your submission:</p><ul><li>Age: ${age}</li><li>Gender: ${gender}</li></ul><p>Thank you!</p>`
  };

  try {
    await sgMail.send(msg);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('[SendGrid Error]', error.response?.body || error);
    res.status(500).json({ error: 'Failed to send email' });
  }
}
