import { useEffect, useState } from 'react'
import { fetchCategories } from '../api/categories'

interface Result {
  active: boolean
  loading: boolean
}

export function useCategoryActive(slug: string): Result {
  const [active, setActive] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCategories()
      .then((cats) => setActive(cats.some((c) => c.slug === slug)))
      .catch(() => setActive(false))
      .finally(() => setLoading(false))
  }, [slug])

  return { active, loading }
}
