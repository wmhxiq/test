import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Extract form data from the request
    const { name, email, age, gender } = req.body;

    // Validate form data
    if (!name || !email || !age || !gender) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', // Use your SMTP provider (Gmail here, for example)
      port: 587,
      secure: false, // Use TLS
      auth: {
        user: process.env.EMAIL_USER,  // Set this as an environment variable
        pass: process.env.EMAIL_PASS,  // Set this as an environment variable
      },
    });

    // Compose the email
    const mailOptions = {
      from: process.env.EMAIL_USER,  // sender address
      to: process.env.TO_EMAIL,      // recipient address
      subject: `New submission from ${name}`,
      text: `You have received a new submission:\n\nName: ${name}\nEmail: ${email}\nAge: ${age}\nGender: ${gender}`,
      html: `<p>You have received a new submission:</p>
             <ul>
               <li><strong>Name:</strong> ${name}</li>
               <li><strong>Email:</strong> ${email}</li>
               <li><strong>Age:</strong> ${age}</li>
               <li><strong>Gender:</strong> ${gender}</li>
             </ul>`,
    };

    // Send the email
    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Failed to send email' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
