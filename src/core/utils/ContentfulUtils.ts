import * as contentful from "contentful"

const client = contentful.createClient({
	space: process.env.CONTENTFUL_SPACE || "just_so_tests_dont_fail",
	accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || "just_so_tests_dont_fail"
})

export async function fetchEntries<T>(type: string): Promise<ReadonlyArray<T>> {
	//These are the max values for both limit and include at the time
	const response = await client.getEntries({
		content_type: type,
		limit: 1000,
		include: 10
	})
	return contentfulToArrayOfPlainObjects(response.items)
}

function contentfulToArrayOfPlainObjects(arr: ReadonlyArray<any>) {
	return arr.map(x => unwrap(x)).sort((x, y) => x.code.localeCompare(y.code))
}

function contentfulToPlainObject(obj: any) {
	const result = { ...obj.fields }
	for (const [key, value] of Object.entries(result)) {
		result[key] = Array.isArray(value)
			? contentfulToArrayOfPlainObjects(value)
			: unwrap(value)
	}
	return result
}

function unwrap(value: any) {
	if (!value.hasOwnProperty("sys")) return value
	if (value.sys.type === "Asset") return value.fields.file.url
	if (value.sys.type === "Entry") return contentfulToPlainObject(value)
	throw `Cannot handle type '${value.sys.type}'`
}
