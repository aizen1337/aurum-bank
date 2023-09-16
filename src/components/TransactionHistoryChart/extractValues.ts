
export default function extractValues(data: Map<string,number>) {
    const onlyValues: number[] = []
    for (const [key,value] of data) {
        onlyValues.push(value)
    }
    return onlyValues
}   