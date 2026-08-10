import { useState, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { REGIONS } from '../data/regions'

interface Props {
  countryCode: string
  value: string
  onChange: (city: string) => void
}

export default function RegionDropdown({ countryCode, value, onChange }: Props) {
  const [open, setOpen]         = useState(false)
  const [search, setSearch]     = useState('')
  const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({})
  const triggerRef = useRef<HTMLButtonElement>(null)
  const searchRef  = useRef<HTMLInputElement>(null)

  const cities   = REGIONS[countryCode] ?? []
  const filtered = cities.filter((c) => c.toLowerCase().includes(search.toLowerCase()))

  function openMenu() {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      setMenuStyle({
        position: 'fixed',
        top: rect.bottom + 4,
        left: rect.left,
        width: rect.width,
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
        !(e.target as Element).closest('.search-dropdown__menu')
      ) {
        setOpen(false)
        setSearch('')
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  // Reset open state when country changes
  useEffect(() => {
    setOpen(false)
    setSearch('')
  }, [countryCode])

  if (cities.length === 0) {
    return (
      <input
        className="auth-form__input"
        type="text"
        placeholder="e.g. Your city"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    )
  }

  function select(city: string) {
    onChange(city)
    setOpen(false)
    setSearch('')
  }

  const menu = open ? (
    <div className="search-dropdown__menu" style={menuStyle}>
      <div className="search-dropdown__search-wrap">
        <svg className="search-dropdown__search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          ref={searchRef}
          className="search-dropdown__search"
          type="text"
          placeholder="Search city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="search-dropdown__list">
        {filtered.map((city) => (
          <button
            key={city}
            type="button"
            className={`search-dropdown__item ${city === value ? 'is-selected' : ''}`}
            onClick={() => select(city)}
          >
            <span className="search-dropdown__item-name">{city}</span>
          </button>
        ))}
        {filtered.length === 0 && (
          <div className="search-dropdown__empty">No results</div>
        )}
      </div>
    </div>
  ) : null

  return (
    <div className="search-dropdown">
      <button
        ref={triggerRef}
        type="button"
        className={`search-dropdown__trigger auth-form__input ${!value ? 'is-placeholder' : ''}`}
        onClick={() => open ? setOpen(false) : openMenu()}
      >
        {value ? (
          <span className="search-dropdown__selected">{value}</span>
        ) : (
          <span className="search-dropdown__placeholder">Select city</span>
        )}
        <svg className="search-dropdown__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {ReactDOM.createPortal(menu, document.body)}
    </div>
  )
}
