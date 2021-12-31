import sanitizeCharacterSheet from "@core/domain/character_sheet/sanitization/SanitizeCharacterSheet"
import getMongoDBClient from "@core/utils/GetMongoDBClient"
import { ObjectId } from "mongodb"

export async function getCharacterSheetOfId(id: string) {
	const client = await getMongoDBClient()
	const characters = await client
		.collection("CHARACTERS")
		.find(
			{ _id: new ObjectId(id) },
			{
				projection: {
					name: 1,
					avatar: 1,
					ancestry: 1,
					profession1: 1,
					profession2: 1,
					profession3: 1,
					age: 1,
					skills: 1,
					attributes: 1
				}
			}
		)
		.toArray()

	if (characters.length === 0) throw Error(`No character of id '${id}' found`)

	const character = characters.map(({ _id, thumbnail, ...x }) => ({
		...x,
		id: _id.toString()
	}))[0]
	return sanitizeCharacterSheet(character)
}
