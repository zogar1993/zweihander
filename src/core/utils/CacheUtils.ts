import fs from "fs"
import path from "path"
import { fetchEntries } from "./ContentfulUtils"

export async function getEntries<T>(type: string): Promise<ReadonlyArray<T>> {
	const cachePath = path.resolve(`.cache/${type}`)
	try {
		const entries = readFile(cachePath)
		console.log(`Using cache for ${type}`)
		return entries
	} catch (error) {}

	const entries = await fetchEntries(type)

	try {
		writeFile(cachePath, entries)
		console.log(`Wrote to ${type} cache`)
	} catch (error) {
		console.log(`ERROR WRITING ${type.toUpperCase()} CACHE TO FILE`)
		console.log(error)
	}

	return entries as ReadonlyArray<T>
}

const readFile = (path: string) => JSON.parse(fs.readFileSync(path, "utf8"))
const writeFile = (path: string, data: any) => {
	if (!fs.existsSync(".cache")) fs.mkdirSync(".cache")
	fs.writeFileSync(path, JSON.stringify(data), "utf8")
}
