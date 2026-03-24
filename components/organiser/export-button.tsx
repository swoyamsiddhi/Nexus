'use client'

import { Button } from '@/components/ui/button'
import { FileDown } from 'lucide-react'

export function ExportCSVButton({ data, filename }: { data: any[], filename: string }) {
  const exportToCSV = () => {
    if (data.length === 0) return

    const headers = Object.keys(data[0]).join(',')
    const rows = data.map(obj => 
      Object.values(obj).map(val => `"${val}"`).join(',')
    ).join('\n')

    const csvContent = `${headers}\n${rows}`
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', `${filename}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Button variant="outline" onClick={exportToCSV}>
      <FileDown className="mr-2 h-4 w-4" />
      Export CSV
    </Button>
  )
}
