import { useState } from 'react'
import { api } from '../../lib/api'
import { useFetch } from '../../lib/useFetch'
import { btnGhost, Card, ErrorNote, fmtDateTime } from '../../components/dashboard/ui'

interface Enquiry {
  id: string
  name: string
  phone: string
  email: string
  service: string
  organisation: string
  message: string
  status: 'new' | 'read' | 'replied'
  createdAt: string
}

export default function Enquiries() {
  const { data, error, loading, reload } = useFetch<{ enquiries: Enquiry[] }>('/api/admin?action=enquiries')
  const [err, setErr] = useState('')

  const act = async (path: string, body: object) => {
    setErr('')
    try {
      await api.post(path, body)
      reload()
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Something went wrong.')
    }
  }

  return (
    <div className="space-y-4">
      <ErrorNote message={error || err} />
      {loading && <div className="skeleton h-40 rounded-2xl" />}
      {data && data.enquiries.length === 0 && <Card><p className="text-[14.5px] text-ink-500">No enquiries yet.</p></Card>}
      {data?.enquiries.map((e) => (
        <Card key={e.id} className={e.status === 'new' ? 'border-amber-300 dark:border-amber-500/40' : ''}>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-display text-[17px] font-bold text-ink-950 dark:text-white">
                {e.name}
                {e.status === 'new' && <span className="ml-2 rounded-full bg-amber-100 px-2 py-0.5 align-middle text-[11.5px] font-semibold text-amber-700 dark:bg-amber-500/15 dark:text-amber-400">New</span>}
                {e.status === 'replied' && <span className="ml-2 rounded-full bg-emerald-100 px-2 py-0.5 align-middle text-[11.5px] font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400">Replied</span>}
              </p>
              <p className="text-[13px] text-ink-500 dark:text-ink-400">{e.service}{e.organisation ? ` · ${e.organisation}` : ''} · {fmtDateTime(e.createdAt)}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <a href={`tel:${e.phone}`} className={btnGhost}>Call</a>
              <a href={`https://wa.me/${e.phone.replace(/\D/g, '').replace(/^0/, '234')}`} target="_blank" rel="noopener noreferrer" className={btnGhost}>WhatsApp</a>
              <a href={`mailto:${e.email}?subject=Re: your enquiry — Aremu Tech Eazy Solutions`} className={btnGhost} onClick={() => e.status !== 'replied' && void act('/api/admin?action=update-enquiry', { id: e.id, status: 'replied' })}>Email</a>
            </div>
          </div>
          <p className="mt-3 text-[15px] leading-relaxed whitespace-pre-line text-ink-800 dark:text-ink-200">{e.message}</p>
          <p className="mt-2 text-[13px] text-ink-500 dark:text-ink-400">{e.phone} · {e.email}</p>
          <div className="mt-4 flex gap-4 text-[13px] font-semibold">
            {e.status === 'new' && <button type="button" onClick={() => void act('/api/admin?action=update-enquiry', { id: e.id, status: 'read' })} className="text-violet-700 dark:text-violet-400">Mark as read</button>}
            {e.status !== 'replied' && <button type="button" onClick={() => void act('/api/admin?action=update-enquiry', { id: e.id, status: 'replied' })} className="text-violet-700 dark:text-violet-400">Mark as replied</button>}
            <button type="button" onClick={() => window.confirm('Delete this enquiry?') && void act('/api/admin?action=delete-enquiry', { id: e.id })} className="text-red-600 dark:text-red-400">Delete</button>
          </div>
        </Card>
      ))}
    </div>
  )
}
