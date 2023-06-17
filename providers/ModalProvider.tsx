"use client"

import { useEffect, useState } from "react"

import AuthModal from "@/components/auth-modal"
import RegisterModal from "@/components/register-modal"

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <AuthModal />
      <RegisterModal />
    </>
  )
}

export default ModalProvider
