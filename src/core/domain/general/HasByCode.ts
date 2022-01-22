export function hasByCode<T extends { code: string }>(
	code: string,
	collection: ReadonlyArray<T>
): boolean {
	return !collection.every(ancestry => ancestry.code !== code)
}
