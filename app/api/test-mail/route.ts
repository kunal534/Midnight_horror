import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function GET() {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    // Try to send a test email to yourself
    await transporter.sendMail({
      from: `"Midnight Horror Tales" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // send to your own address for test
      subject: 'Test email from Midnight Horror Tales',
      text: 'If you see this, your Nodemailer SMTP setup is working!',
    });

    return NextResponse.json({ ok: true, message: 'Test mail sent successfully.' });
  } catch (error) {
    console.error('TEST MAIL ERROR:', error);
    return NextResponse.json({ ok: false, error: String(error) }, { status: 500 });
  }
}
