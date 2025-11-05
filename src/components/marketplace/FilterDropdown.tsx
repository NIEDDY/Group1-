import React from 'react'

type Props = {
  options: string[]
  value: string | null
  onChange: (v: string | null) => void
  placeholder?: string
}

const FilterDropdown: React.FC<Props> = ({ options, value, onChange, placeholder }) => {
  return (
    <div>
      <select
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value || null)}
        className="border rounded px-3 py-2 w-64"
      >
        <option value="">{placeholder || 'All'}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  )
}

export default FilterDropdown
