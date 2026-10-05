import { useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import {
  AGREE_FIELD,
  AGREE_YES,
  BRANCHES,
  FORM_NAME,
  MAX_FILE_MB,
  MODE_FIELD,
  PAGE_ONE,
  PAGE_TWO,
  PLACEHOLDER_OPTION,
  REQUIREMENTS,
  type FormField,
} from '../lib/applicationForm'
import { IconArrowRight, IconCheck } from './icons'
import SendingOverlay from './SendingOverlay'
import { useNavigate } from 'react-router-dom'
import { api, uploadDocument } from '../lib/api'
import { EMAIL_RE, inputClass } from '../lib/formStyles'

const STEP_LABELS = ['Rules', 'About you', 'Training', 'Documents']
const LAST_STEP = STEP_LABELS.length - 1
const PAGE_ABOUT = PAGE_TWO.slice(0, 9) // surname … phone
const PAGE_TRAINING = PAGE_TWO.slice(9) // education … mode of training
const WIDE = ['Residential Address', 'Reason for Applying', 'Any health challenge? If yes what']


function fieldId(label: string) {
  return 'f-' + label.toLowerCase().replace(/[^a-z0-9]+/g, '-')
}

function Label({ field }: { field: FormField }) {
  return (
    <label htmlFor={fieldId(field.label)} className="block text-[14px] font-semibold text-ink-900 dark:text-white">
      {field.label}
      {field.required ? (
        <span className="ml-0.5 text-magenta-500" aria-hidden="true">*</span>
      ) : (
        <span className="ml-1.5 text-[12px] font-medium text-ink-400">(optional)</span>
      )}
    </label>
  )
}

function ErrorText({ message }: { message?: string }) {
  if (!message) return null
  return (
    <p role="alert" className="mt-1.5 text-[13px] font-medium text-red-600 dark:text-red-400">
      {message}
    </p>
  )
}

function formatSize(bytes: number) {
  return bytes > 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`
}

export default function ApplicationForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [step, setStep] = useState(0)
  const [values, setValues] = useState<Record<string, string>>({})
  const [files, setFiles] = useState<Record<string, string>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const bodyRef = useRef<HTMLDivElement>(null)

  const mode = values[MODE_FIELD] ?? ''
  const branchFields = BRANCHES[mode]
  const navigate = useNavigate()
  const [sendError, setSendError] = useState('')
  const [sendStatus, setSendStatus] = useState('')

  const set = (label: string, value: string) => {
    setValues((v) => ({ ...v, [label]: value }))
    setErrors((e) => (e[label] ? { ...e, [label]: '' } : e))
  }

  const onFile = (field: FormField) => (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target
    const file = input.files?.[0]
    if (file && file.size > MAX_FILE_MB * 1024 * 1024) {
      input.value = ''
      setFiles((f) => ({ ...f, [field.label]: '' }))
      setErrors((e) => ({ ...e, [field.label]: `File is too large. Maximum size is ${MAX_FILE_MB} MB.` }))
      return
    }
    if (field.type === 'image' && file && !file.type.startsWith('image/')) {
      input.value = ''
      setFiles((f) => ({ ...f, [field.label]: '' }))
      setErrors((e) => ({ ...e, [field.label]: 'Please choose an image file (JPG or PNG).' }))
      return
    }
    setFiles((f) => ({ ...f, [field.label]: file ? `${file.name} · ${formatSize(file.size)}` : '' }))
    setErrors((e) => ({ ...e, [field.label]: '' }))
  }

  const validate = (target: number): Record<string, string> => {
    const found: Record<string, string> = {}
    const need = (label: string, ok: boolean, message: string) => {
      if (!ok) found[label] = message
    }
    if (target === 0) {
      const email = (values.Email ?? '').trim()
      need('Email', EMAIL_RE.test(email), email ? 'Enter a valid email address.' : 'Email is required.')
      need(AGREE_FIELD, values[AGREE_FIELD] === AGREE_YES, 'You must agree to the requirements to continue.')
    }
    if (target === 1 || target === 2) {
      for (const f of target === 1 ? PAGE_ABOUT : PAGE_TRAINING) {
        const v = (values[f.label] ?? '').trim()
        if (f.required && !v) found[f.label] = f.type === 'dropdown' || f.type === 'radio' ? 'Please choose an option.' : 'This field is required.'
      }
    }
    if (target === 3) {
      for (const f of branchFields ?? []) {
        const input = document.getElementById(fieldId(`${mode} ${f.label}`)) as HTMLInputElement | null
        if (f.required && !input?.files?.length) found[f.label] = 'Please upload this document.'
      }
    }
    return found
  }

  const goNext = () => {
    const found = validate(step)
    setErrors(found)
    if (Object.keys(found).length) {
      requestAnimationFrame(() => document.querySelector<HTMLElement>('section:not(.hidden) [aria-invalid="true"]')?.focus())
      return
    }
    setStep((s) => s + 1)
    bodyRef.current?.scrollTo({ top: 0 })
  }

  const goBack = () => {
    setStep((s) => Math.max(0, s - 1))
    bodyRef.current?.scrollTo({ top: 0 })
  }

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (step < LAST_STEP) return goNext()
    const checks = [0, 1, 2, 3].map(validate)
    const found = Object.assign({}, ...checks)
    setErrors(found)
    if (Object.keys(found).length) {
      setStep(checks.findIndex((c) => Object.keys(c).length > 0))
      requestAnimationFrame(() => document.querySelector<HTMLElement>('section:not(.hidden) [aria-invalid="true"]')?.focus())
      return
    }
    void send()
  }

  const send = async () => {
    setSendError('')
    setSubmitting(true)
    try {
      const docs = branchFields ?? []
      const uploaded: { label: string; id: string }[] = []
      for (const [i, f] of docs.entries()) {
        setSendStatus(`Uploading document ${i + 1} of ${docs.length}…`)
        const input = document.getElementById(fieldId(`${mode} ${f.label}`)) as HTMLInputElement | null
        const file = input?.files?.[0]
        if (!file) throw new Error(`Please choose a file for "${f.label}".`)
        const res = await uploadDocument(file)
        uploaded.push({ label: f.label, id: res.id })
      }
      setSendStatus('Sending your application…')
      const honey = (formRef.current?.elements.namedItem('website') as HTMLInputElement | null)?.value ?? ''
      const fields = Object.fromEntries(PAGE_TWO.map((f) => [f.label, values[f.label] ?? '']))
      const result = await api.post<{ emailSent: boolean; existingAccount: boolean }>('/api/applications', {
        email: (values.Email ?? '').trim(),
        agreed: values[AGREE_FIELD] === AGREE_YES,
        fields,
        files: uploaded,
        website: honey,
      })
      navigate('/apply?submitted=1', { state: { emailSent: result.emailSent, existingAccount: result.existingAccount, email: values.Email } })
    } catch (err) {
      setSendError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setSubmitting(false)
    }
  }


  const renderField = (field: FormField, branch?: string) => {
    const disabled = Boolean(branch) && mode !== branch
    const id = fieldId(branch ? `${branch} ${field.label}` : field.label)
    const error = errors[field.label]
    const border = error ? 'border-red-500' : 'border-ink-200 dark:border-white/15'
    const common = {
      id,
      name: field.label,
      disabled,
      'aria-invalid': Boolean(error),
      'aria-describedby': error ? `${id}-err` : undefined,
    }

    let control
    if (field.type === 'radio') {
      control = (
        <div role="radiogroup" aria-labelledby={`${id}-legend`} className="mt-2 flex flex-wrap gap-3">
          {field.options?.map((opt) => (
            <label
              key={opt}
              className={`flex cursor-pointer items-center gap-2.5 rounded-xl border px-4 py-3 text-[15px] transition-colors ${
                values[field.label] === opt
                  ? 'border-violet-500 bg-violet-100/60 text-violet-800 dark:bg-violet-500/15 dark:text-white'
                  : `${border} text-ink-700 hover:border-violet-400 dark:text-ink-200`
              }`}
            >
              <input
                type="radio"
                name={field.label}
                value={opt}
                checked={values[field.label] === opt}
                onChange={() => set(field.label, opt)}
                disabled={disabled}
                className="h-4 w-4 accent-violet-600"
              />
              {opt}
            </label>
          ))}
        </div>
      )
    } else if (field.type === 'dropdown') {
      control = (
        <select {...common} value={values[field.label] ?? ''} onChange={(e) => set(field.label, e.target.value)} className={`${inputClass} mt-2 ${border}`}>
          <option value="">{PLACEHOLDER_OPTION}</option>
          {field.options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      )
    } else if (field.type === 'file' || field.type === 'image') {
      control = (
        <div className="mt-2">
          <label
            htmlFor={id}
            className={`flex cursor-pointer items-center gap-3 rounded-xl border border-dashed px-4 py-3.5 text-[14px] transition-colors hover:border-violet-500 hover:bg-violet-100/40 dark:hover:bg-violet-500/10 ${border}`}
          >
            <span className="shrink-0 rounded-full bg-violet-600 px-3.5 py-1.5 text-[13px] font-semibold text-white">Choose file</span>
            <span className={`min-w-0 truncate ${files[field.label] ? 'text-ink-900 dark:text-white' : 'text-ink-400'}`}>
              {files[field.label] || (field.type === 'image' ? 'JPG or PNG, up to ' : 'Image or PDF, up to ') + MAX_FILE_MB + ' MB'}
            </span>
          </label>
          <input
            {...common}
            type="file"
            accept={field.type === 'image' ? 'image/*' : 'image/*,.pdf,.doc,.docx'}
            onChange={onFile(field)}
            className="sr-only"
          />
        </div>
      )
    } else {
      control = (
        <input
          {...common}
          type={field.type}
          value={values[field.label] ?? ''}
          onChange={(e) => set(field.label, e.target.value)}
          autoComplete={field.type === 'email' ? 'email' : field.type === 'tel' ? 'tel' : undefined}
          className={`${inputClass} mt-2 ${border}`}
        />
      )
    }

    return (
      <div key={field.label}>
        {field.type === 'radio' ? (
          <p id={`${id}-legend`} className="text-[14px] font-semibold text-ink-900 dark:text-white">
            {field.label}
            {field.required && <span className="ml-0.5 text-magenta-500" aria-hidden="true">*</span>}
          </p>
        ) : (
          <Label field={field} />
        )}
        {field.helper && <p className="mt-1 text-[12.5px] text-ink-500 dark:text-ink-400">{field.helper}</p>}
        {control}
        <div id={`${id}-err`}>
          <ErrorText message={error} />
        </div>
      </div>
    )
  }

  const agreeError = errors[AGREE_FIELD]

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      className="light-surface relative flex h-full min-h-0 flex-col overflow-hidden rounded-3xl border border-ink-200/70 bg-white shadow-lifted dark:border-white/10 dark:bg-ink-900"
    >
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      {submitting && <SendingOverlay title="Sending your application…" text={sendStatus || 'Please keep this page open.'} />}

      <header className="shrink-0 border-b border-ink-100 px-5 py-4 dark:border-white/10 sm:px-8">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="font-display text-[17px] font-bold text-ink-950 dark:text-white sm:text-[19px]">{FORM_NAME}</h2>
          <p className="shrink-0 text-[12.5px] font-semibold text-violet-700 dark:text-violet-400">
            Step {step + 1} of {STEP_LABELS.length}
          </p>
        </div>
        <ol className="mt-3 grid grid-cols-4 gap-2" aria-label="Progress">
          {STEP_LABELS.map((label, i) => (
            <li key={label} aria-current={i === step ? 'step' : undefined}>
              <span className={`block h-1.5 rounded-full transition-colors ${i <= step ? 'bg-gradient-to-r from-amber-500 to-violet-500' : 'bg-ink-100 dark:bg-white/10'}`} />
              <span className={`mt-1.5 flex items-center gap-1 text-[11.5px] font-semibold sm:text-[12.5px] ${i === step ? 'text-ink-950 dark:text-white' : 'text-ink-400'}`}>
                {i < step && <IconCheck className="h-3 w-3 text-emerald-500" />}
                <span className="truncate">{label}</span>
              </span>
            </li>
          ))}
        </ol>
      </header>

      <div ref={bodyRef} className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-8 sm:py-6">
        {/* Page 1 */}
        <section className={step === 0 ? 'space-y-5' : 'hidden'} aria-hidden={step !== 0}>
          {PAGE_ONE.map((f) => renderField(f))}

          <div>
            <h3 className="font-display text-[17px] font-bold text-ink-950 dark:text-white">REQUIREMENTS</h3>
            <ol className="mt-3 max-h-[30svh] list-decimal space-y-2.5 overflow-y-auto rounded-xl border border-ink-200 bg-paper-dim/60 py-4 pr-4 pl-9 text-[14.5px] leading-relaxed text-ink-700 dark:border-white/10 dark:bg-white/5 dark:text-ink-200">
              {REQUIREMENTS.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ol>
            <div className="mt-5">
              <p id="f-agree-legend" className="text-[14px] font-semibold text-ink-900 dark:text-white">
                Do you agree to the requirements? <span className="text-magenta-500" aria-hidden="true">*</span>
              </p>
              <div role="radiogroup" aria-labelledby="f-agree-legend" className="mt-2 flex flex-wrap gap-3">
                {[AGREE_YES, 'I disagree'].map((opt) => (
                  <label
                    key={opt}
                    className={`flex cursor-pointer items-center gap-2.5 rounded-xl border px-4 py-3 text-[15px] transition-colors ${
                      values[AGREE_FIELD] === opt
                        ? 'border-violet-500 bg-violet-100/60 text-violet-800 dark:bg-violet-500/15 dark:text-white'
                        : 'border-ink-200 text-ink-700 hover:border-violet-400 dark:border-white/15 dark:text-ink-200'
                    }`}
                  >
                    <input
                      id={opt === AGREE_YES ? fieldId(AGREE_FIELD) : undefined}
                      type="radio"
                      name={AGREE_FIELD}
                      value={opt}
                      checked={values[AGREE_FIELD] === opt}
                      onChange={() => set(AGREE_FIELD, opt)}
                      className="h-4 w-4 accent-violet-600"
                    />
                    {opt}
                  </label>
                ))}
              </div>
              {values[AGREE_FIELD] === 'I disagree' && !agreeError && (
                <p role="alert" className="mt-2 text-[13px] font-medium text-amber-700 dark:text-amber-400">
                  You need to agree to the requirements before you can apply.
                </p>
              )}
              <ErrorText message={agreeError} />
            </div>
          </div>
        </section>

        {/* Page 2: about you */}
        <section className={step === 1 ? 'grid gap-x-5 gap-y-5 sm:grid-cols-2' : 'hidden'} aria-hidden={step !== 1}>
          {PAGE_ABOUT.map((f) => (
            <div key={f.label} className={WIDE.includes(f.label) ? 'sm:col-span-2' : ''}>
              {renderField(f)}
            </div>
          ))}
        </section>

        {/* Page 2 (continued): training */}
        <section className={step === 2 ? 'grid gap-x-5 gap-y-5 sm:grid-cols-2' : 'hidden'} aria-hidden={step !== 2}>
          {PAGE_TRAINING.map((f) => (
            <div key={f.label} className={WIDE.includes(f.label) || f.label === MODE_FIELD ? 'sm:col-span-2' : ''}>
              {renderField(f)}
            </div>
          ))}
        </section>

        {/* Page 3 / 4: branch by Mode of Training — both stay mounted so selected files are submitted */}
        <section className={step === 3 ? 'space-y-5' : 'hidden'} aria-hidden={step !== 3}>
          <div className="rounded-xl border border-violet-100 bg-violet-100/40 px-4 py-3 text-[14px] text-violet-900 dark:border-white/10 dark:bg-violet-500/10 dark:text-ink-200">
            Documents for <strong>{mode || 'your chosen mode'}</strong>. Each file can be up to {MAX_FILE_MB} MB.
          </div>
          {Object.entries(BRANCHES).map(([name, fields]) => (
            <fieldset key={name} disabled={mode !== name} className={mode === name ? 'grid gap-x-5 gap-y-5 sm:grid-cols-2' : 'hidden'}>
              <legend className="sr-only">{name} documents</legend>
              {fields.map((f) => renderField(f, name))}
            </fieldset>
          ))}
        </section>
      </div>

      {sendError && (
        <p role="alert" className="shrink-0 border-t border-red-200 bg-red-50 px-5 py-3 text-[13.5px] font-medium text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300 sm:px-8">
          {sendError}
        </p>
      )}

      <footer className="flex shrink-0 items-center justify-between gap-3 border-t border-ink-100 bg-paper-dim/60 px-5 py-3.5 dark:border-white/10 dark:bg-white/5 sm:px-8">
        <button
          type="button"
          onClick={goBack}
          className={`rounded-full border border-ink-200 px-5 py-2.5 text-[14px] font-semibold text-ink-700 transition-colors hover:bg-white dark:border-white/15 dark:text-ink-200 dark:hover:bg-white/10 ${step === 0 ? 'invisible' : ''}`}
        >
          Back
        </button>
        {step < LAST_STEP ? (
          <button
            type="button"
            onClick={goNext}
            className="group inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-[15px] font-semibold text-[#1a1033] transition-colors hover:bg-amber-400"
          >
            Next
            <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-[15px] font-semibold text-[#1a1033] transition-colors hover:bg-amber-400 disabled:opacity-60"
          >
            {submitting ? 'Sending…' : 'Send application'}
          </button>
        )}
      </footer>
    </form>
  )
}
