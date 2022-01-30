import getMongoDBClient from "@core/utils/GetMongoDBClient"
import { ObjectId } from "mongodb"

export default async function deleteCharacterSheetOfId(id: string) {
	const client = await getMongoDBClient()
	await client.collection("CHARACTERS").deleteOne({ _id: new ObjectId(id) })
}
