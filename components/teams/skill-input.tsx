'use client'

import { useState, KeyboardEvent } from 'react'
import { Badge } from '@/components/ui/badge'
import { X } from 'lucide-react'

export function SkillInput({ value, onChange }: { value: string[], onChange: (val: string) => void }) {
  const [inputValue, setInputValue] = useState('')

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      const newSkill = inputValue.trim()
      if (newSkill && !value.includes(newSkill)) {
        const newValue = [...value, newSkill].join(',')
        onChange(newValue)
        setInputValue('')
      }
    } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
      const newValue = value.slice(0, -1).join(',')
      onChange(newValue)
    }
  }

  const removeSkill = (skill: string) => {
    const newValue = value.filter(s => s !== skill).join(',')
    onChange(newValue)
  }

  return (
    <div className="space-y-3">
       <div className="flex flex-wrap gap-2 mb-2 p-3 min-h-[46px] rounded-xl border bg-muted/20 focus-within:border-primary/50 transition-colors">
          {value.map(skill => (
            <Badge key={skill} variant="secondary" className="flex items-center gap-1 py-1 pl-3 pr-1.5 h-6 rounded-lg text-xs font-bold bg-white text-primary border-primary/20">
              {skill}
              <button 
                type="button" 
                onClick={() => removeSkill(skill)}
                className="hover:bg-primary/10 rounded-sm p-0.5 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          <input 
            type="text"
            className="flex-1 bg-transparent border-none outline-none text-sm min-w-[120px]"
            placeholder={value.length === 0 ? "Type skill (e.g. React) and press Enter" : ""}
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
       </div>
       <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest pl-1">Press Enter or comma to add a skill</p>
    </div>
  )
}
