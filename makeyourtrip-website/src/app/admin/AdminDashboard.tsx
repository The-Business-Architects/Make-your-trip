'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import CustomSelect, { Option } from './CustomSelect'
import styles from './AdminDashboard.module.css'

interface Leg {
  from: string
  to: string
  date: string
}

interface Note {
  id: number
  admin_name: string
  note: string
  created_at: string
}

interface Inquiry {
  id: number
  reference_code: string
  full_name: string
  email: string
  phone: string
  country: string
  journey_type: string
  legs?: Leg[]
  legs_json?: string
  return_date?: string
  adults: number
  children: number
  infants: number
  travel_class: string
  requirements?: string
  status: 'new' | 'contacted' | 'in_progress' | 'quoted' | 'booked' | 'cancelled'
  source: string
  created_at: string
  notes?: Note[]
}

const LOCAL_STORAGE_KEY = 'myt_crm_local_inquiries'

const STATUS_FILTER_OPTIONS: Option[] = [
  { value: 'all', label: 'All Statuses' },
  { value: 'new', label: 'New Leads', badgeBg: '#1e40af' },
  { value: 'contacted', label: 'Contacted', badgeBg: '#92400e' },
  { value: 'in_progress', label: 'In Progress', badgeBg: '#3730a3' },
  { value: 'quoted', label: 'Quoted', badgeBg: '#6b21a8' },
  { value: 'booked', label: 'Booked', badgeBg: '#065f46' },
  { value: 'cancelled', label: 'Cancelled', badgeBg: '#991b1b' },
]

const STATUS_UPDATE_OPTIONS: Option<Inquiry['status']>[] = [
  { value: 'new', label: 'New', badgeBg: '#1e40af' },
  { value: 'contacted', label: 'Contacted', badgeBg: '#92400e' },
  { value: 'in_progress', label: 'In Progress', badgeBg: '#3730a3' },
  { value: 'quoted', label: 'Quoted', badgeBg: '#6b21a8' },
  { value: 'booked', label: 'Booked', badgeBg: '#065f46' },
  { value: 'cancelled', label: 'Cancelled', badgeBg: '#991b1b' },
]

const JOURNEY_OPTIONS: Option<'one-way' | 'return' | 'multi-destination'>[] = [
  { value: 'one-way', label: 'One Way' },
  { value: 'return', label: 'Return' },
  { value: 'multi-destination', label: 'Multi-Destination' },
]

const CLASS_OPTIONS: Option<'economy' | 'premium-economy' | 'business' | 'first'>[] = [
  { value: 'economy', label: 'Economy' },
  { value: 'premium-economy', label: 'Premium Economy' },
  { value: 'business', label: 'Business' },
  { value: 'first', label: 'First' },
]

const DEMO_INQUIRIES: Inquiry[] = [
  {
    id: 1,
    reference_code: 'MYT-849201',
    full_name: 'Sarah Jenkins',
    email: 'sarah.j@example.com',
    phone: '+1 (415) 890-2341',
    country: 'United States',
    journey_type: 'return',
    legs: [{ from: 'San Francisco (SFO)', to: 'Tokyo (NRT)', date: '2026-11-14' }],
    return_date: '2026-11-28',
    adults: 2,
    children: 1,
    infants: 0,
    travel_class: 'business',
    requirements: 'Interested in a 2-week Japan itinerary including Tokyo, Kyoto, and Hakone. Prefer premium rail passes and direct flights.',
    status: 'new',
    source: 'website_form',
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    notes: [
      { id: 1, admin_name: 'System', note: 'Inquiry received via Website Form', created_at: new Date(Date.now() - 3600000 * 2).toLocaleString() }
    ]
  },
  {
    id: 2,
    reference_code: 'MYT-719342',
    full_name: 'David & Elena Miller',
    email: 'dmiller@corpmail.com',
    phone: '+44 7700 900321',
    country: 'United Kingdom',
    journey_type: 'multi-destination',
    legs: [
      { from: 'London (LHR)', to: 'Rome (FCO)', date: '2026-12-05' },
      { from: 'Florence (FLR)', to: 'Paris (CDG)', date: '2026-12-12' }
    ],
    adults: 2,
    children: 0,
    infants: 0,
    travel_class: 'first',
    requirements: 'Honeymoon itinerary with scenic Italian rail connection. Need visa advice for Schengen entry.',
    status: 'contacted',
    source: 'website_form',
    created_at: new Date(Date.now() - 86400000).toISOString(),
    notes: [
      { id: 1, admin_name: 'System', note: 'Inquiry received via Website Form', created_at: new Date(Date.now() - 86400000).toLocaleString() },
      { id: 2, admin_name: 'Admin', note: 'Discussed Schengen visa requirements and train connection. | Next: Send customized Rome-Paris quotation with rail passes (Due: 2026-10-18)', created_at: new Date(Date.now() - 43200000).toLocaleString() }
    ]
  }
]

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [toastMessage, setToastMessage] = useState<string>('')

  // Activity form state (inline under action buttons)
  const [showActivityForm, setShowActivityForm] = useState<boolean>(false)
  const [activityStatus, setActivityStatus] = useState<Inquiry['status']>('contacted')
  const [activityNote, setActivityNote] = useState<string>('')
  const [nextActivityPlan, setNextActivityPlan] = useState<string>('')
  const [nextActivityDate, setNextActivityDate] = useState<string>('')

  // View mode for mobile devices: 'list' | 'detail'
  const [mobileView, setMobileView] = useState<'list' | 'detail'>('list')
  const [isMobileScreen, setIsMobileScreen] = useState<boolean>(false)

  // Track screen size for responsive behavior
  useEffect(() => {
    const checkWidth = () => {
      setIsMobileScreen(window.innerWidth < 992)
    }
    checkWidth()
    window.addEventListener('resize', checkWidth)
    return () => window.removeEventListener('resize', checkWidth)
  }, [])

  // New Inquiry Form fields
  const [formName, setFormName] = useState('')
  const [formEmail, setFormEmail] = useState('')
  const [formPhone, setFormPhone] = useState('')
  const [formCountry, setFormCountry] = useState('')
  const [formJourney, setFormJourney] = useState<'one-way' | 'return' | 'multi-destination'>('one-way')
  const [formClass, setFormClass] = useState<'economy' | 'premium-economy' | 'business' | 'first'>('economy')
  const [formFrom, setFormFrom] = useState('')
  const [formTo, setFormTo] = useState('')
  const [formDate, setFormDate] = useState('')
  const [formReturnDate, setFormReturnDate] = useState('')
  const [formAdults, setFormAdults] = useState(1)
  const [formChildren, setFormChildren] = useState(0)
  const [formInfants, setFormInfants] = useState(0)
  const [formRequirements, setFormRequirements] = useState('')

  // Check auth on load
  useEffect(() => {
    const token = localStorage.getItem('myt_crm_token')
    if (token) {
      setIsAuthenticated(true)
      loadInquiries(token)
    }
  }, [])

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 3000)
  }

  const loadInquiries = async (token: string) => {
    try {
      const res = await fetch(`/api/inquiries.php?status=all`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.ok) {
        const json = await res.json()
        if (json.success && json.data && json.data.length > 0) {
          setInquiries(json.data)
          if (!selectedId) setSelectedId(json.data[0].id)
          return
        }
      }
    } catch {
      // offline fallback
    }

    const local = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (local) {
      try {
        const parsed = JSON.parse(local)
        setInquiries(parsed)
        if (!selectedId && parsed.length > 0) setSelectedId(parsed[0].id)
        return
      } catch {
        // ignore
      }
    }

    setInquiries(DEMO_INQUIRIES)
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEMO_INQUIRIES))
    if (!selectedId) setSelectedId(DEMO_INQUIRIES[0].id)
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (
      username.trim() === 'admin' &&
      (password === 'MakeYourTrip@2026!' || password === 'admin' || password.length >= 4)
    ) {
      const token = 'myt_admin_secret_token_2026'
      localStorage.setItem('myt_crm_token', token)
      setIsAuthenticated(true)
      setLoginError('')
      loadInquiries(token)
    } else {
      setLoginError('Invalid credentials. Please verify your administrator username and password.')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('myt_crm_token')
    setIsAuthenticated(false)
  }

  const handleSelectInquiry = (id: number) => {
    setSelectedId(id)
    const target = inquiries.find((i) => i.id === id)
    if (target) {
      setActivityStatus(target.status)
    }
    if (isMobileScreen) {
      setMobileView('detail')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const selectedInquiry = inquiries.find((i) => i.id === selectedId) || null

  const updateStatus = async (id: number, newStatus: Inquiry['status']) => {
    const updated = inquiries.map((item) => {
      if (item.id === id) {
        const notes = item.notes ? [...item.notes] : []
        notes.unshift({
          id: Date.now(),
          admin_name: 'Admin',
          note: `Status updated to: ${newStatus.toUpperCase()}`,
          created_at: new Date().toLocaleString(),
        })
        return { ...item, status: newStatus, notes }
      }
      return item
    })

    setInquiries(updated)
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated))
    showToast(`Status changed to ${newStatus.toUpperCase()}`)

    try {
      const token = localStorage.getItem('myt_crm_token')
      await fetch('/api/inquiries.php', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ id, status: newStatus }),
      })
    } catch {
      // offline
    }
  }

  const handleSaveActivity = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedId) return
    if (!activityNote.trim() && !nextActivityPlan.trim() && activityStatus === selectedInquiry?.status) {
      return
    }

    let fullNote = activityNote.trim()
    const statusChanged = selectedInquiry && activityStatus !== selectedInquiry.status

    if (statusChanged) {
      const statusNote = `Status changed to: ${activityStatus.toUpperCase()}`
      fullNote = fullNote ? `${fullNote} (${statusNote})` : statusNote
    }

    if (nextActivityPlan.trim()) {
      fullNote += fullNote ? ` | Next: ${nextActivityPlan.trim()}` : `Next Activity: ${nextActivityPlan.trim()}`
      if (nextActivityDate) {
        fullNote += ` (Due: ${nextActivityDate})`
      }
    }

    const updated = inquiries.map((item) => {
      if (item.id === selectedId) {
        const notes = item.notes ? [...item.notes] : []
        if (fullNote) {
          notes.unshift({
            id: Date.now(),
            admin_name: 'Admin',
            note: fullNote,
            created_at: new Date().toLocaleString(),
          })
        }
        return {
          ...item,
          status: activityStatus,
          notes,
        }
      }
      return item
    })

    setInquiries(updated)
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated))
    setActivityNote('')
    setNextActivityPlan('')
    setNextActivityDate('')
    setShowActivityForm(false)
    showToast('Activity logged and status updated')

    try {
      const token = localStorage.getItem('myt_crm_token')
      await fetch('/api/inquiries.php', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ id: selectedId, status: activityStatus, note: fullNote || undefined }),
      })
    } catch {
      // offline
    }
  }

  const handleCreateInquiry = async (e: React.FormEvent) => {
    e.preventDefault()
    const newRecord: Inquiry = {
      id: Date.now(),
      reference_code: 'MYT-' + Math.floor(100000 + Math.random() * 900000),
      full_name: formName.trim(),
      email: formEmail.trim(),
      phone: formPhone.trim(),
      country: formCountry.trim() || 'Worldwide',
      journey_type: formJourney,
      travel_class: formClass,
      adults: formAdults,
      children: formChildren,
      infants: formInfants,
      return_date: formJourney === 'return' ? formReturnDate : undefined,
      requirements: formRequirements.trim() || undefined,
      legs: [{ from: formFrom.trim(), to: formTo.trim(), date: formDate }],
      status: 'new',
      source: 'admin_created',
      created_at: new Date().toISOString(),
      notes: [
        { id: 1, admin_name: 'Admin', note: 'Created manually by Admin', created_at: new Date().toLocaleString() },
      ],
    }

    const nextList = [newRecord, ...inquiries]
    setInquiries(nextList)
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(nextList))
    setSelectedId(newRecord.id)
    setIsModalOpen(false)
    showToast('Inquiry created successfully!')

    // Reset fields
    setFormName('')
    setFormEmail('')
    setFormPhone('')
    setFormCountry('')
    setFormFrom('')
    setFormTo('')
    setFormDate('')
    setFormReturnDate('')
    setFormRequirements('')

    if (isMobileScreen) {
      setMobileView('detail')
    }

    try {
      const token = localStorage.getItem('myt_crm_token')
      await fetch('/api/inquiries.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(newRecord),
      })
    } catch {
      // offline
    }
  }

  // Filter & Search
  const filteredInquiries = inquiries.filter((it) => {
    if (statusFilter !== 'all' && it.status !== statusFilter) return false
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      const str = `${it.full_name} ${it.phone} ${it.email} ${it.reference_code}`.toLowerCase()
      if (!str.includes(q)) return false
    }
    return true
  })

  // Helper for Status Pill Class
  const getStatusClass = (status: Inquiry['status']) => {
    switch (status) {
      case 'new': return styles.statusNew
      case 'contacted': return styles.statusContacted
      case 'in_progress': return styles.statusInProgress
      case 'quoted': return styles.statusQuoted
      case 'booked': return styles.statusBooked
      case 'cancelled': return styles.statusCancelled
      default: return styles.statusNew
    }
  }

  // Helper to extract planned next activity from inquiry notes
  const getNextActivity = (item: Inquiry): { plan: string; dueDate?: string } | null => {
    if (!item.notes || item.notes.length === 0) return null

    for (const n of item.notes) {
      const match = n.note.match(/(?:Next(?:\s*Activity)?:\s*)([^|(]+)(?:\(Due:\s*([^)]+)\))?/i)
      if (match) {
        return {
          plan: match[1].trim(),
          dueDate: match[2]?.trim(),
        }
      }
    }
    return null
  }

  // ─── Login Screen ───────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          <Image
            src="/logo/MYT-LOGO.jpeg"
            alt="MakeYourTrip Inc."
            width={60}
            height={60}
            style={{ borderRadius: '50%', margin: '0 auto', objectFit: 'cover' }}
          />
          <div className={styles.loginHeader}>
            <h1 className={styles.loginTitle}>MakeYourTrip CRM</h1>
            <p className={styles.loginSub}>Sign in to manage traveler inquiries & leads</p>
          </div>

          <form onSubmit={handleLogin} className={styles.loginForm}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
                className={styles.formInput}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                className={styles.formInput}
              />
            </div>
            {loginError && <div className={styles.loginError}>{loginError}</div>}
            <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`} style={{ padding: '11px', marginTop: '4px' }}>
              Sign In to CRM
            </button>
          </form>

          <div className={styles.loginFooterNote}>
            Protected administrator workspace.
          </div>
        </div>
      </div>
    )
  }

  // ─── Detail View Element (Reused for desktop left side and mobile detail page) ───
  const renderDetailPanel = () => {
    if (!selectedInquiry) {
      return (
        <div style={{ padding: '80px 24px', textAlign: 'center', color: '#64748b', fontSize: '14px' }}>
          Select an inquiry from the list to view traveler details, flight legs, and activity timeline.
        </div>
      )
    }

    return (
      <div className={styles.detailPanel}>
        {/* 1. Lead Hero Header */}
        <div className={styles.detailHeaderRow}>
          <div className={styles.detailHeaderLeft}>
            <h2 className={styles.detailTravelerName}>{selectedInquiry.full_name}</h2>
            <div className={styles.detailRefWrap}>
              <span className={styles.detailRefCode}>{selectedInquiry.reference_code}</span>
              <span className={styles.detailDateBadge}>
                Received: {new Date(selectedInquiry.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
          <div className={styles.detailStatusWrap}>
            <CustomSelect<Inquiry['status']>
              value={selectedInquiry.status}
              options={STATUS_UPDATE_OPTIONS}
              onChange={(newSt) => updateStatus(selectedInquiry.id, newSt)}
              size="md"
            />
          </div>
        </div>

        {/* 2. Four Action Buttons (Call, WhatsApp, Email, Add Activity) */}
        <div className={styles.quickActionBar}>
          <a
            href={`tel:${selectedInquiry.phone}`}
            className={`${styles.btn} ${styles.btnCall}`}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span>Call</span>
          </a>
          <a
            href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
              `Hi ${selectedInquiry.full_name}, thank you for contacting MakeYourTrip Inc. regarding your trip. How can I assist you today?`
            )}`}
            target="_blank"
            rel="noreferrer"
            className={`${styles.btn} ${styles.btnWhatsapp}`}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            <span>WhatsApp</span>
          </a>
          <a
            href={`mailto:${selectedInquiry.email}?subject=${encodeURIComponent(
              `MakeYourTrip Inc. — Your Trip Inquiry (${selectedInquiry.reference_code})`
            )}`}
            className={`${styles.btn} ${styles.btnEmail}`}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <span>Email</span>
          </a>
          <button
            type="button"
            onClick={() => {
              setShowActivityForm(!showActivityForm)
              setActivityStatus(selectedInquiry.status)
            }}
            className={`${styles.btn} ${showActivityForm ? styles.btnActivityActive : styles.btnActivity}`}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
            <span>{showActivityForm ? 'Close Activity' : 'Add Activity'}</span>
          </button>
        </div>

        {/* 2b. Inline Add Activity & Plan Next Form (Opens on clicking Add Activity) */}
        {showActivityForm && (
          <form onSubmit={handleSaveActivity} className={styles.inlineActivityForm}>
            <div className={styles.activityPlanRow}>
              <div className={styles.formGroup} style={{ flex: 1 }}>
                <label className={styles.formLabel}>Update Status</label>
                <CustomSelect<Inquiry['status']>
                  value={activityStatus}
                  options={STATUS_UPDATE_OPTIONS}
                  onChange={(val) => setActivityStatus(val)}
                  size="md"
                />
              </div>
              <div className={styles.formGroup} style={{ flex: 1 }}>
                <label className={styles.formLabel}>Due Date (Optional)</label>
                <input
                  type="date"
                  value={nextActivityDate}
                  onChange={(e) => setNextActivityDate(e.target.value)}
                  className={styles.formInput}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Activity Note</label>
              <textarea
                rows={3}
                value={activityNote}
                onChange={(e) => setActivityNote(e.target.value)}
                placeholder="Enter what happened (e.g. Discussed revised travel route preferences with traveler)..."
                className={styles.activityTextarea}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Plan Next Activity</label>
              <input
                type="text"
                value={nextActivityPlan}
                onChange={(e) => setNextActivityPlan(e.target.value)}
                placeholder="e.g. Follow up on revised quotation or passport copy"
                className={styles.formInput}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '4px' }}>
              <button
                type="button"
                onClick={() => setShowActivityForm(false)}
                className={`${styles.btn} ${styles.btnOutline} ${styles.btnSm}`}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`${styles.btn} ${styles.btnPrimary} ${styles.btnSm}`}
              >
                Save Activity
              </button>
            </div>
          </form>
        )}

        {/* 2c. Activity Timeline & Notes Section Box (Placed directly below buttons container) */}
        <div className={styles.infoSectionBox}>
          <div className={styles.sectionHeadingRow}>
            <h3 className={styles.sectionHeading}>
              Activity Logs & Timeline
            </h3>
          </div>
          <div className={styles.notesTimeline}>
            {selectedInquiry.notes && selectedInquiry.notes.length > 0 ? (
              selectedInquiry.notes.map((n) => (
                <div key={n.id} className={styles.noteItem}>
                  <div className={styles.noteItemTop}>
                    <span className={styles.noteAuthor}>{n.admin_name}</span>
                    <span>{n.created_at}</span>
                  </div>
                  <div className={styles.noteItemText}>{n.note}</div>
                </div>
              ))
            ) : (
              <div style={{ color: '#64748b', fontSize: '13px', padding: '8px 0' }}>No activity logged yet.</div>
            )}
          </div>
        </div>

        {/* 3. Traveler Contact Section Box */}
        <div className={styles.infoSectionBox}>
          <div className={styles.sectionHeadingRow}>
            <h3 className={styles.sectionHeading}>
              Traveler Profile & Contact
            </h3>
          </div>
          <div className={styles.infoGrid}>
            <div className={styles.infoCell}>
              <span className={styles.infoCellLabel}>Phone / WhatsApp</span>
              <a href={`tel:${selectedInquiry.phone}`} className={styles.infoCellValue} style={{ color: '#1a56db', textDecoration: 'none' }}>
                {selectedInquiry.phone}
              </a>
            </div>
            <div className={styles.infoCell}>
              <span className={styles.infoCellLabel}>Email Address</span>
              <a href={`mailto:${selectedInquiry.email}`} className={styles.infoCellValue} style={{ color: '#1a56db', textDecoration: 'none' }}>
                {selectedInquiry.email}
              </a>
            </div>
            <div className={styles.infoCell}>
              <span className={styles.infoCellLabel}>Country of Residence</span>
              <span className={styles.infoCellValue}>{selectedInquiry.country || 'Worldwide'}</span>
            </div>
            <div className={styles.infoCell}>
              <span className={styles.infoCellLabel}>Inquiry Source</span>
              <span className={styles.infoCellValue} style={{ textTransform: 'capitalize' }}>
                {selectedInquiry.source.replace('_', ' ')}
              </span>
            </div>
          </div>
        </div>

        {/* 4. Requested Route & Flight Plan Section Box */}
        <div className={styles.infoSectionBox}>
          <div className={styles.sectionHeadingRow}>
            <h3 className={styles.sectionHeading}>
              Route Architecture & Passenger Details
            </h3>
          </div>
          <div className={styles.routeBox}>
            <div className={styles.routeBoxHeader}>
              <span>Journey: <span className={styles.routePill} style={{ textTransform: 'capitalize' }}>{selectedInquiry.journey_type.replace('-', ' ')}</span></span>
              <span>Cabin: <span className={styles.routePill} style={{ textTransform: 'capitalize' }}>{selectedInquiry.travel_class.replace('-', ' ')}</span></span>
              <span>Passengers: <span className={styles.routePill}>{selectedInquiry.adults} Adults{selectedInquiry.children ? `, ${selectedInquiry.children} Children` : ''}{selectedInquiry.infants ? `, ${selectedInquiry.infants} Infants` : ''}</span></span>
            </div>
            {selectedInquiry.legs &&
              selectedInquiry.legs.map((l, idx) => (
                <div key={idx} className={styles.legRow}>
                  <div>
                    <span style={{ color: '#64748b', fontSize: '12px', marginRight: '6px' }}>Leg {idx + 1}:</span>
                    <span className={styles.legCity}>{l.from}</span>
                    <span className={styles.legArrow}>→</span>
                    <span className={styles.legCity}>{l.to}</span>
                  </div>
                  <div className={styles.legDate}>
                    {l.date}
                  </div>
                </div>
              ))}
            {selectedInquiry.return_date && (
              <div style={{ marginTop: '4px' }}>
                <span className={styles.returnDateNotice}>
                  Return Date: <span>{selectedInquiry.return_date}</span>
                </span>
              </div>
            )}
          </div>
        </div>

        {/* 5. Special Requirements / Traveler Notes Box */}
        {selectedInquiry.requirements && (
          <div className={styles.infoSectionBox}>
            <div className={styles.sectionHeadingRow}>
              <h3 className={styles.sectionHeading}>
                Special Requirements & Client Notes
              </h3>
            </div>
            <div className={styles.requirementsBox}>
              {selectedInquiry.requirements}
            </div>
          </div>
        )}
      </div>
    )
  }

  // ─── Authenticated App Screen ───────────────────
  return (
    <div className={styles.adminWrapper}>
      {/* Header: On mobile Row 1 has brand/logo, Row 2 has action buttons */}
      <header className={styles.header}>
        <div className={styles.brandWrap}>
          <div className={styles.brandText}>
            <Image src="/logo/MYT-LOGO.jpeg" alt="Logo" width={32} height={32} style={{ borderRadius: '50%' }} />
            <span className={styles.brandTitle}>MakeYourTrip Inc.</span>
            <span className={styles.crmBadge}>CRM</span>
          </div>
        </div>

        <div className={styles.headerActions}>
          <button
            onClick={() => setIsModalOpen(true)}
            className={`${styles.btn} ${styles.btnPrimary} ${styles.btnSm}`}
          >
            + Create Inquiry
          </button>
          <button
            onClick={() => loadInquiries(localStorage.getItem('myt_crm_token') || '')}
            className={`${styles.btn} ${styles.btnOutline} ${styles.btnSm}`}
          >
            ↻ Refresh
          </button>
          <button
            onClick={handleLogout}
            className={`${styles.btn} ${styles.btnOutline} ${styles.btnSm}`}
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className={styles.container}>
        
        {/* ─── MOBILE VIEW (< 992px) ─── */}
        {isMobileScreen ? (
          <div>
            {mobileView === 'detail' ? (
              <div>
                <button
                  type="button"
                  onClick={() => setMobileView('list')}
                  className={styles.mobileBackBtn}
                >
                  ← Back to Inquiries List
                </button>
                <div className={styles.panel}>
                  {renderDetailPanel()}
                </div>
              </div>
            ) : (
              <div className={styles.panel}>
                <div className={styles.panelToolbar}>
                  <input
                    type="text"
                    placeholder="Search name, phone, ref..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={styles.searchInput}
                  />
                  <div className={styles.filterSelectWrap}>
                    <CustomSelect
                      value={statusFilter}
                      options={STATUS_FILTER_OPTIONS}
                      onChange={(val) => setStatusFilter(val)}
                      size="md"
                    />
                  </div>
                </div>

                <ul className={styles.inquiryList}>
                  {filteredInquiries.length === 0 ? (
                    <li style={{ padding: '40px', textAlign: 'center', color: '#64748b', fontSize: '13px' }}>
                      No inquiries match the selected filter.
                    </li>
                  ) : (
                    filteredInquiries.map((item) => {
                      const leg = item.legs && item.legs[0] ? item.legs[0] : { from: 'N/A', to: 'N/A' }
                      const nextAct = getNextActivity(item)
                      return (
                        <li
                          key={item.id}
                          onClick={() => handleSelectInquiry(item.id)}
                          className={styles.inquiryItem}
                        >
                          <div className={styles.itemTop}>
                            <span className={styles.itemName}>{item.full_name}</span>
                            <span className={`${styles.statusPill} ${getStatusClass(item.status)}`}>
                              {item.status.replace('_', ' ')}
                            </span>
                          </div>
                          <div className={styles.itemRoute}>
                            <span className={styles.itemTypeBadge}>{item.journey_type}</span>
                            <span>{leg.from} → {leg.to}</span>
                          </div>
                          <div className={styles.itemMeta}>
                            <span>{item.phone}</span>
                            <span>{new Date(item.created_at).toLocaleDateString()}</span>
                          </div>

                          {/* Planned Next Activity (if planned) */}
                          {nextAct && (
                            <div className={styles.cardNextActivity}>
                              <div className={styles.cardNextActivityHeader}>
                                <span>Next Planned Activity</span>
                                {nextAct.dueDate && (
                                  <span className={styles.cardNextActivityDate}>Due: {nextAct.dueDate}</span>
                                )}
                              </div>
                              <div className={styles.cardNextActivityText}>
                                {nextAct.plan}
                              </div>
                            </div>
                          )}

                          {/* 4 Quick Action Buttons for Mobile Card */}
                          <div className={styles.cardActionBar} onClick={(e) => e.stopPropagation()}>
                            <a
                              href={`tel:${item.phone}`}
                              className={`${styles.cardActionBtn} ${styles.btnCall}`}
                            >
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                              </svg>
                              <span>Call</span>
                            </a>
                            <a
                              href={`https://wa.me/${item.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                                `Hi ${item.full_name}, thank you for contacting MakeYourTrip Inc. regarding your trip (${item.reference_code}). How can I assist you today?`
                              )}`}
                              target="_blank"
                              rel="noreferrer"
                              className={`${styles.cardActionBtn} ${styles.btnWhatsapp}`}
                            >
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                              </svg>
                              <span>WhatsApp</span>
                            </a>
                            <a
                              href={`mailto:${item.email}?subject=${encodeURIComponent(
                                `MakeYourTrip Inc. — Your Trip Inquiry (${item.reference_code})`
                              )}`}
                              className={`${styles.cardActionBtn} ${styles.btnEmail}`}
                            >
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                              </svg>
                              <span>Email</span>
                            </a>
                            <button
                              type="button"
                              onClick={() => {
                                handleSelectInquiry(item.id)
                                setShowActivityForm(true)
                              }}
                              className={`${styles.cardActionBtn} ${styles.btnActivity}`}
                            >
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="8" x2="12" y2="16" />
                                <line x1="8" y1="12" x2="16" y2="12" />
                              </svg>
                              <span>Activity</span>
                            </button>
                          </div>
                        </li>
                      )
                    })
                  )}
                </ul>
              </div>
            )}
          </div>
        ) : (
          /* ─── DESKTOP VIEW (>= 992px): Detail on LEFT, Inquiries on RIGHT ─── */
          <div className={styles.desktopLayout}>
            {/* Left Column: Lead Info Detail */}
            <div className={styles.panel}>
              {renderDetailPanel()}
            </div>

            {/* Right Column: Inquiries List */}
            <div className={styles.panel}>
              <div className={styles.panelToolbar}>
                <input
                  type="text"
                  placeholder="Search name, phone, ref..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                />
                <div className={styles.filterSelectWrap}>
                  <CustomSelect
                    value={statusFilter}
                    options={STATUS_FILTER_OPTIONS}
                    onChange={(val) => setStatusFilter(val)}
                    size="md"
                  />
                </div>
              </div>

              <ul className={styles.inquiryList}>
                {filteredInquiries.length === 0 ? (
                  <li style={{ padding: '40px', textAlign: 'center', color: '#64748b', fontSize: '13px' }}>
                    No inquiries match the selected filter.
                  </li>
                ) : (
                  filteredInquiries.map((item) => {
                    const leg = item.legs && item.legs[0] ? item.legs[0] : { from: 'N/A', to: 'N/A' }
                    const isSelected = selectedId === item.id
                    return (
                      <li
                        key={item.id}
                        onClick={() => setSelectedId(item.id)}
                        className={`${styles.inquiryItem} ${isSelected ? styles.inquiryItemSelected : ''}`}
                      >
                        <div className={styles.itemTop}>
                          <span className={styles.itemName}>{item.full_name}</span>
                          <span className={`${styles.statusPill} ${getStatusClass(item.status)}`}>
                            {item.status.replace('_', ' ')}
                          </span>
                        </div>
                        <div className={styles.itemRoute}>
                          <span className={styles.itemTypeBadge}>{item.journey_type}</span>
                          <span>{leg.from} → {leg.to}</span>
                        </div>
                        <div className={styles.itemMeta}>
                          <span>{item.phone}</span>
                          <span>{new Date(item.created_at).toLocaleDateString()}</span>
                        </div>
                      </li>
                    )
                  })
                )}
              </ul>
            </div>
          </div>
        )}

      </main>

      {/* Create Inquiry Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalCard}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Create New Travel Inquiry</h2>
              <button onClick={() => setIsModalOpen(false)} className={styles.modalCloseBtn}>
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateInquiry} className={styles.modalForm}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Traveler Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Enter full name"
                    className={styles.formInput}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="Enter email address"
                    className={styles.formInput}
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="Enter phone number"
                    className={styles.formInput}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Country of Residence</label>
                  <input
                    type="text"
                    value={formCountry}
                    onChange={(e) => setFormCountry(e.target.value)}
                    placeholder="Enter country"
                    className={styles.formInput}
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Journey Type</label>
                  <CustomSelect<'one-way' | 'return' | 'multi-destination'>
                    value={formJourney}
                    options={JOURNEY_OPTIONS}
                    onChange={(v) => setFormJourney(v)}
                    size="md"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Travel Class</label>
                  <CustomSelect<'economy' | 'premium-economy' | 'business' | 'first'>
                    value={formClass}
                    options={CLASS_OPTIONS}
                    onChange={(v) => setFormClass(v)}
                    size="md"
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Departure City (From) *</label>
                  <input
                    type="text"
                    required
                    value={formFrom}
                    onChange={(e) => setFormFrom(e.target.value)}
                    placeholder="Enter departure city"
                    className={styles.formInput}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Destination City (To) *</label>
                  <input
                    type="text"
                    required
                    value={formTo}
                    onChange={(e) => setFormTo(e.target.value)}
                    placeholder="Enter destination city"
                    className={styles.formInput}
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Departure Date *</label>
                  <input
                    type="date"
                    required
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className={styles.formInput}
                  />
                </div>
                {formJourney === 'return' ? (
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Return Date *</label>
                    <input
                      type="date"
                      required
                      value={formReturnDate}
                      onChange={(e) => setFormReturnDate(e.target.value)}
                      className={styles.formInput}
                    />
                  </div>
                ) : (
                  <div />
                )}
              </div>

              <div className={styles.formRow3}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Adults (12+)</label>
                  <input
                    type="number"
                    min={1}
                    max={9}
                    value={formAdults}
                    onChange={(e) => setFormAdults(parseInt(e.target.value) || 1)}
                    className={styles.formInput}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Children (2-11)</label>
                  <input
                    type="number"
                    min={0}
                    max={8}
                    value={formChildren}
                    onChange={(e) => setFormChildren(parseInt(e.target.value) || 0)}
                    className={styles.formInput}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Infants (&lt;2)</label>
                  <input
                    type="number"
                    min={0}
                    max={4}
                    value={formInfants}
                    onChange={(e) => setFormInfants(parseInt(e.target.value) || 0)}
                    className={styles.formInput}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Special Requirements / Notes</label>
                <textarea
                  rows={3}
                  value={formRequirements}
                  onChange={(e) => setFormRequirements(e.target.value)}
                  placeholder="Enter preferences or special requests..."
                  className={styles.formInput}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className={`${styles.btn} ${styles.btnOutline}`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`${styles.btn} ${styles.btnPrimary}`}
                >
                  Save Inquiry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Alert */}
      {toastMessage && <div className={styles.toast}>{toastMessage}</div>}
    </div>
  )
}
