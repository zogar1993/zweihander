import getMongoDBClient from "@core/utils/GetMongoDBClient"
import { ObjectId } from "mongodb"

export default async function updateCharacter(
	id: string,
	{ set, pull, push, unset }: UpdateCharacterProps
) {
	const client = await getMongoDBClient()

	const unsets = unset ? {} : undefined as any
	if (unset) unset.forEach(x => unsets[x] = "")

	await client
		.collection("CHARACTERS")
		.updateOne(
			{ _id: new ObjectId(id) },
			{ $set: set, $push: push, $pull: pull, $unset: unset }
		)
}

export type UpdateCharacterProps = {
	set?: Record<string, any>
	pull?: Record<string, any>
	push?: Record<string, any>
	unset?: Array<string>
}
