export function getDeepPropertyValue(parts: Array<string>, obj: any): any {
	return parts.length === 0
		? obj
		: parts.length === 1
		? obj[parts[0]]
		: getDeepPropertyValue(parts.slice(1), obj[parts[0]])
}
