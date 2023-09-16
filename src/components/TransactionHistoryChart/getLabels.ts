
export default function getLabels(expenses: Map<string, number>, incomes: Map<string, number>) {
    const labels: string[] = []
    for (const [key,value] of expenses) {
        labels.push(key)
    }
    for (const [key,value] of incomes) {
        labels.push(key)
    }
    const withoutDuplicates = new Set(labels)
    return Array.from(withoutDuplicates)
} 