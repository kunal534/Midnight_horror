// 'use client';

// import { useState } from 'react';
// import './ContactForm.css';

// export default function ContactForm() {
//   const [form, setForm] = useState({
//     name: '',
//     email: '',
//     message: '',
//   });
//   const [status, setStatus] =
//     useState<'idle' | 'loading' | 'success' | 'error'>('idle');

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setStatus('loading');

//     try {
//       const res = await fetch('/api/contact', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           name: form.name,
//           email: form.email,
//           message: form.message,
//         }),
//       });

//       if (!res.ok) throw new Error('Request failed');

//       setStatus('success');
//       setForm({ name: '', email: '', message: '' });
//     } catch {
//       setStatus('error');
//     }
//   };

//   return (
//     <div className="contact-container">
//       <h2>Let the Abyss Answer Back</h2>
//       <p className="contact-subtitle">
//         Found a bug, a curse, or a whisper you need to purge? Leave your mark, and an answer will crawl back from the dark.
//       </p>

//       <form onSubmit={handleSubmit} className="contact-form">
//         <input
//           name="name"
//           type="text"
//           placeholder="Your name"
//           value={form.name}
//           onChange={handleChange}
//           required
//         />
//         <input
//           name="email"
//           type="email"
//           placeholder="Your email"
//           value={form.email}
//           onChange={handleChange}
//           required
//         />
//         <textarea
//           name="message"
//           placeholder="Your message (optional for now)"
//           value={form.message}
//           onChange={handleChange}
//           rows={4}
//         />

//         <button type="submit" disabled={status === 'loading'}>
//           {status === 'loading' ? 'Summoning…' : 'Send into the dark'}
//         </button>

//         {status === 'success' && (
//           <p className="contact-success">
//             Message sent. Check your inbox for a reply from the crypt.
//           </p>
//         )}
//         {status === 'error' && (
//           <p className="contact-error">
//             Something glitched in the shadows. Try again in a moment.
//           </p>
//         )}
//       </form>

//       <p className="contact-pinterest">
//         Prefer an informal chat? Message me on{' '}
//         <a
//           href="https://in.pinterest.com/midnighthorrortales"
//           target="_blank"
//           rel="noreferrer"
//         >
//           Pinterest
//         </a>
//         .
//       </p>
//     </div>
//   );
// }
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
      <h2>Let the Abyss Answer Back</h2>
      <p className="contact-subtitle">
        Found a broken ritual, a corrupted line of code, or a whisper gnawing at your mind? 
        Inscribe it below, and something wearing my name will answer from the dark.
      </p>

      <form onSubmit={handleSubmit} className="contact-form">
        <input
          name="name"
          type="text"
          placeholder="Your mortal name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Your summoning email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Your message to the void (optional)"
          value={form.message}
          onChange={handleChange}
          rows={4}
        />

        <button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Raising the dead…' : 'Cast it into the void'}
        </button>

        {status === 'success' && (
          <p className="contact-success">
            Your words sank into the abyss. Watch your inbox for a reply that should not exist.
          </p>
        )}
        {status === 'error' && (
          <p className="contact-error">
            The ritual faltered. The void rejected your offering. Try again before it notices you.
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
