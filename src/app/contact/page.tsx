'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Send, CheckCircle2, AlertCircle, Moon, MessageSquare, Flag } from 'lucide-react';

export default function ContactPage() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const hotelQuery = searchParams.get('hotel');

  const defaultSubject =
    type === 'correction' && hotelQuery
      ? `Listing Correction Request: ${hotelQuery}`
      : type === 'suggestion'
      ? 'Hotel Sleep Audit Suggestion'
      : '';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState(defaultSubject);
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState(''); // Anti-bot field

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message, honeypot }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit message.');
      }

      setSuccess(data.message || 'Your message has been sent successfully.');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      {/* Page Header */}
      <div className="text-center space-y-3">
        <span className="text-xs uppercase tracking-widest font-semibold text-forest-800">
          Editorial & Reader Inquiries
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-forest-950">
          Contact Rest Atlas
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-600 max-w-xl mx-auto leading-relaxed">
          Submit a listing correction, recommend an exceptionally quiet property for an acoustic audit, or inquire with our editorial team.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-sand-200 shadow-soft space-y-6">
        {success && (
          <div className="p-4 rounded-2xl bg-forest-50 border border-forest-200 flex items-start space-x-3 text-forest-900 text-xs">
            <CheckCircle2 className="w-5 h-5 text-forest-700 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-sm block mb-0.5">Message Delivered</span>
              <p>{success}</p>
            </div>
          </div>
        )}

        {error && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 flex items-start space-x-3 text-red-900 text-xs">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-sm block mb-0.5">Submission Error</span>
              <p>{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 text-xs">
          {/* Honeypot field (hidden from real users) */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="hp_field">Do not fill this field</label>
            <input
              id="hp_field"
              type="text"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-charcoal-700 font-semibold mb-1.5">
                Your Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                className="w-full px-3.5 py-2.5 bg-sand-50/70 border border-sand-200 rounded-xl text-forest-950 placeholder-charcoal-400 focus:outline-none focus:border-forest-700 focus:bg-white transition-colors"
              />
            </div>

            <div>
              <label className="block text-charcoal-700 font-semibold mb-1.5">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@example.com"
                className="w-full px-3.5 py-2.5 bg-sand-50/70 border border-sand-200 rounded-xl text-forest-950 placeholder-charcoal-400 focus:outline-none focus:border-forest-700 focus:bg-white transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-charcoal-700 font-semibold mb-1.5">
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Listing Correction Request or Property Suggestion"
              className="w-full px-3.5 py-2.5 bg-sand-50/70 border border-sand-200 rounded-xl text-forest-950 placeholder-charcoal-400 focus:outline-none focus:border-forest-700 focus:bg-white transition-colors"
            />
          </div>

          <div>
            <label className="block text-charcoal-700 font-semibold mb-1.5">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Please provide specific details regarding the property, noise issues, bedding updates, or your inquiry..."
              className="w-full px-3.5 py-2.5 bg-sand-50/70 border border-sand-200 rounded-xl text-forest-950 placeholder-charcoal-400 focus:outline-none focus:border-forest-700 focus:bg-white transition-colors"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-6 py-3 bg-forest-800 hover:bg-forest-900 disabled:opacity-50 text-sand-50 font-semibold rounded-xl text-xs flex items-center justify-center space-x-2 transition-all shadow-soft"
            >
              {loading ? (
                <span>Transmitting message...</span>
              ) : (
                <>
                  <span>Send Message to Editorial Team</span>
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
