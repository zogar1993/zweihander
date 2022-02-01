import { SanitizedCharacterSheet } from "@core/domain/character_sheet/sanitization/SanitizeCharacterSheet"
import getMongoDBClient from "@core/utils/GetMongoDBClient"

export default async function createCharacter(
	character: SanitizedCharacterSheet
) {
	const client = await getMongoDBClient()
	const result = await client.collection("CHARACTERS").insertOne(character)
	return result.insertedId
}
