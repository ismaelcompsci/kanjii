"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./ui/dialog"

interface ModalProps {
  isOpen: boolean
  onChange: (open: boolean) => void
  title: string
  description: string
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onChange,
  title,
  description,
  children,
}) => {
  return (
    <Dialog open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <DialogContent>
        <DialogTitle className="text-xl text-center font-bold mb-4">
          {title}
        </DialogTitle>
        <DialogDescription className="mb-5 text-center">
          {description}
        </DialogDescription>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  )
}

export default Modal