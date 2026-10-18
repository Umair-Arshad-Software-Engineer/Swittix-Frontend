// src/theme.js
// Single source of truth for all colors. Use these in inline style={{}} blocks.
// Mirror these values in theme.css :root so Tailwind arbitrary classes with var(--x) match.

export const colors = {
  // ── Base surfaces ──────────────────────────────────────────
  bg:            '#F7F9FC',   // page background
  surface:       '#FFFFFF',   // cards, panels
  surfaceAlt:    '#EEF2F9',   // subtle panel tint
  surfaceMuted:  '#E4EAF3',   // logo tiles, inert chips
  headerBg:      'rgba(255,255,255,0.92)', // sticky navbar
  footerBg:      '#0F1623',   // footer stays dark for contrast — see note
  overlay:       'rgba(15,22,35,0.55)',

  // ── Borders ────────────────────────────────────────────────
  border:        '#D7DFEB',   // default
  borderStrong:  '#B8C4D8',
  borderFocus:   '#2F6FED',

  // ── Text ───────────────────────────────────────────────────
  textPrimary:   '#0F1B2D',
  textSecondary: '#45536B',
  textMuted:     '#6B7A93',
  textFaint:     '#94A2B8',
  textOnAccent:  '#FFFFFF',

  // ── Brand ──────────────────────────────────────────────────
  primary:       '#2F6FED',
  primaryHover:  '#1B4FCB',
  primaryLight:  '#6FA0FF',
  primaryDark:   '#1B3E99',
  accent:        '#3B82F6',
  accentCyan:    '#0891B2',
  purple:        '#8B5CF6',

  // ── Semantic ───────────────────────────────────────────────
  success:       '#16A34A',
  successBg:     'rgba(22,163,74,0.12)',
  error:         '#DC2626',
  errorBg:       'rgba(220,38,38,0.10)',

  // ── Derived helpers (for inline rgba usage) ────────────────
  primarySoft:        'rgba(47,111,237,0.08)',
  primarySoftHover:   'rgba(47,111,237,0.14)',
  primaryBorderSoft:  'rgba(47,111,237,0.22)',
  purpleSoft:         'rgba(139,92,246,0.10)',
  purpleSoftHover:    'rgba(139,92,246,0.18)',
  shadow:             'rgba(15,27,45,0.08)',
  shadowStrong:       'rgba(15,27,45,0.14)',

  // ── Gradients (used on CTAs / logo visual) ─────────────────
  gradientPrimary: 'linear-gradient(to bottom right, #2F6FED, #3B82F6)',
  gradientPrimaryHover: 'linear-gradient(to bottom right, #4C86FF, #22D3EE)',
  gradientText: 'linear-gradient(to right, #2F6FED, #8B5CF6)',
};

// Sizing / spacing shared constants (unchanged from before)
export const layout = {
  maxWidth: 1432,
  container: 1240,
  content: 1152, // max-w-6xl
};

export default { colors, layout };