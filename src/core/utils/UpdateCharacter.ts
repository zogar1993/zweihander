import getMongoDBClient from "@core/utils/GetMongoDBClient"
import { ObjectId } from "mongodb"

export default async function updateCharacter(
	id: string,
	{ set, pull, push, unset }: UpdateCharacterProps
) {
	const client = await getMongoDBClient()

	const unsets = unset ? {} : (undefined as any)
	if (unset) unset.forEach(x => (unsets[x] = ""))

	const patch = {} as any
	if (set) patch["$set"] = set
	if (pull) patch["$pull"] = pull
	if (push) patch["$push"] = push
	if (unset) patch["$unset"] = unsets

	await client
		.collection("CHARACTERS")
		.updateOne({ _id: new ObjectId(id) }, patch)
}

export type UpdateCharacterProps = {
	set?: Record<string, any>
	pull?: Record<string, any>
	push?: Record<string, any>
	unset?: Array<string>
}
