import { useState } from 'react';
import { AnimatedButton } from './AnimatedButton';

const PROJECT_TYPES = [
  'Web Application',
  'Mobile App (iOS/Android)',
  'Desktop Application',
  'E-commerce / POS System',
  'Business Automation / ERP',
  'API / Backend Service',
  'Other',
];

const BUDGET_RANGES = [
  'Under $2,000',
  '$2,000 - $5,000',
  '$5,000 - $15,000',
  '$15,000 - $50,000',
  '$50,000+',
  'Not sure yet',
];

const TIMELINES = [
  'ASAP',
  '1 - 4 weeks',
  '1 - 3 months',
  '3 - 6 months',
  '6+ months',
  'Flexible',
];

const TECH_OPTIONS = [
  'Flutter',
  'React / Next.js',
  'Node.js',
  'Laravel',
  'Firebase',
  'MySQL / PostgreSQL',
  'No preference',
];

const PLATFORM_OPTIONS = ['Web', 'iOS', 'Android', 'Desktop (Windows/Mac)'];

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

function SelectInput({ options, placeholder, ...props }) {
  return (
    <select {...props} className={`${inputClass} appearance-none`}>
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}

function CheckboxPill({ label, checked, onChange }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className="flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors"
      style={{
        borderColor: checked ? '#3B82F6' : '#1A2233',
        backgroundColor: checked ? 'rgba(59,130,246,0.12)' : '#0A0E17',
        color: checked ? '#6FA0FF' : '#93A0B8',
      }}
    >
      <span
        className="flex h-4 w-4 items-center justify-center rounded-[4px] border text-[10px]"
        style={{
          borderColor: checked ? '#3B82F6' : '#5B677E',
          backgroundColor: checked ? '#3B82F6' : 'transparent',
        }}
      >
        {checked && (
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
            <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      {label}
    </button>
  );
}

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  company: '',
  projectType: '',
  platforms: [],
  budget: '',
  timeline: '',
  techPreferences: [],
  description: '',
  goals: '',
  hasExistingSystem: '',
  referenceLinks: '',
  files: [],
};

function toggleInArray(arr, value) {
  return arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
}

export function StartProject({ onNavigate }) {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const next = {};
    if (!form.fullName.trim()) next.fullName = 'Name is required';
    if (!form.email.trim()) next.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email';
    if (!form.projectType) next.projectType = 'Select a project type';
    if (!form.description.trim()) next.description = 'Please describe your requirement';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const fd = new FormData();
    fd.append('fullName', form.fullName);
    fd.append('email', form.email);
    fd.append('phone', form.phone);
    fd.append('company', form.company);
    fd.append('projectType', form.projectType);
    fd.append('platforms', JSON.stringify(form.platforms));
    fd.append('budget', form.budget);
    fd.append('timeline', form.timeline);
    fd.append('techPreferences', JSON.stringify(form.techPreferences));
    fd.append('description', form.description);
    fd.append('goals', form.goals);
    fd.append('hasExistingSystem', form.hasExistingSystem);
    fd.append('referenceLinks', form.referenceLinks);
    form.files.forEach((file) => fd.append('files', file));

    try {
        const res = await fetch('/api/project-requests', {
            method: 'POST',
            body: fd, // no Content-Type header — browser sets it with the correct multipart boundary
        });
        const result = await res.json();

        if (result.success) setSubmitted(true);
        else setErrors(result.errors || {});
    } catch (err) {
        setErrors({ description: 'Something went wrong. Please try again.' });
    }
};

  const handleFileChange = (e) => {
    setForm((f) => ({ ...f, files: Array.from(e.target.files || []) }));
  };

  if (submitted) {
    return (
      <div className="mx-auto flex max-w-[720px] flex-col items-center px-5 py-24 text-center sm:px-10">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#2F6FED] to-[#3B82F6] shadow-[0_0_35px_2px_rgba(47,111,237,0.5)]">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
            <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1 className="mt-6 text-[28px] font-extrabold text-[#F3F6FB] sm:text-[34px]">
          Thanks, {form.fullName.split(' ')[0]}!
        </h1>
        <p className="mt-3 max-w-md text-[15px] leading-relaxed text-[#93A0B8]">
          We've received your project requirements. Our team will review the details and get
          back to you at <span className="text-[#6FA0FF]">{form.email}</span> within 1-2 business
          days.
        </p>
        <div className="mt-8 flex gap-3.5">
          <AnimatedButton label="Back to Home" primary onClick={() => onNavigate('/')} />
          <AnimatedButton
            label="Submit Another"
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
    <div className="relative mx-auto max-w-[860px] px-5 pb-20 pt-10 sm:px-10 sm:pt-14 lg:px-0">
      <button
        onClick={() => onNavigate('/')}
        className="mb-6 flex items-center gap-1.5 text-sm font-medium text-[#93A0B8] transition-colors hover:text-[#F3F6FB]"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back to Home
      </button>

      <div className="inline-flex items-center gap-2 rounded-full border border-[#2F6FED]/20 bg-[#2F6FED]/[0.08] px-[13px] py-2">
        <span className="h-[7px] w-[7px] rounded-full bg-[#3B82F6]" />
        <span className="text-[10.5px] font-bold tracking-wider text-[#93A0B8]">
          START A PROJECT
        </span>
      </div>

      <h1 className="mt-5 text-[32px] font-extrabold leading-tight text-[#F3F6FB] sm:text-[42px]">
        Tell us about your <span className="text-[#6FA0FF]">software requirement</span>
      </h1>
      <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[#93A0B8]">
        Fill out the details below and our team will get back to you with a proposal and
        timeline tailored to your project.
      </p>

      <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-9">
        {/* Contact details */}
        <section className="flex flex-col gap-5 rounded-2xl border border-[#1A2233] bg-[#05070C]/60 p-5 sm:p-7">
          <h2 className="text-lg font-bold text-[#F3F6FB]">Contact Details</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Full Name" required>
              <TextInput
                type="text"
                placeholder="Your full name"
                value={form.fullName}
                onChange={update('fullName')}
              />
              {errors.fullName && <span className="text-xs text-[#EF4444]">{errors.fullName}</span>}
            </Field>
            <Field label="Email Address" required>
              <TextInput
                type="email"
                placeholder="you@company.com"
                value={form.email}
                onChange={update('email')}
              />
              {errors.email && <span className="text-xs text-[#EF4444]">{errors.email}</span>}
            </Field>
            <Field label="Phone Number" hint="Optional">
              <TextInput
                type="tel"
                placeholder="+92 300 1234567"
                value={form.phone}
                onChange={update('phone')}
              />
            </Field>
            <Field label="Company / Organization" hint="Optional">
              <TextInput
                type="text"
                placeholder="Your company name"
                value={form.company}
                onChange={update('company')}
              />
            </Field>
          </div>
        </section>

        {/* Project scope */}
        <section className="flex flex-col gap-5 rounded-2xl border border-[#1A2233] bg-[#05070C]/60 p-5 sm:p-7">
          <h2 className="text-lg font-bold text-[#F3F6FB]">Project Scope</h2>

          <Field label="Project Type" required>
            <SelectInput
              options={PROJECT_TYPES}
              placeholder="Select a project type"
              value={form.projectType}
              onChange={update('projectType')}
            />
            {errors.projectType && (
              <span className="text-xs text-[#EF4444]">{errors.projectType}</span>
            )}
          </Field>

          <Field label="Target Platforms" hint="Select all that apply">
            <div className="flex flex-wrap gap-2.5">
              {PLATFORM_OPTIONS.map((p) => (
                <CheckboxPill
                  key={p}
                  label={p}
                  checked={form.platforms.includes(p)}
                  onChange={() =>
                    setForm((f) => ({ ...f, platforms: toggleInArray(f.platforms, p) }))
                  }
                />
              ))}
            </div>
          </Field>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Estimated Budget">
              <SelectInput
                options={BUDGET_RANGES}
                placeholder="Select a budget range"
                value={form.budget}
                onChange={update('budget')}
              />
            </Field>
            <Field label="Desired Timeline">
              <SelectInput
                options={TIMELINES}
                placeholder="Select a timeline"
                value={form.timeline}
                onChange={update('timeline')}
              />
            </Field>
          </div>

          <Field label="Preferred Tech Stack" hint="Optional — select all that apply">
            <div className="flex flex-wrap gap-2.5">
              {TECH_OPTIONS.map((t) => (
                <CheckboxPill
                  key={t}
                  label={t}
                  checked={form.techPreferences.includes(t)}
                  onChange={() =>
                    setForm((f) => ({ ...f, techPreferences: toggleInArray(f.techPreferences, t) }))
                  }
                />
              ))}
            </div>
          </Field>
        </section>

        {/* Requirement details */}
        <section className="flex flex-col gap-5 rounded-2xl border border-[#1A2233] bg-[#05070C]/60 p-5 sm:p-7">
          <h2 className="text-lg font-bold text-[#F3F6FB]">Requirement Details</h2>

          <Field
            label="Describe your project"
            required
            hint="What are you building, and what problem does it solve?"
          >
            <TextArea
              rows={5}
              placeholder="E.g. We need a mobile POS app for our bakery with offline sales sync, receipt printing, and inventory tracking..."
              value={form.description}
              onChange={update('description')}
            />
            {errors.description && (
              <span className="text-xs text-[#EF4444]">{errors.description}</span>
            )}
          </Field>

          <Field label="Key goals / success criteria" hint="Optional">
            <TextArea
              rows={3}
              placeholder="E.g. Reduce manual billing errors, go live before Ramadan, support 5 branches..."
              value={form.goals}
              onChange={update('goals')}
            />
          </Field>

          <Field label="Do you have an existing system?" hint="Optional">
            <SelectInput
              options={['No, starting from scratch', 'Yes, needs improvement', 'Yes, needs a full rebuild', 'Yes, needs integration only']}
              placeholder="Select an option"
              value={form.hasExistingSystem}
              onChange={update('hasExistingSystem')}
            />
          </Field>

          <Field
            label="Reference links"
            hint="Optional — competitor apps, design inspiration, existing docs (one per line)"
          >
            <TextArea
              rows={2}
              placeholder="https://example.com"
              value={form.referenceLinks}
              onChange={update('referenceLinks')}
            />
          </Field>

          <Field
            label="Attach files"
            hint="Optional — requirement docs, wireframes, logos (PDF, DOCX, PNG, JPG, ZIP)"
          >
            <label
              htmlFor="file-upload"
              className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-[#1A2233] bg-[#0A0E17] px-4 py-8 text-center transition-colors hover:border-[#3B82F6]"
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 16V4M12 4l-4 4M12 4l4 4M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2"
                  stroke="#6FA0FF"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-sm font-medium text-[#93A0B8]">
                Click to upload or drag files here
              </span>
              <input
                id="file-upload"
                type="file"
                multiple
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
            {form.files.length > 0 && (
              <ul className="mt-1 flex flex-col gap-1.5">
                {form.files.map((file, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between rounded-lg border border-[#1A2233] bg-[#0A0E17] px-3 py-2 text-xs text-[#93A0B8]"
                  >
                    <span className="truncate">{file.name}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setForm((f) => ({
                          ...f,
                          files: f.files.filter((_, idx) => idx !== i),
                        }))
                      }
                      className="ml-3 shrink-0 text-[#5B677E] hover:text-[#EF4444]"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </Field>
        </section>

        <div className="flex flex-col items-start gap-3">
          <AnimatedButton
            label="Submit Requirement"
            primary
            type="submit"
            icon={
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            }
          />
          <span className="text-xs text-[#5B677E]">
            By submitting, you agree to be contacted by Swittix Technologies regarding your
            project.
          </span>
        </div>
      </form>
    </div>
  );
}