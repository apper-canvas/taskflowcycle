import { useState } from 'react'
import Input from '@/components/atoms/Input'
import Button from '@/components/atoms/Button'

const SearchBar = ({ onSearch, placeholder = "Search tasks...", className = '' }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(searchTerm)
  }

  const handleClear = () => {
    setSearchTerm('')
    onSearch('')
  }

  return (
    <form onSubmit={handleSubmit} className={`flex gap-3 ${className}`}>
      <div className="flex-1">
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          icon="Search"
          iconPosition="left"
        />
      </div>
      
      <div className="flex gap-2">
        {searchTerm && (
          <Button
            type="button"
            variant="ghost"
            size="md"
            icon="X"
            onClick={handleClear}
          />
        )}
        
        <Button
          type="submit"
          variant="primary"
          size="md"
          icon="Search"
        >
          Search
        </Button>
      </div>
    </form>
  )
}

export default SearchBar