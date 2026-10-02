export type FieldType = 'email' | 'text' | 'tel' | 'date' | 'radio' | 'dropdown' | 'file' | 'image'

export interface FormField {
  label: string
  type: FieldType
  required: boolean
  options?: string[]
  helper?: string
}

export const FORM_TITLE = 'AREMU TECH EAZY SOLUTIONS'
export const FORM_NAME = 'APPRENTICESHIP APPLICATION FORM'

export const MODE_FIELD = 'Mode of Training'
export const AGREE_FIELD = 'Requirement agreement'
export const AGREE_YES = 'I Agree'
export const PLACEHOLDER_OPTION = 'Choose'

/**
 * Rules shown on page 1. Review and edit these so they match the company's actual
 * rules and regulations before going live.
 */
export const REQUIREMENTS: string[] = [
  'All information and documents you submit must be true, complete and belong to you. False information leads to disqualification.',
  'You must provide a guarantor who is willing to sign the guarantor form on your behalf.',
  'Be punctual and keep to the agreed resumption date and daily schedule.',
  'Treat company, client and exam-centre equipment with care. You are responsible for any damage caused by negligence.',
  'Follow site safety rules and dress appropriately for the work, including wearing the provided hi-vis vest on site.',
  'Client information and exam-centre details you see during training are confidential and must not be shared.',
  'Respect your colleagues, trainers and clients at all times. Misconduct may end your training.',
  'Submitting this form does not guarantee a place. We will contact you using the details provided.',
]

export const PAGE_ONE: FormField[] = [{ label: 'Email', type: 'email', required: true }]

export const PAGE_TWO: FormField[] = [
  { label: 'Surname', type: 'text', required: true },
  { label: 'First name', type: 'text', required: true },
  { label: 'Other name', type: 'text', required: false },
  { label: 'Sex', type: 'radio', required: true, options: ['Male', 'Female'] },
  { label: 'Marital Status', type: 'dropdown', required: true, options: ['Single', 'Married', 'Others'] },
  { label: 'Date of Birth', type: 'date', required: true },
  { label: 'Any health challenge? If yes what', type: 'text', required: true },
  { label: 'Residential Address', type: 'text', required: true },
  { label: 'Phone Number', type: 'tel', required: true },
  { label: 'Educational Background', type: 'text', required: true },
  { label: 'Skills/Experience (if any)', type: 'text', required: true },
  { label: 'Reason for Applying', type: 'text', required: true },
  { label: 'Duration of Training', type: 'text', required: true },
  { label: 'Date of resumption', type: 'date', required: true },
  { label: 'Next of Kin Full Name', type: 'text', required: true },
  { label: 'Next of Kin Phone', type: 'tel', required: true },
  { label: MODE_FIELD, type: 'dropdown', required: true, options: ['Apprenticeship', 'IT/SIWES/NYSC'] },
]

const ID_HELPER = 'NIN, Voters Card, driver licence & international passport'

export const APPRENTICESHIP_FIELDS: FormField[] = [
  { label: 'Passport Photograph', type: 'file', required: true },
  { label: 'Your valid means of ID', type: 'file', required: true, helper: ID_HELPER },
  { label: 'Guarantors Passport Photograph', type: 'file', required: true },
  { label: 'Guarantors valid means of ID', type: 'file', required: true, helper: ID_HELPER },
  { label: 'Guarantor Form', type: 'file', required: true },
  { label: 'Agreement Form', type: 'file', required: true },
]

export const SIWES_FIELDS: FormField[] = [
  { label: 'IT Request Letter', type: 'file', required: true, helper: 'Letter from the school' },
  { label: 'Acceptance Letter', type: 'file', required: true, helper: 'Acceptance letter issued' },
  { label: 'School ID Card', type: 'file', required: true, helper: 'School means of Identification' },
  { label: 'Passport Photograph', type: 'image', required: true, helper: 'Upload your passport photograph' },
  { label: 'Guarantor Form', type: 'file', required: true, helper: 'Upload of guarantors form' },
]

export const BRANCHES: Record<string, FormField[]> = {
  Apprenticeship: APPRENTICESHIP_FIELDS,
  'IT/SIWES/NYSC': SIWES_FIELDS,
}

/** Largest single upload accepted by the form, in megabytes. */
export const MAX_FILE_MB = 5

/** Where the finished application is sent. Override with VITE_APPLICATION_ENDPOINT. */
export const APPLICATION_ENDPOINT =
  import.meta.env.VITE_APPLICATION_ENDPOINT ?? 'https://formsubmit.co/aremutecheazysolutions@gmail.com'
