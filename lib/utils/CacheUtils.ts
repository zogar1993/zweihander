import fs from "fs"
import path from "path"
import { contentfulToPlainObject, fetchEntries } from "./ContentfulUtils"

export async function getEntries<T>(
	type: string,
	options: { links?: Array<string>; resources?: Array<string> } = {}
) {
	const cachePath = path.resolve(`.cache/${type}`)
	try {
		const entries = readFile(cachePath)
		console.log(`Using cache for ${type}`)
		return entries
	} catch (error) {}

	let data = await fetchEntries(type)

	data = data.map(contentfulToPlainObject)
	if (options.links) {
		for (const link of options.links) {
			data.forEach((entry: any) => {
				entry[link] = (entry[link] as Array<any>).map(contentfulToPlainObject)
			})
		}
	}

	if (options.resources) {
		for (const resource of options.resources) {
			data.forEach((entry: any) => {
				entry[resource] = contentfulToPlainObject(entry[resource]).file.url
			})
		}
	}

	try {
		writeFile(cachePath, data)
		console.log(`Wrote to ${type} cache`)
	} catch (error) {
		console.log(`ERROR WRITING ${type.toUpperCase()} CACHE TO FILE`)
		console.log(error)
	}

	return data
}

const readFile = (path: string) => JSON.parse(fs.readFileSync(path, "utf8"))
const writeFile = (path: string, data: any) =>
	fs.writeFileSync(path, JSON.stringify(data), "utf8")
