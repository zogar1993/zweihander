// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import getMongoDBClient from "@core/utils/GetMongoDBClient"
import updateCharacter from "@core/utils/UpdateCharacter"
import { ObjectId } from "mongodb"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const id = req.query.id
	if (Array.isArray(id)) {
		res.status(500)
		return
	}

	const actions = req.body as Array<UpdateAction>
	if (!Array.isArray(actions)) {
		res.status(500)
		return
	}
	const setActions = {} as any
	for (const action of actions) {
		const parts = action.property.split(".")
		switch (action.action) {
			case "set_value":
				switch (
					parts[0] //TODO validate that theree are no extra parts?
				) {
					case "name":
						setActions["name"] = action.value
						break
					case "age":
						setActions["age"] = action.value
						break
					case "sex":
						setActions["sex"] = action.value
						break
					case "ancestry":
						setActions["ancestry"] = action.value
						break
					case "ancestry_trait":
						setActions["ancestry_trait"] = action.value
						break
					case "archetype":
						setActions["archetype"] = action.value
						break
					case "order_alignment":
						setActions["order_alignment"] = action.value
						break
					case "chaos_alignment":
						setActions["chaos_alignment"] = action.value
						break
					case "profession_1":
						setActions["profession_1"] = action.value
						break
					case "profession_2":
						setActions["profession_2"] = action.value
						break
					case "profession_3":
						setActions["profession_3"] = action.value
						break
					case "social_class":
						setActions["social_class"] = action.value
						break
					case "upbringing":
						setActions["upbringing"] = action.value
						break
					default:
						res.status(500)
						return
				}
				break
			default:
				res.status(500)
				return
		}
	}

	await updateCharacter(id, { set: setActions })
	res.status(200)
}

async function patch(req: NextApiRequest, res: NextApiResponse) {
	{
		const { id } = req.query
		if (Array.isArray(id)) {
			res.status(500)
			return
		}
		const patch = req.body
		const client = await getMongoDBClient()

		await client
			.collection("CHARACTERS")
			.updateOne({ _id: new ObjectId(id) }, { $set: JSON.parse(patch) })
		res.status(200)
	}
}

export type UpdateAction = {
	action: "set_value" | "remove_from_array"
	property: string
	value: any
}
