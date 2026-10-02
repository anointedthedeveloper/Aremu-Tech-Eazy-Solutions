import { useMemo, useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import {
  AGREE_FIELD,
  AGREE_YES,
  APPLICATION_ENDPOINT,
  BRANCHES,
  FORM_NAME,
  FORM_TITLE,
  MAX_FILE_MB,
  MODE_FIELD,
  PAGE_ONE,
  PAGE_TWO,
  PLACEHOLDER_OPTION,
  REQUIREMENTS,
  type FormField,
} from '../lib/applicationForm'
import { IconArrowRight, IconCheck } from './icons'

const STEP_LABELS = ['Requirements', 'Your details', 'Documents']
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const inputClass =
  'w-full rounded-xl border bg-white px-4 py-3 text-[15px] text-ink-900 outline-none transition-colors placeholder:text-ink-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:bg-ink-900 dark:text-white'

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

  const mode = values[MODE_FIELD] ?? ''
  const branchFields = BRANCHES[mode]
  const nextUrl = useMemo(() => `${window.location.origin}/apply?submitted=1`, [])

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
    if (target === 1) {
      for (const f of PAGE_TWO) {
        const v = (values[f.label] ?? '').trim()
        if (f.required && !v) found[f.label] = f.type === 'dropdown' || f.type === 'radio' ? 'Please choose an option.' : 'This field is required.'
      }
    }
    if (target === 2) {
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
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goBack = () => {
    setStep((s) => Math.max(0, s - 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (step < 2) return goNext()
    const found = { ...validate(0), ...validate(1), ...validate(2) }
    setErrors(found)
    if (Object.keys(found).length) {
      const firstLabel = Object.keys(found)[0]
      const inEarlierStep = firstLabel in validate(0) ? 0 : firstLabel in validate(1) ? 1 : 2
      setStep(inEarlierStep)
      requestAnimationFrame(() => document.querySelector<HTMLElement>('section:not(.hidden) [aria-invalid="true"]')?.focus())
      return
    }
    setSubmitting(true)
    formRef.current?.submit()
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
      method="POST"
      action={APPLICATION_ENDPOINT}
      encType="multipart/form-data"
      noValidate
      onSubmit={onSubmit}
      className="light-surface overflow-hidden rounded-2xl border border-ink-200/70 bg-white shadow-lifted dark:border-white/10 dark:bg-ink-900"
    >
      <input type="hidden" name="_subject" value={`New application: ${values['First name'] ?? ''} ${values.Surname ?? ''} (${mode || 'no mode'})`} />
      <input type="hidden" name="_next" value={nextUrl} />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_template" value="table" />
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <header className="border-b border-ink-100 bg-paper-dim/60 px-5 py-5 dark:border-white/10 dark:bg-white/5 sm:px-8">
        <p className="font-display text-[13px] font-bold tracking-[0.14em] text-violet-700 dark:text-violet-400">{FORM_TITLE}</p>
        <h2 className="mt-1 font-display text-[22px] font-bold text-ink-950 dark:text-white sm:text-[26px]">{FORM_NAME}</h2>
        <ol className="mt-5 grid grid-cols-3 gap-2" aria-label="Progress">
          {STEP_LABELS.map((label, i) => (
            <li key={label} aria-current={i === step ? 'step' : undefined}>
              <span className={`block h-1.5 rounded-full transition-colors ${i <= step ? 'bg-gradient-to-r from-amber-500 to-violet-500' : 'bg-ink-100 dark:bg-white/10'}`} />
              <span className={`mt-2 flex items-center gap-1.5 text-[12px] font-semibold sm:text-[13px] ${i === step ? 'text-ink-950 dark:text-white' : 'text-ink-400'}`}>
                {i < step ? <IconCheck className="h-3.5 w-3.5 text-emerald-500" /> : <span>{i + 1}.</span>}
                {label}
              </span>
            </li>
          ))}
        </ol>
      </header>

      <div className="px-5 py-7 sm:px-8 sm:py-9">
        {/* Page 1 */}
        <section className={step === 0 ? 'space-y-7' : 'hidden'} aria-hidden={step !== 0}>
          {PAGE_ONE.map((f) => renderField(f))}

          <div>
            <h3 className="font-display text-[17px] font-bold text-ink-950 dark:text-white">REQUIREMENTS</h3>
            <ol className="mt-3 max-h-72 list-decimal space-y-2.5 overflow-y-auto rounded-xl border border-ink-200 bg-paper-dim/60 py-4 pr-4 pl-9 text-[14.5px] leading-relaxed text-ink-700 dark:border-white/10 dark:bg-white/5 dark:text-ink-200">
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

        {/* Page 2 */}
        <section className={step === 1 ? 'grid gap-x-6 gap-y-6 sm:grid-cols-2' : 'hidden'} aria-hidden={step !== 1}>
          {PAGE_TWO.map((f) => {
            const wide = f.type === 'radio' || ['Residential Address', 'Reason for Applying', 'Any health challenge? If yes what', 'Skills/Experience (if any)', 'Educational Background'].includes(f.label)
            return (
              <div key={f.label} className={wide ? 'sm:col-span-2' : ''}>
                {renderField(f)}
              </div>
            )
          })}
        </section>

        {/* Page 3 / 4: branch by Mode of Training — both stay mounted so selected files are submitted */}
        <section className={step === 2 ? 'space-y-6' : 'hidden'} aria-hidden={step !== 2}>
          <div className="rounded-xl border border-violet-100 bg-violet-100/40 px-4 py-3 text-[14px] text-violet-900 dark:border-white/10 dark:bg-violet-500/10 dark:text-ink-200">
            Documents for <strong>{mode || 'your chosen mode'}</strong>. Each file can be up to {MAX_FILE_MB} MB.
          </div>
          {Object.entries(BRANCHES).map(([name, fields]) => (
            <fieldset key={name} disabled={mode !== name} className={mode === name ? 'space-y-6' : 'hidden'}>
              <legend className="sr-only">{name} documents</legend>
              {fields.map((f) => renderField(f, name))}
            </fieldset>
          ))}
        </section>
      </div>

      <footer className="flex items-center justify-between gap-3 border-t border-ink-100 bg-paper-dim/60 px-5 py-4 dark:border-white/10 dark:bg-white/5 sm:px-8">
        <button
          type="button"
          onClick={goBack}
          className={`rounded-full border border-ink-200 px-5 py-2.5 text-[14px] font-semibold text-ink-700 transition-colors hover:bg-white dark:border-white/15 dark:text-ink-200 dark:hover:bg-white/10 ${step === 0 ? 'invisible' : ''}`}
        >
          Back
        </button>
        {step < 2 ? (
          <button
            type="button"
            onClick={goNext}
            className="group inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-[15px] font-semibold text-ink-950 transition-colors hover:bg-amber-400"
          >
            Next
            <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-[15px] font-semibold text-ink-950 transition-colors hover:bg-amber-400 disabled:opacity-60"
          >
            {submitting ? 'Submitting…' : 'Submit application'}
          </button>
        )}
      </footer>
    </form>
  )
}
