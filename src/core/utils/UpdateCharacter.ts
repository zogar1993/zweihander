import getMongoDBClient from "@core/utils/GetMongoDBClient"
import { ObjectId } from "mongodb"

export default async function updateCharacter(
	id: string,
	timestamp: string | null,
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

	const result = await client
		.collection("CHARACTERS")
		.updateOne({ _id: new ObjectId(id), updated_at: timestamp }, patch)

	if (result.modifiedCount === 0)
		throw Error(
			"No modifications were made. " +
				"This is most likely because of an old 'if-unmodified-since' value."
		)
}

export type UpdateCharacterProps = {
	set?: Record<string, any>
	pull?: Record<string, any>
	push?: Record<string, any>
	unset?: ReadonlyArray<string>
}
