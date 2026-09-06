// src/components/Contact.jsx
import { useState } from 'react';
import { AnimatedButton } from './AnimatedButton';

function Field({ label, required, children, hint }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-[#F3F6FB]">
        {label}
        {required && <span className="ml-1 text-[#EF4444]">*</span>}
      </label>
      {children}
      {hint && <span className="text-xs text-[#5B677E]">{hint}</span>}
    </div>
  );
}

const inputClass =
  'w-full rounded-xl border border-[#1A2233] bg-[#0A0E17] px-4 py-3 text-sm text-[#F3F6FB] ' +
  'placeholder:text-[#5B677E] outline-none transition-colors focus:border-[#3B82F6] ' +
  'focus:ring-1 focus:ring-[#3B82F6]';

function TextInput(props) {
  return <input {...props} className={inputClass} />;
}

function TextArea(props) {
  return <textarea {...props} className={`${inputClass} resize-none`} />;
}

const initialForm = {
  fullName: '',
  phone: '',
  description: '',
};

export function Contact({ onNavigate }) {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const next = {};
    if (!form.fullName.trim()) next.fullName = 'Name is required';
    if (!form.phone.trim()) next.phone = 'Phone number is required';
    if (!form.description.trim()) next.description = 'Please add a short description';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/contact-messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const result = await res.json();

      if (result.success) setSubmitted(true);
      else setErrors(result.errors || {});
    } catch (err) {
      setErrors({ description: 'Something went wrong. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="mx-auto flex max-w-[720px] flex-col items-center px-4 sm:px-6 py-16 sm:py-24 text-center">
        <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#2F6FED] to-[#3B82F6] shadow-[0_0_35px_2px_rgba(47,111,237,0.5)]">
          <svg width="24" height="24" sm:width="30" sm:height="30" viewBox="0 0 24 24" fill="none">
            <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1 className="mt-5 sm:mt-6 text-2xl sm:text-[28px] font-extrabold text-[#F3F6FB]">
          Thanks, {form.fullName.split(' ')[0]}!
        </h1>
        <p className="mt-2 sm:mt-3 max-w-md text-sm sm:text-[15px] leading-relaxed text-[#93A0B8]">
          We've received your message and will reach out to you at{' '}
          <span className="text-[#6FA0FF]">{form.phone}</span> soon.
        </p>
        <div className="mt-6 sm:mt-8 flex flex-wrap gap-3 sm:gap-3.5">
          <AnimatedButton label="Back to Home" primary onClick={() => onNavigate('/')} />
          <AnimatedButton
            label="Send Another Message"
            onClick={() => {
              setForm(initialForm);
              setSubmitted(false);
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto max-w-[720px] px-4 sm:px-6 lg:px-0 pb-16 sm:pb-20 pt-8 sm:pt-10 sm:pt-14">
      <button
        onClick={() => onNavigate('/')}
        className="mb-4 sm:mb-6 flex items-center gap-1.5 text-sm font-medium text-[#93A0B8] transition-colors hover:text-[#F3F6FB]"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back to Home
      </button>

      <div className="inline-flex items-center gap-2 rounded-full border border-[#2F6FED]/20 bg-[#2F6FED]/[0.08] px-3 sm:px-[13px] py-1.5 sm:py-2">
        <span className="h-1.5 w-1.5 sm:h-[7px] sm:w-[7px] rounded-full bg-[#3B82F6]" />
        <span className="text-[9px] sm:text-[10.5px] font-bold tracking-wider text-[#93A0B8]">GET IN TOUCH</span>
      </div>

      <h1 className="mt-4 sm:mt-5 text-2xl sm:text-[32px] sm:text-[42px] font-extrabold leading-tight text-[#F3F6FB]">
        Let's Talk
        <span className="bg-gradient-to-r from-[#6FA0FF] to-[#A78BFA] bg-clip-text text-transparent">
          {' '}About Your Project
        </span>
      </h1>
      <p className="mt-2 sm:mt-3 max-w-lg text-sm sm:text-[15px] leading-relaxed text-[#93A0B8]">
        Leave us your name, number, and a quick note about what you need —
        we'll get back to you shortly.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 sm:mt-9 flex flex-col gap-5 sm:gap-6">
        <Field label="Full Name" required>
          <TextInput
            value={form.fullName}
            onChange={update('fullName')}
            placeholder="Your full name"
          />
          {errors.fullName && <span className="text-xs text-[#EF4444]">{errors.fullName}</span>}
        </Field>

        <Field label="Phone Number" required>
          <TextInput
            type="tel"
            value={form.phone}
            onChange={update('phone')}
            placeholder="03XX-XXXXXXX"
          />
          {errors.phone && <span className="text-xs text-[#EF4444]">{errors.phone}</span>}
        </Field>

        <Field label="What do you need help with?" required>
          <TextArea
            rows={4}
            sm:rows={5}
            value={form.description}
            onChange={update('description')}
            placeholder="Tell us briefly about your project or question…"
          />
          {errors.description && <span className="text-xs text-[#EF4444]">{errors.description}</span>}
        </Field>

        <AnimatedButton
          label={submitting ? 'Sending…' : 'Send Message'}
          primary
          onClick={handleSubmit}
          className="mt-2 w-full sm:w-fit justify-center"
        />
      </form>
    </div>
  );
}