import fs from "fs"
import path from "path"
import {fetchEntries} from "./ContentfulUtils"


export async function getEntries<T>(type: string) {
	const cachePath = path.resolve(`.cache/${type}`)
	try {
		const entries = readFile(cachePath)
		console.log(`Using cache for ${type}`)
		return entries
	} catch (error) {}

	const data = await fetchEntries(type)
	try {
		writeFile(cachePath, data)
		console.log(`Wrote to ${type} cache`)
	} catch (error) {
		console.log(`ERROR WRITING ${type.toUpperCase()} CACHE TO FILE`)
		console.log(error)
	}

	return data
}

const readFile = (path: string) => JSON.parse(fs.readFileSync(path, 'utf8'))
const writeFile = (path: string, data: any) => fs.writeFileSync(path,	JSON.stringify(data),	'utf8')