"use client"

import React from "react"
import { FileText } from "lucide-react"

export function ReportView() {
  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
            <FileText size={16} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Nattrapport</h3>
            <p className="text-xs text-gray-500">Signerad av Nattpatrullen 06:45</p>
          </div>
        </div>

        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
          Lugn natt. Bo har sovit hela natten. Anna ringde på larmet kl 03:00, ville ha vatten.
          Åtgärdat. Inga andra avvikelser.
        </p>
      </div>
    </div>
  )
}
