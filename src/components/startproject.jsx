import { useState } from 'react';
import { AnimatedButton } from './AnimatedButton';
import { colors } from '../theme';

const PROJECT_TYPES = ['Web Application', 'Mobile App (iOS/Android)', 'Desktop Application', 'E-commerce / POS System', 'Business Automation / ERP', 'API / Backend Service', 'Other'];
const BUDGET_RANGES = ['Under $2,000', '$2,000 - $5,000', '$5,000 - $15,000', '$15,000 - $50,000', '$50,000+', 'Not sure yet'];
const TIMELINES = ['ASAP', '1 - 4 weeks', '1 - 3 months', '3 - 6 months', '6+ months', 'Flexible'];
const TECH_OPTIONS = ['Flutter', 'React / Next.js', 'Node.js', 'Laravel', 'Firebase', 'MySQL / PostgreSQL', 'No preference'];
const PLATFORM_OPTIONS = ['Web', 'iOS', 'Android', 'Desktop (Windows/Mac)'];

function Field({ label, required, children, hint }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold" style={{ color: colors.textPrimary }}>
        {label}
        {required && <span className="ml-1" style={{ color: colors.error }}>*</span>}
      </label>
      {children}
      {hint && <span className="text-xs" style={{ color: colors.textMuted }}>{hint}</span>}
    </div>
  );
}

const inputStyle = {
  width: '100%',
  borderRadius: 12,
  border: `1px solid ${colors.border}`,
  backgroundColor: colors.surface,
  padding: '12px 16px',
  fontSize: 14,
  color: colors.textPrimary,
  outline: 'none',
};

function TextInput({ style, ...props }) { return <input {...props} style={{ ...inputStyle, ...style }} />; }
function TextArea({ style, ...props }) { return <textarea {...props} style={{ ...inputStyle, resize: 'none', ...style }} />; }
function SelectInput({ options, placeholder, style, ...props }) {
  return (
    <select {...props} style={{ ...inputStyle, appearance: 'none', ...style }}>
      <option value="" disabled>{placeholder}</option>
      {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  );
}

function CheckboxPill({ label, checked, onChange }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className="flex items-center gap-1.5 sm:gap-2 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-colors"
      style={{
        border: `1px solid ${checked ? colors.accent : colors.border}`,
        backgroundColor: checked ? colors.primarySoft : colors.surface,
        color: checked ? colors.primary : colors.textSecondary,
      }}
    >
      <span
        className="flex h-3.5 w-3.5 sm:h-4 sm:w-4 items-center justify-center rounded-[4px] border"
        style={{
          borderColor: checked ? colors.accent : colors.textMuted,
          backgroundColor: checked ? colors.accent : 'transparent',
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
  fullName: '', email: '', phone: '', company: '', projectType: '', platforms: [],
  budget: '', timeline: '', techPreferences: [], description: '', goals: '',
  hasExistingSystem: '', referenceLinks: '', files: [],
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
      const res = await fetch('/api/project-requests', { method: 'POST', body: fd });
      const result = await res.json();
      if (result.success) setSubmitted(true);
      else setErrors(result.errors || {});
    } catch {
      setErrors({ description: 'Something went wrong. Please try again.' });
    }
  };

  const handleFileChange = (e) => setForm((f) => ({ ...f, files: Array.from(e.target.files || []) }));

  if (submitted) {
    return (
      <div className="mx-auto flex max-w-[720px] flex-col items-center px-4 sm:px-6 py-16 sm:py-24 text-center">
        <div
          className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full"
          style={{ background: colors.gradientPrimary, boxShadow: '0 0 35px 2px rgba(47,111,237,0.35)' }}
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
            <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1 className="mt-5 sm:mt-6 text-2xl sm:text-[28px] font-extrabold" style={{ color: colors.textPrimary }}>
          Thanks, {form.fullName.split(' ')[0]}!
        </h1>
        <p className="mt-2 sm:mt-3 max-w-md text-sm sm:text-[15px] leading-relaxed" style={{ color: colors.textSecondary }}>
          We've received your project requirements. Our team will review the details and get
          back to you at <span style={{ color: colors.primary }}>{form.email}</span> within 1-2 business days.
        </p>
        <div className="mt-6 sm:mt-8 flex flex-wrap gap-3 sm:gap-3.5">
          <AnimatedButton label="Back to Home" primary onClick={() => onNavigate('/')} />
          <AnimatedButton label="Submit Another" onClick={() => { setForm(initialForm); setSubmitted(false); }} />
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto max-w-[860px] px-4 sm:px-6 lg:px-0 pb-16 sm:pb-20 pt-8 sm:pt-14">
      <button
        onClick={() => onNavigate('/')}
        className="mb-4 sm:mb-6 flex items-center gap-1.5 text-sm font-medium transition-colors"
        style={{ color: colors.textSecondary }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back to Home
      </button>

      <div
        className="inline-flex items-center gap-2 rounded-full px-3 sm:px-[13px] py-1.5 sm:py-2"
        style={{ border: `1px solid ${colors.primaryBorderSoft}`, backgroundColor: colors.primarySoft }}
      >
        <span className="h-1.5 w-1.5 sm:h-[7px] sm:w-[7px] rounded-full" style={{ backgroundColor: colors.accent }} />
        <span className="text-[9px] sm:text-[10.5px] font-bold tracking-wider" style={{ color: colors.textSecondary }}>
          START A PROJECT
        </span>
      </div>

      <h1 className="mt-4 sm:mt-5 text-2xl sm:text-[42px] font-extrabold leading-tight" style={{ color: colors.textPrimary }}>
        Tell us about your <span style={{ color: colors.primary }}>software requirement</span>
      </h1>
      <p className="mt-2 sm:mt-3 max-w-xl text-sm sm:text-[15px] leading-relaxed" style={{ color: colors.textSecondary }}>
        Fill out the details below and our team will get back to you with a proposal and
        timeline tailored to your project.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 sm:mt-10 flex flex-col gap-6 sm:gap-9">
        <section
          className="flex flex-col gap-4 sm:gap-5 rounded-2xl p-4 sm:p-7"
          style={{ border: `1px solid ${colors.border}`, backgroundColor: colors.surfaceAlt }}
        >
          <h2 className="text-base sm:text-lg font-bold" style={{ color: colors.textPrimary }}>Contact Details</h2>
          <div className="grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2">
            <Field label="Full Name" required>
              <TextInput placeholder="Your full name" value={form.fullName} onChange={update('fullName')} />
              {errors.fullName && <span className="text-xs" style={{ color: colors.error }}>{errors.fullName}</span>}
            </Field>
            <Field label="Email Address" required>
              <TextInput type="email" placeholder="you@company.com" value={form.email} onChange={update('email')} />
              {errors.email && <span className="text-xs" style={{ color: colors.error }}>{errors.email}</span>}
            </Field>
            <Field label="Phone Number" hint="Optional">
              <TextInput type="tel" placeholder="+92 300 1234567" value={form.phone} onChange={update('phone')} />
            </Field>
            <Field label="Company / Organization" hint="Optional">
              <TextInput placeholder="Your company name" value={form.company} onChange={update('company')} />
            </Field>
          </div>
        </section>

        <section
          className="flex flex-col gap-4 sm:gap-5 rounded-2xl p-4 sm:p-7"
          style={{ border: `1px solid ${colors.border}`, backgroundColor: colors.surfaceAlt }}
        >
          <h2 className="text-base sm:text-lg font-bold" style={{ color: colors.textPrimary }}>Project Scope</h2>
          <Field label="Project Type" required>
            <SelectInput options={PROJECT_TYPES} placeholder="Select a project type" value={form.projectType} onChange={update('projectType')} />
            {errors.projectType && <span className="text-xs" style={{ color: colors.error }}>{errors.projectType}</span>}
          </Field>
          <Field label="Target Platforms" hint="Select all that apply">
            <div className="flex flex-wrap gap-2 sm:gap-2.5">
              {PLATFORM_OPTIONS.map((p) => (
                <CheckboxPill key={p} label={p} checked={form.platforms.includes(p)} onChange={() => setForm((f) => ({ ...f, platforms: toggleInArray(f.platforms, p) }))} />
              ))}
            </div>
          </Field>
          <div className="grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2">
            <Field label="Estimated Budget">
              <SelectInput options={BUDGET_RANGES} placeholder="Select a budget range" value={form.budget} onChange={update('budget')} />
            </Field>
            <Field label="Desired Timeline">
              <SelectInput options={TIMELINES} placeholder="Select a timeline" value={form.timeline} onChange={update('timeline')} />
            </Field>
          </div>
          <Field label="Preferred Tech Stack" hint="Optional — select all that apply">
            <div className="flex flex-wrap gap-2 sm:gap-2.5">
              {TECH_OPTIONS.map((t) => (
                <CheckboxPill key={t} label={t} checked={form.techPreferences.includes(t)} onChange={() => setForm((f) => ({ ...f, techPreferences: toggleInArray(f.techPreferences, t) }))} />
              ))}
            </div>
          </Field>
        </section>

        <section
          className="flex flex-col gap-4 sm:gap-5 rounded-2xl p-4 sm:p-7"
          style={{ border: `1px solid ${colors.border}`, backgroundColor: colors.surfaceAlt }}
        >
          <h2 className="text-base sm:text-lg font-bold" style={{ color: colors.textPrimary }}>Requirement Details</h2>
          <Field label="Describe your project" required hint="What are you building, and what problem does it solve?">
            <TextArea rows={4} placeholder="E.g. We need a mobile POS app for our bakery…" value={form.description} onChange={update('description')} />
            {errors.description && <span className="text-xs" style={{ color: colors.error }}>{errors.description}</span>}
          </Field>
          <Field label="Key goals / success criteria" hint="Optional">
            <TextArea rows={2} placeholder="E.g. Reduce manual billing errors, go live before Ramadan…" value={form.goals} onChange={update('goals')} />
          </Field>
          <Field label="Do you have an existing system?" hint="Optional">
            <SelectInput
              options={['No, starting from scratch', 'Yes, needs improvement', 'Yes, needs a full rebuild', 'Yes, needs integration only']}
              placeholder="Select an option"
              value={form.hasExistingSystem}
              onChange={update('hasExistingSystem')}
            />
          </Field>
          <Field label="Reference links" hint="Optional — one per line">
            <TextArea rows={2} placeholder="https://example.com" value={form.referenceLinks} onChange={update('referenceLinks')} />
          </Field>
          <Field label="Attach files" hint="Optional — PDF, DOCX, PNG, JPG, ZIP">
            <label
              htmlFor="file-upload"
              className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl px-4 py-6 sm:py-8 text-center transition-colors"
              style={{ border: `1px dashed ${colors.borderStrong}`, backgroundColor: colors.surface }}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path d="M12 16V4M12 4l-4 4M12 4l4 4M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" stroke={colors.primary} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-xs sm:text-sm font-medium" style={{ color: colors.textSecondary }}>
                Click to upload or drag files here
              </span>
              <input id="file-upload" type="file" multiple className="hidden" onChange={handleFileChange} />
            </label>
            {form.files.length > 0 && (
              <ul className="mt-1 flex flex-col gap-1.5">
                {form.files.map((file, i) => (
                  <li key={i} className="flex items-center justify-between rounded-lg px-3 py-2 text-xs" style={{ border: `1px solid ${colors.border}`, backgroundColor: colors.surface, color: colors.textSecondary }}>
                    <span className="truncate">{file.name}</span>
                    <button type="button" onClick={() => setForm((f) => ({ ...f, files: f.files.filter((_, idx) => idx !== i) }))} className="ml-3 shrink-0" style={{ color: colors.textMuted }}>
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
            className="w-full sm:w-auto justify-center"
            icon={
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            }
          />
          <span className="text-xs" style={{ color: colors.textMuted }}>
            By submitting, you agree to be contacted by Swittix Technologies regarding your project.
          </span>
        </div>
      </form>
    </div>
  );
}