// Ren helper: lokal YYYY-MM-DD (stabil, undviker UTC-buggar)
export function toLocalYMD(date: Date): string {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const dayOfMonth = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${dayOfMonth}`;
}