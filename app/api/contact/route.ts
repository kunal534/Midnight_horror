import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/database';
import { Contact } from '@/models/Contact';
import { sendAcknowledgmentEmail, sendOwnerNotification } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    await connectDB();

    const update: any = {
      $setOnInsert: { firstContactDate: new Date() },
      $set: { name: name || '' },
    };

    if (message && typeof message === 'string' && message.trim().length > 0) {
      update.$push = {
        messages: { content: message.trim() },
      };
    }

    await Contact.updateOne({ email }, update, { upsert: true });

    // send emails in parallel
    await Promise.all([
      sendAcknowledgmentEmail(email, name),
      sendOwnerNotification({ name, email, message }),
    ]);

    return NextResponse.json(
      { success: true, message: 'Stored and emails sent' },
      { status: 200 }
    );
  } catch (err) {
    console.error('Contact API error >>>', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
