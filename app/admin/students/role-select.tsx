'use client'

import { useState } from 'react'
import { updateUserRole } from '../actions'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function RoleSelect({ userId, currentRole }: { userId: string, currentRole: string }) {
  const [isUpdating, setIsUpdating] = useState(false)

  const handleRoleChange = async (newRole: string | null) => {
    if (!newRole) return
    setIsUpdating(true)
    await updateUserRole(userId, newRole)
    setIsUpdating(false)
  }

  return (
    <div className="flex justify-end items-center">
      <Select 
        defaultValue={currentRole} 
        onValueChange={handleRoleChange}
        disabled={isUpdating}
      >
        <SelectTrigger className="w-[110px] h-8 text-xs">
          <SelectValue placeholder="Role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="student">Student</SelectItem>
          <SelectItem value="organiser">Organiser</SelectItem>
          <SelectItem value="admin">Admin</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
