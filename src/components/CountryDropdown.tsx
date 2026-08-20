import { useState, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { COUNTRIES } from '../data/countries'
import type { ApiCountry } from '../api/locations'

interface CountryItem {
  code: string
  name: string
  flag: string
  europe: boolean
}

interface Props {
  value: string
  onChange: (code: string) => void
  placeholder?: string
  apiCountries?: ApiCountry[]
  loading?: boolean
}

function buildItems(apiCountries?: ApiCountry[]): { europe: CountryItem[]; rest: CountryItem[] } {
  const items: CountryItem[] = apiCountries
    ? apiCountries.map((c) => {
        const staticMatch = COUNTRIES.find((s) => s.code === c.iso2)
        return {
          code: c.iso2,
          name: c.name,
          flag: staticMatch?.flag ?? '🌍',
          europe: staticMatch?.europe ?? false,
        }
      })
    : COUNTRIES.map((c) => ({ code: c.code, name: c.name, flag: c.flag, europe: c.europe ?? false }))

  return {
    europe: items.filter((c) => c.europe),
    rest: items.filter((c) => !c.europe),
  }
}

export default function CountryDropdown({
  value,
  onChange,
  placeholder = 'Select country',
  apiCountries,
  loading = false,
}: Props) {
  const [open, setOpen]           = useState(false)
  const [search, setSearch]       = useState('')
  const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({})
  const triggerRef = useRef<HTMLButtonElement>(null)
  const searchRef  = useRef<HTMLInputElement>(null)

  const { europe: europeAll, rest: restAll } = buildItems(apiCountries)
  const allItems = [...europeAll, ...restAll]
  const selected = allItems.find((c) => c.code === value)

  const filter = (list: CountryItem[]) =>
    list.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))

  const europe = filter(europeAll)
  const rest   = filter(restAll)

  function openMenu() {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      setMenuStyle({ position: 'fixed', top: rect.bottom + 4, left: rect.left, width: rect.width, zIndex: 9999 })
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

  function select(code: string) {
    onChange(code)
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
          placeholder="Search country..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="search-dropdown__list">
        {europe.length > 0 && (
          <>
            <div className="search-dropdown__group-label">Europe</div>
            {europe.map((c) => (
              <button
                key={c.code}
                type="button"
                className={`search-dropdown__item ${c.code === value ? 'is-selected' : ''}`}
                onClick={() => select(c.code)}
              >
                <span className="search-dropdown__item-flag">{c.flag}</span>
                <span className="search-dropdown__item-name">{c.name}</span>
              </button>
            ))}
          </>
        )}
        {rest.length > 0 && (
          <>
            <div className="search-dropdown__group-label">Other</div>
            {rest.map((c) => (
              <button
                key={c.code}
                type="button"
                className={`search-dropdown__item ${c.code === value ? 'is-selected' : ''}`}
                onClick={() => select(c.code)}
              >
                <span className="search-dropdown__item-flag">{c.flag}</span>
                <span className="search-dropdown__item-name">{c.name}</span>
              </button>
            ))}
          </>
        )}
        {europe.length === 0 && rest.length === 0 && (
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
        className={`search-dropdown__trigger auth-form__input ${!selected ? 'is-placeholder' : ''}`}
        onClick={() => (open ? setOpen(false) : openMenu())}
        disabled={loading}
      >
        {loading ? (
          <span className="search-dropdown__placeholder">Loading…</span>
        ) : selected ? (
          <span className="search-dropdown__selected">
            <span className="search-dropdown__flag">{selected.flag}</span>
            <span>{selected.name}</span>
          </span>
        ) : (
          <span className="search-dropdown__placeholder">{placeholder}</span>
        )}
        <svg className="search-dropdown__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {ReactDOM.createPortal(menu, document.body)}
    </div>
  )
}
