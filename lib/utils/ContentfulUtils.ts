export function importify(entries: Array<any>, type: string) {
	return {
		contentTypes: [],
		tags: [],
		editorInterfaces: [],
		entries: entries.map(x => contentfullify(x, type)),
		assets: [],
		locales: [],
		webhooks: [],
		roles: [],
	}
}

function contentfullify(entry: any, type: string) {
	return {
		metadata: { tags: [] },
		sys: {
			type: "Entry",
			contentType: {
				sys: {
					type: "Link",
					linkType: "ContentType",
					id: type,
				},
			},
		},
		fields: usify(entry),
	}
}

const usify = (data: any) => {
	const result: any = {}
	for (const key in data) result[key] = { "en-US": data[key] }
	return result
}

const contentful = require("contentful")

const client = contentful.createClient({
	space: process.env.CONTENTFUL_SPACE,
	accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
})

export async function fetchEntries<T>(type: string): Promise<Array<T>> {
	const response = await client.getEntries({
		content_type: type,
		limit: 1000,
		include: 10,
	})
	return response.items
}

//TODO make cache folder create itself
export function contentfulToPlainObject(obj: any) {
	const result = { ...obj.fields }
	for (const [key, value] of Object.entries(result)) {
		result[key] = Array.isArray(value)
			? value.map(x => unwrap(x))
			: unwrap(value)
	}
	return result
}

function unwrap(value: any) {
	if (!value.hasOwnProperty("sys")) return value
	if (value.sys.type === "Asset") return value.fields.file.url
	console.log(value)
	if (value.sys.type === "Entry") {
		return contentfulToPlainObject(value)
	}
}
