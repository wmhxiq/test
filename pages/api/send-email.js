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
    to: email, // send to the person who filled out the form
    from: process.env.FROM_EMAIL,
    subject: 'Thank you for your submission!',
    text: `Hello ${name},\n\nThank you for submitting your information.\n\nAge: ${age}\nGender: ${gender}\n\nWe’ll be in touch!`,
    html: `<p>Hello ${name},</p><p>Thank you for submitting your information.</p><ul><li><strong>Age:</strong> ${age}</li><li><strong>Gender:</strong> ${gender}</li></ul><p>We’ll be in touch!</p>`
  };

  try {
    await sgMail.send(msg);
    return res.status(200).json({ success: true, message: 'Email sent!' });
  } catch (error) {
    console.error('[SendGrid Error]', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
