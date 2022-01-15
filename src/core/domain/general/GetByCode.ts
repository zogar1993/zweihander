export function getByCode<T extends { code: string }>(
	code: string,
	collection: ReadonlyArray<T>
): T {
	const item = collection.find(ancestry => ancestry.code === code)
	if (item === undefined)
		throw Error(
			`Code '${code}' not found inside of '${JSON.stringify(collection)}'`
		)

	return item
}
