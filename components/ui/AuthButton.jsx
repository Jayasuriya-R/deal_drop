'use client'

import React from 'react'
import { LogIn, LogOut } from 'lucide-react'
import { Button } from './button'
import { AuthModal } from './AuthModal'
import { signOut } from '@/app/action'

function AuthButton({user}) {
  const [isAuthOpen, setIsAuthOpen] = React.useState(false)
   console.log(user)
  if(user) {
      
    return (
      <Button variant="default" size="sm" className="w-full sm:w-auto bg-gray-600 hover:bg-gray-500 text-white gap-2" onClick={signOut}>
        <LogOut className="w-4 h-4" />
        Sign Out
      </Button>
    )
  }

  return (
    <>
      <Button
        variant="default"
        size="sm"
        className="w-full sm:w-auto bg-orange-600 hover:bg-orange-500 gap-2"
        onClick={() => setIsAuthOpen(true)}
      >
        <LogIn className="w-4 h-4" />
        Sign In
      </Button>

      <AuthModal
        isOpen={isAuthOpen}
        onOpenChange={setIsAuthOpen}
      />
    </>
  )
}

export default AuthButton