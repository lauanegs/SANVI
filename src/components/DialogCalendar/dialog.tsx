"use client"

import type * as React from "react"
import styles from "./dialogcalendar.module.css"

interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}

const Dialog: React.FC<DialogProps> = ({ open, onOpenChange, children }) => {
  if (!open) return null

  return (
    <div className={styles.dialogContainer}>
      {children}
    </div>
  )
}

interface DialogContentProps {
  className?: string
  children: React.ReactNode
}

const DialogContent: React.FC<DialogContentProps> = ({ className = "", children }) => {
  return (
    <div className={styles.overlay}>
      <div className={`${styles.content} ${className}`}>{children}</div>
    </div>
  )
}

interface DialogHeaderProps {
  className?: string
  children: React.ReactNode
}

const DialogHeader: React.FC<DialogHeaderProps> = ({ className = "", children }) => {
  return <div className={`${styles.header} ${className}`}>{children}</div>
}

interface DialogFooterProps {
  className?: string
  children: React.ReactNode
}

const DialogFooter: React.FC<DialogFooterProps> = ({ className = "", children }) => {
  return <div className={`${styles.footer} ${className}`}>{children}</div>
}

interface DialogTitleProps {
  className?: string
  children: React.ReactNode
}

const DialogTitle: React.FC<DialogTitleProps> = ({ className = "", children }) => {
  return <h2 className={`${styles.title} ${className}`}>{children}</h2>
}

interface DialogDescriptionProps {
  className?: string
  children: React.ReactNode
}

const DialogDescription: React.FC<DialogDescriptionProps> = ({ className = "", children }) => {
  return <p className={`${styles.description} ${className}`}>{children}</p>
}

// Additional components to match the original structure
const DialogTrigger: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>
}

const DialogClose: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>
}

export { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogClose }
