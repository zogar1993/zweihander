import * as contentful from "contentful"
import { ContentfulClientApi } from "contentful"

export function importify(entries: Array<any>, type: string) {
	return {
		contentTypes: [],
		tags: [],
		editorInterfaces: [],
		entries: entries.map(x => contentfullify(x, type)),
		assets: [],
		locales: [],
		webhooks: [],
		roles: []
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
					id: type
				}
			}
		},
		fields: usify(entry)
	}
}

const usify = (data: any) => {
	const result: any = {}
	for (const key in data) result[key] = { "en-US": data[key] }
	return result
}

//TODO make this tidier
let _client: ContentfulClientApi | null = null
const client = () => {
	if (_client) return _client
	_client = contentful.createClient({
		space: process.env.CONTENTFUL_SPACE!,
		accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!
	})
	return _client
}

export async function fetchEntries<T>(type: string): Promise<Array<T>> {
	//These are the max values for both limit and include at the time
	const response = await client().getEntries({
		content_type: type,
		limit: 1000,
		include: 10
	})
	return contentfulToArrayOfPlainObjects(response.items)
}

function contentfulToArrayOfPlainObjects(arr: Array<any>) {
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
