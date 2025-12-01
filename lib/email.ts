import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

export async function sendAcknowledgmentEmail(to: string, name?: string) {
  const safeName = name && name.trim().length > 0 ? name : 'there';

  await transporter.sendMail({
    from: `"Midnight Horror Tales" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Thanks for reaching out to Midnight Horror Tales!',
    html: `
      <p>Hi ${safeName},</p>
      <p>Thank you for your message! Your mail reached the Midnight Horror corner safely.</p>
      <p>Right now the force is small, so replies might be a bit slow. You are not hanging in the void your message is saved and will be read and replied promptly.</p>
      <p>If you want a more informal conversation, you can always message me on <a href="https://in.pinterest.com/midnighthorrortales">Pinterest</a>. I usually reply whenever I'm awake and still fighting the demons.</p>
      <p>Thank you for your patience and for visiting Midnight Horror Tales.</p>
      <p>— Midnight Horror Tales</p>
    `,
  });
}

export async function sendOwnerNotification(params: {
  name?: string;
  email: string;
  message?: string;
}) {
  const { name, email, message } = params;
  const safeName = name && name.trim().length > 0 ? name : 'Unknown wanderer';

  await transporter.sendMail({
    from: `"Midnight Horror Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER, // you receive this
    subject: `New feedback from ${safeName}`,
    text: `
From: ${safeName} <${email}>

Message:
${message && message.trim().length > 0 ? message : '(no message provided)'}
    `.trim(),
  });
}
