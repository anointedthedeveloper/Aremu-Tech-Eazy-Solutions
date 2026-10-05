/** Server-side mirror of the application form rules (src/lib/applicationForm.ts). */
export const MODES = ['Apprenticeship', 'IT/SIWES/NYSC'] as const

export const REQUIRED_FIELDS = [
  'Surname',
  'First name',
  'Sex',
  'Marital Status',
  'Date of Birth',
  'Any health challenge? If yes what',
  'Residential Address',
  'Phone Number',
  'Educational Background',
  'Skills/Experience (if any)',
  'Reason for Applying',
  'Duration of Training',
  'Date of resumption',
  'Next of Kin Full Name',
  'Next of Kin Phone',
  'Mode of Training',
]

export const OPTIONAL_FIELDS = ['Other name']

export const REQUIRED_FILES: Record<(typeof MODES)[number], string[]> = {
  Apprenticeship: [
    'Passport Photograph',
    'Your valid means of ID',
    'Guarantors Passport Photograph',
    'Guarantors valid means of ID',
    'Guarantor Form',
    'Agreement Form',
  ],
  'IT/SIWES/NYSC': ['IT Request Letter', 'Acceptance Letter', 'School ID Card', 'Passport Photograph', 'Guarantor Form'],
}

export const MAX_FILE_BYTES = 4 * 1024 * 1024

export const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,}$/

export const clean = (v: unknown, max = 600) => (typeof v === 'string' ? v.trim().slice(0, max) : '')
