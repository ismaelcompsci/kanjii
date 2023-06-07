"use client"

import { useEffect, useState } from "react"

import LoginModal from "@/components/login-modal"
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
      <LoginModal />
      <RegisterModal />
    </>
  )
}

export default ModalProvider
