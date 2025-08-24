import React, { useState } from 'react'

export default function NameBanner() {
  const [name, setName] = useState(localStorage.getItem('rbl:name') || '')

  const save = () => {
    localStorage.setItem('rbl:name', name.trim())
    alert('Saved! You will be able to edit/delete reviews made with this name on this browser.')
  }

  return (
    <div className="name-banner" style={{marginBottom: 16}}>
      <strong>Set your name</strong>
      <p className="muted" style={{marginTop: 4}}>No login needed. We use your name to tag reviews and show edit/delete options for your own reviews on this device.</p>
      <div className="stack">
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name…" style={{maxWidth: 320}} />
        <button className="button" onClick={save}>Save</button>
      </div>
    </div>
  )
}
