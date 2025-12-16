"use client"

import React from "react"
import { X } from "lucide-react"
import { ReportView } from "../components/ReportView"

export function ReportModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute left-1/2 top-1/2 w-[95vw] max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white shadow-xl border border-gray-200">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-base font-bold text-gray-900">Rapport</h2>
            <p className="text-xs text-gray-500">Senaste nattrapport</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-50 text-gray-600"
            aria-label="Stäng"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-5">
          <ReportView />
        </div>
      </div>
    </div>
  )
}
