'use client'

import React from 'react'
import { LogIn } from 'lucide-react'
import { Button } from './button'
import { AuthModal } from './AuthModal'

function AuthButton() {
  const [isAuthOpen, setIsAuthOpen] = React.useState(false)

  return (
    <>
      <Button
        variant="default"
        size="sm"
        className="bg-orange-600 hover:bg-orange-500 gap-2"
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