import fs from "fs"
import path from "path"
import { contentfulToPlainObject, fetchEntries } from "./ContentfulUtils"

export async function getEntries<T>(
	type: string,
	options: { links?: Array<string>; resources?: Array<string> } = {}
): Promise<Array<T>> {
	const cachePath = path.resolve(`.cache/${type}`)
	try {
		const entries = readFile(cachePath)
		//console.log(`Using cache for ${type}`)
		return entries
	} catch (error) {}

	let data = await fetchEntries(type)

	data = data.map(contentfulToPlainObject)

	try {
		writeFile(cachePath, data)
		//console.log(`Wrote to ${type} cache`)
	} catch (error) {
		//console.log(`ERROR WRITING ${type.toUpperCase()} CACHE TO FILE`)
		//console.log(error)
	}

	return data as Array<T>
}

const readFile = (path: string) => JSON.parse(fs.readFileSync(path, "utf8"))
const writeFile = (path: string, data: any) =>
	fs.writeFileSync(path, JSON.stringify(data), "utf8")
