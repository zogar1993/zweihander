import getMongoDBClient from "@core/utils/GetMongoDBClient"
import { ObjectId } from "mongodb"

export default async function updateCharacter(
	id: string,
	{
		set,
		pull,
		push
	}: {
		set: Record<string, any>
		pull: Record<string, any>
		push: Record<string, any>
	}
) {
	const client = await getMongoDBClient()

	await client
		.collection("CHARACTERS")
		.updateOne({ _id: new ObjectId(id) }, { $set: set, $push: push, $pull: pull })
}
