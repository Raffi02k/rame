import { Person, Task } from "../../../../types";

export function getVisibleStaff(staff: Person[], activeUnitId?: string): Person[] {
    return staff.filter((person) => !activeUnitId || person.unitId === activeUnitId);
}

export function getVisibleTasks(tasks: Task[], currentDateStr: string, activeUnitId?: string): Task[] {
    return tasks.filter((task) => {
        const matchesUnit = !activeUnitId || task.unitId === activeUnitId;
        const matchesDate = !task.date || task.date === currentDateStr;
        return matchesUnit && matchesDate;
    });
}

export function isInDayView(task: Task, viewStartHour: number, viewEndHour: number): boolean {
    const startHour = Number(task.timeStart.split(":")[0]);
    return startHour >= viewStartHour && startHour < viewEndHour;
}
