import getMongoDBClient from "@core/utils/GetMongoDBClient"
import { ObjectId } from "mongodb"

export default async function getCharacterSheetOfIdMetadata(
	id: string
): Promise<CharacterSheetMeta | null> {
	const client = await getMongoDBClient()
	const character = await client
		.collection("CHARACTERS")
		.findOne({ _id: new ObjectId(id) }, { projection: { created_by: 1 } })

	return character as any
}

type CharacterSheetMeta = { created_by: string }
