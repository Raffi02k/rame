import React, { createContext, useContext, useState } from "react";
import { Task, TaskStatus } from "../types";
import { TASKS } from "../lib/demo-data";

type StatusMap = Record<string, TaskStatus>;

interface TaskContextType {
    tasks: Task[];
    addTask: (task: Task) => void;

    // dateKey är valfri så din gamla kod fortsätter funka
    updateTask: (id: string, updates: Partial<Task>, dateKey?: string) => void;

    deleteTask: (id: string) => void;

    // Datum-specifik status (taskId + date)
    getTaskStatus: (taskId: string, dateKey: string) => TaskStatus;
    setTaskStatus: (taskId: string, dateKey: string, status: TaskStatus) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const makeStatusKey = (taskId: string, dateKey: string) => `${taskId}:${dateKey}`;

export function TaskProvider({ children }: { children: React.ReactNode }) {
    const [tasks, setTasks] = useState<Task[]>(TASKS);

    // här sparas status per datum
    const [statusByDate, setStatusByDate] = useState<StatusMap>({});

    const addTask = (task: Task) => {
        setTasks((prev) => [...prev, task]);
    };

    const setTaskStatus = (taskId: string, dateKey: string, status: TaskStatus) => {
        const key = makeStatusKey(taskId, dateKey);
        setStatusByDate((prev) => ({ ...prev, [key]: status }));
    };

    const getTaskStatus = (taskId: string, dateKey: string) => {
        const key = makeStatusKey(taskId, dateKey);
        return statusByDate[key] ?? TaskStatus.PENDING;
    };

    const updateTask = (id: string, updates: Partial<Task>, dateKey?: string) => {
        // Om uppdateringen gäller status och vi har dateKey -> skriv till statusByDate
        if (updates.status && dateKey) {
            setTaskStatus(id, dateKey, updates.status);

            // skriv inte status in i själva task-objektet (då blir den “global” igen)
            const { status, ...rest } = updates;
            updates = rest;
        }

        setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
    };

    const deleteTask = (id: string) => {
        setTasks((prev) => prev.filter((t) => t.id !== id));

        // Städa statusByDate:
        setStatusByDate((prev) => {
            const next = { ...prev };
            Object.keys(next).forEach((k) => {
                if (k.startsWith(`${id}:`)) delete next[k];
            });
            return next;
        });
    };

    return (
        <TaskContext.Provider
            value={{ tasks, addTask, updateTask, deleteTask, getTaskStatus, setTaskStatus }}
        >
            {children}
        </TaskContext.Provider>
    );
}

export function useTasks() {
    const context = useContext(TaskContext);
    if (!context) throw new Error("useTasks must be used within a TaskProvider");
    return context;
}
