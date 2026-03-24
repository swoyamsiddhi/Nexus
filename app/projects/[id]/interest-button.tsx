'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Sparkles, CheckCircle2 } from 'lucide-react'
import { InterestModal } from '@/components/projects/interest-modal'
import { Project } from '@/components/projects/types'

export function InterestButton({ project, hasExpressed }: { project: Project, hasExpressed: boolean }) {
  const [showModal, setShowModal] = useState(false)

  if (hasExpressed) {
     return (
       <Button className="w-full rounded-full h-14 font-black italic uppercase tracking-widest bg-green-500 hover:bg-green-600 text-white cursor-default">
         <CheckCircle2 className="h-5 w-5 mr-2" /> Interest Expressed
       </Button>
     )
  }

  return (
    <>
      <Button 
        className="w-full rounded-full h-14 font-black italic uppercase tracking-widest shadow-lg shadow-primary/20"
        onClick={() => setShowModal(true)}
      >
        <Sparkles className="h-5 w-5 mr-2" /> I want to collaborate
      </Button>

      {showModal && (
        <InterestModal project={project} onClose={() => setShowModal(false)} />
      )}
    </>
  )
}
