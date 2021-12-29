import getMongoDBClient from "@core/utils/GetMongoDBClient"
import { ObjectId } from "mongodb"

export async function getCharacterSheetOfId(id: string) {
	const client = await getMongoDBClient()
	const characters = await client
		.collection("CHARACTERS")
		.find({ _id: new ObjectId(id) })
		.toArray()

	if (characters.length === 0) throw Error(`No character of id '${id}' found`)

	return characters.map(({ _id, thumbnail, ...x }) => ({
		id: _id.toString(),
		name: x.name
	}))[0]
}
