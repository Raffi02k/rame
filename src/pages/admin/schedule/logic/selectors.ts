import { Person, Task } from "../../../../types";
import { getShiftForDate } from "../../../../lib/utils";

/** Shared: Staff filter (day + week) */
export function getVisibleStaff(staff: Person[], activeUnitId?: string): Person[] {
    return staff.filter((person) => !activeUnitId || person.unitId === activeUnitId);
}

/** Day-specific: tasks for ONE day (date-specific) */
export function getVisibleTasks(tasks: Task[], currentDateStr: string, activeUnitId?: string): Task[] {
    return tasks.filter((task) => {
        const matchesUnit = !activeUnitId || task.unitId === activeUnitId;
        const matchesDate = !task.date || task.date === currentDateStr;
        return matchesUnit && matchesDate;
    });
}
/** Day-specific: timeline window check */
export function isInDayView(task: Task, viewStartHour: number, viewEndHour: number): boolean {
    const startHour = Number(task.timeStart.split(":")[0]);
    return startHour >= viewStartHour && startHour < viewEndHour;
}

// Week selectors 
/** Week: prefilter tasks by unit only (optional, but recommended) */
export function getVisableTaskByUnit(tasks: Task[], activeUnitId?: string): Task[] {
    return tasks.filter((task) => !activeUnitId || task.unitId === activeUnitId);
}

// Week: tasks for ONE person + ONE day
export function getWeekTasksForPersonAndDay(
    tasks: Task[],
    person: Person,
    date: Date,
    dateStr: string,
    activeLang: string
): Task[] {
    const shift = getShiftForDate(person.id, date, activeLang);
    return tasks.filter((task) => {
        const matchesDate = !task.date || task.date === dateStr;
        if (!matchesDate) return false;

        const matchesShiftRole = !!task.shiftRole && task.shiftRole === shift.id;
        const matchesAssigneeWhenNoShiftRole = !task.shiftRole && !!task.assigneeId && task.assigneeId === person.id;

        return matchesShiftRole || matchesAssigneeWhenNoShiftRole;
    });
}

/** Week: tasks for ONE day that are unassigned (optional helper) */
export function getWeekUnassignedTasksForDay(tasks: Task[], dateStr: string): Task[] {
    return tasks.filter((task) => {
        const matchesDate = !task.date || task.date === dateStr;
        return matchesDate && !task.assigneeId && !task.shiftRole;
    });
}