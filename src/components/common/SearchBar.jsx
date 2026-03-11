import { useState } from 'react'
import { Search, X, Filter } from 'lucide-react'

export default function SearchBar({
  placeholder = 'Search...', onSearch, filters = [],
  activeFilters = [], onFilterChange, className = ''
}) {
  const [query, setQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const handleChange = (e) => {
    const value = e.target.value
    setQuery(value)
    // Debounced search
    clearTimeout(window._searchTimeout)
    window._searchTimeout = setTimeout(() => onSearch?.(value), 300)
  }

  const clearSearch = () => {
    setQuery('')
    onSearch?.('')
  }

  const toggleFilter = (filter) => {
    const updated = activeFilters.includes(filter)
      ? activeFilters.filter(f => f !== filter)
      : [...activeFilters, filter]
    onFilterChange?.(updated)
  }

  return (
    <div className={className}>
      <div className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal-muted" />
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder={placeholder}
            className="w-full pl-12 pr-10 py-3 rounded-xl border border-gray-200 dark:border-dark-border
              bg-white dark:bg-dark-card text-charcoal dark:text-gray-200
              focus:ring-2 focus:ring-primary-500 focus:border-transparent
              transition-all duration-200 text-base touch-target"
            aria-label="Search"
          />
          {query && (
            <button onClick={clearSearch} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-dark-surface" aria-label="Clear search">
              <X size={16} />
            </button>
          )}
        </div>
        {filters.length > 0 && (
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-3 rounded-xl border transition-colors touch-target ${showFilters || activeFilters.length ? 'border-primary-500 bg-primary-50 text-primary-600' : 'border-gray-200 dark:border-dark-border text-charcoal-muted hover:bg-gray-50'
              }`}
            aria-label="Toggle filters"
          >
            <Filter size={20} />
          </button>
        )}
      </div>
      {showFilters && filters.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => toggleFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all touch-target ${activeFilters.includes(filter)
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-dark-surface text-charcoal-muted dark:text-gray-400 hover:bg-gray-200'
                }`}
            >
              {filter}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
