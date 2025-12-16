// src/pages/admin/components/TasksTodayCard.tsx
import { Card, CardContent } from "../../../components/card"
import { Task, TaskCategory } from "../../../lib/types"
import {
  categoryColors,
  assignments,
  getServiceUserById,
  getStaffById,
} from "../../../lib/demo-data"

interface TasksTodayCardProps {
  tasks: Task[]
}

const CATEGORY_ORDER: TaskCategory[] = ["HSL", "Brukarnära", "Praktisk", "Administrativ"]

const CATEGORY_LABELS: Record<TaskCategory, string> = {
  HSL: "HSL / medicinskt",
  Brukarnära: "Brukarnära insatser",
  Praktisk: "Praktiska uppgifter",
  Administrativ: "Administrativt",
}

// Hitta assignering för en task
function getAssignmentForTask(taskId: string) {
  return assignments.find((a) => a.taskId === taskId)
}

function formatStatus(taskId: string): string {
  const a = getAssignmentForTask(taskId)
  if (!a) return "Ej planerad i demo"

  if (a.status === "planned") return "Planerad"
  if (a.status === "inProgress") return "Pågår"

  if (a.status === "done") {
    const doneTime = a.completedAt ? ` ${a.completedAt}` : ""
    const staff = a.signedBy ? getStaffById(a.signedBy) : undefined
    const who = staff ? ` (${staff.initials})` : ""
    return `Klar${doneTime}${who}`
  }

  return "Okänd status"
}

export function TasksTodayCard({ tasks }: TasksTodayCardProps) {
  if (tasks.length === 0) {
    return (
      <Card>
        {/* ✅ Prototyp-grå text */}
        <CardContent className="py-6 text-sm text-gray-500">
          Inga demo-uppgifter inlagda för idag.
        </CardContent>
      </Card>
    )
  }

  const tasksByCategory: Record<TaskCategory, Task[]> = {
    Brukarnära: tasks.filter((t) => t.category === "Brukarnära"),
    HSL: tasks.filter((t) => t.category === "HSL"),
    Praktisk: tasks.filter((t) => t.category === "Praktisk"),
    Administrativ: tasks.filter((t) => t.category === "Administrativ"),
  }

  return (
    <Card>
      <CardContent className="space-y-4">
        {/* ✅ Titelrad mer prototyp */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Dagens uppgifter</h2>
          <p className="text-xs font-medium text-gray-500">
            {tasks.length} uppgifter i demon
          </p>
        </div>

        <div className="space-y-6">
          {CATEGORY_ORDER.map((cat) => {
            const list = tasksByCategory[cat]
            if (!list || list.length === 0) return null

            const colors = categoryColors[cat]

            return (
              <div key={cat} className="space-y-2">
                {/* ✅ Kategorichip (behåller dina färger) */}
                <div
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${colors.bg} ${colors.text} ${colors.border}`}
                >
                  {CATEGORY_LABELS[cat]}
                  <span className="text-[10px] opacity-80">{list.length} st</span>
                </div>

                {/* ✅ Lista med tasks */}
                <div className="space-y-2">
                  {list.map((task) => {
                    const su = task.serviceUserId ? getServiceUserById(task.serviceUserId) : undefined
                    const statusLabel = formatStatus(task.id)

                    return (
                      <div
                        key={task.id}
                        className={[
                          // ✅ Mer prototyp: vit yta + subtil hover
                          "rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm",
                          "hover:bg-gray-50/50 transition-colors",
                        ].join(" ")}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            {/* ✅ Prototyp-grå för tid */}
                            <p className="text-xs font-medium text-gray-500">
                              {task.startTime}–{task.endTime}
                            </p>

                            <p className="font-semibold text-gray-900 leading-snug">
                              {task.title}
                            </p>

                            {su && (
                              <p className="text-xs text-gray-500 mt-0.5">
                                {su.fullName}
                                {su.roomNumber && <> · Rum {su.roomNumber}</>}
                                {su.floorLabel && <> · {su.floorLabel}</>}
                                {su.wing && <> · {su.wing}</>}
                              </p>
                            )}
                          </div>

                          {/* ✅ Chips till höger (neutralare grå) */}
                          <div className="flex flex-col items-end gap-1 text-[11px]">
                            <span className="inline-flex rounded-full bg-gray-100 px-2 py-0.5 font-medium text-gray-600 border border-gray-200">
                              {statusLabel}
                            </span>

                            <div className="flex flex-wrap justify-end gap-1">
                              {task.requiresSignature && (
                                <span className="inline-flex rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-medium text-red-700 border border-red-200">
                                  Signering krävs
                                </span>
                              )}
                              {task.requiresTwoStaff && (
                                <span className="inline-flex rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-700 border border-blue-200">
                                  2 personal
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
