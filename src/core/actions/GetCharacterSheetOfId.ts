import sanitizeCharacterSheet from "@core/domain/character_sheet/sanitization/SanitizeCharacterSheet"
import getMongoDBClient from "@core/utils/GetMongoDBClient"
import { ObjectId } from "mongodb"

export default async function getCharacterSheetOfId(id: string) {
	const client = await getMongoDBClient()
	const raw = await client.collection("CHARACTERS").findOne(
		{ _id: new ObjectId(id) },
		{
			projection: {
				name: 1,
				avatar: 1,
				age: 1,
				sex: 1,
				upbringing: 1,
				social_class: 1,
				ancestry: 1,
				ancestry_trait: 1,
				archetype: 1,
				profession1: 1,
				profession2: 1,
				profession3: 1,
				skills: 1,
				attributes: 1,
				order_alignment: 1,
				chaos_alignment: 1,
				order_ranks: 1,
				chaos_ranks: 1,
				corruption: 1,
				peril: 1,
				damage: 1,
				talents: 1,
				spells: 1,
				focuses: 1,
				mercy: 1,
				journal: 1,
				settings: 1,
				created_by: 1,
				updated_at: 1
			}
		}
	)

	if (raw === null) throw Error(`No character of id '${id}' found`)

	const character = { ...raw, id: raw._id.toString() }
	return sanitizeCharacterSheet(character)
}

export async function getCharacterSheetMeta(
	id: string
): Promise<CharacterSheetMeta> {
	const client = await getMongoDBClient()
	const character = await client
		.collection("CHARACTERS")
		.findOne({ _id: new ObjectId(id) }, { projection: { created_by: 1 } })

	if (character === null) throw Error(`No character of id '${id}' found`)

	return character as unknown as CharacterSheetMeta
}

type CharacterSheetMeta = { created_by: string }
