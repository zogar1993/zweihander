import getMongoDBClient from "@core/utils/GetMongoDBClient"
import { ObjectId } from "mongodb"

export default async function updateCharacter(
	id: string,
	{set}: Record<string, any>
) {
	const client = await getMongoDBClient()

	await client
		.collection("CHARACTERS")
		.updateOne({ _id: new ObjectId(id) }, { $set: set })
}
