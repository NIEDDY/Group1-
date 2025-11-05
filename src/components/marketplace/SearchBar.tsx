import React from 'react'

type Props = {
  value: string
  onChange: (v: string) => void
  placeholder?: string
}

const SearchBar: React.FC<Props> = ({ value, onChange, placeholder }) => {
  return (
    <div className="flex-1">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-indigo-300"
        placeholder={placeholder || 'Search...'}
      />
    </div>
  )
}

export default SearchBar
