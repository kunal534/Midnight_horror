'use client';

import { useState } from 'react';
import './ContactForm.css';

export default function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] =
    useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });

      if (!res.ok) throw new Error('Request failed');

      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="contact-container">
      <h2>Speak to the Midnight Void</h2>
      <p className="contact-subtitle">
        Found a bug, have a suggestion, or just want to scream into the dark?
        Drop your details and I will get back when the demons sleep.
      </p>

      <form onSubmit={handleSubmit} className="contact-form">
        <input
          name="name"
          type="text"
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Your email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Your message (optional for now)"
          value={form.message}
          onChange={handleChange}
          rows={4}
        />

        <button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Summoning…' : 'Send into the dark'}
        </button>

        {status === 'success' && (
          <p className="contact-success">
            Message sent. Check your inbox for a reply from the crypt.
          </p>
        )}
        {status === 'error' && (
          <p className="contact-error">
            Something glitched in the shadows. Try again in a moment.
          </p>
        )}
      </form>

      <p className="contact-pinterest">
        Prefer an informal chat? Message me on{' '}
        <a
          href="https://in.pinterest.com/midnighthorrortales"
          target="_blank"
          rel="noreferrer"
        >
          Pinterest
        </a>
        .
      </p>
    </div>
  );
}
