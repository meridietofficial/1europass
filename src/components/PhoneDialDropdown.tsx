import { useState, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { COUNTRIES } from '../data/countries'

interface Props {
  value: string
  onChange: (dial: string) => void
}

export default function PhoneDialDropdown({ value, onChange }: Props) {
  const [open, setOpen]         = useState(false)
  const [search, setSearch]     = useState('')
  const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({})
  const triggerRef = useRef<HTMLButtonElement>(null)
  const searchRef  = useRef<HTMLInputElement>(null)

  const selected = COUNTRIES.find((c) => c.dial === value) ?? COUNTRIES[0]

  const filtered = COUNTRIES.filter((c) => {
    const q = search.toLowerCase()
    return c.name.toLowerCase().includes(q) || c.dial.includes(q)
  })

  const europe = filtered.filter((c) => c.europe)
  const rest   = filtered.filter((c) => !c.europe)

  function openMenu() {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      setMenuStyle({
        position: 'fixed',
        top: rect.bottom + 4,
        left: rect.left,
        width: Math.max(rect.width, 260),
        zIndex: 9999,
      })
    }
    setOpen(true)
  }

  useEffect(() => {
    if (open) setTimeout(() => searchRef.current?.focus(), 50)
  }, [open])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        triggerRef.current && !triggerRef.current.contains(e.target as Node) &&
        !(e.target as Element).closest('.dial-dropdown__menu')
      ) {
        setOpen(false)
        setSearch('')
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function select(dial: string) {
    onChange(dial)
    setOpen(false)
    setSearch('')
  }

  const menu = open ? (
    <div className="dial-dropdown__menu" style={menuStyle}>
      <div className="dial-dropdown__search-wrap">
        <svg className="dial-dropdown__search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          ref={searchRef}
          className="dial-dropdown__search"
          type="text"
          placeholder="Search country..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="dial-dropdown__list">
        {europe.length > 0 && (
          <>
            <div className="dial-dropdown__group-label">Europe</div>
            {europe.map((c) => (
              <button
                key={c.code}
                type="button"
                className={`dial-dropdown__item ${c.dial === value ? 'is-selected' : ''}`}
                onClick={() => select(c.dial)}
              >
                <span className="dial-dropdown__item-flag">{c.flag}</span>
                <span className="dial-dropdown__item-name">{c.name}</span>
                <span className="dial-dropdown__item-code">{c.dial}</span>
              </button>
            ))}
          </>
        )}
        {rest.length > 0 && (
          <>
            <div className="dial-dropdown__group-label">Other</div>
            {rest.map((c) => (
              <button
                key={c.code}
                type="button"
                className={`dial-dropdown__item ${c.dial === value ? 'is-selected' : ''}`}
                onClick={() => select(c.dial)}
              >
                <span className="dial-dropdown__item-flag">{c.flag}</span>
                <span className="dial-dropdown__item-name">{c.name}</span>
                <span className="dial-dropdown__item-code">{c.dial}</span>
              </button>
            ))}
          </>
        )}
        {europe.length === 0 && rest.length === 0 && (
          <div className="dial-dropdown__empty">No results</div>
        )}
      </div>
    </div>
  ) : null

  return (
    <div className="dial-dropdown">
      <button
        ref={triggerRef}
        type="button"
        className="dial-dropdown__trigger"
        onClick={() => open ? setOpen(false) : openMenu()}
      >
        <span className="dial-dropdown__flag">{selected.flag}</span>
        <span className="dial-dropdown__code">{selected.dial}</span>
        <svg className="dial-dropdown__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {ReactDOM.createPortal(menu, document.body)}
    </div>
  )
}
