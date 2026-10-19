import { NextRequest, NextResponse } from 'next/server';
import { getAdminFirestore, isAdminConfigured } from '@/lib/firebase/admin';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message, honeypot } = body;

    // 1. Honeypot anti-spam check: bots fill hidden honeypot fields
    if (honeypot && honeypot.trim() !== '') {
      return NextResponse.json({ success: true, message: 'Message received.' });
    }

    // 2. Server-side validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid full name.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    if (!subject || typeof subject !== 'string' || subject.trim().length < 3) {
      return NextResponse.json(
        { success: false, error: 'Please provide a subject.' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: 'Message must be at least 10 characters in length.' },
        { status: 400 }
      );
    }

    const contactEntry = {
      name: name.trim().slice(0, 100),
      email: email.trim().toLowerCase().slice(0, 150),
      subject: subject.trim().slice(0, 200),
      message: message.trim().slice(0, 3000),
      status: 'new',
      createdAt: new Date().toISOString(),
      userAgent: req.headers.get('user-agent') || 'unknown',
    };

    // If Firestore Admin is available, store in database
    if (isAdminConfigured()) {
      const firestore = getAdminFirestore();
      if (firestore) {
        await firestore.collection('contactMessages').add(contactEntry);
      }
    } else {
      console.log('[Rest Atlas Contact] In-memory message received:', contactEntry);
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you for reaching out. Your message has been received by the editorial team.',
    });
  } catch (err) {
    console.error('[Contact API Error]:', err);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred while processing your message.' },
      { status: 500 }
    );
  }
}
