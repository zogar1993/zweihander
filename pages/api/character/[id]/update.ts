// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import updateCharacter from "@core/utils/UpdateCharacter"
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
	const pushActions = {} as any
	const pullActions = {} as any
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
					case "corruption":
						setActions["corruption"] = action.value
						break
					case "chaos_ranks":
						setActions["chaos_ranks"] = action.value
						break
					case "order_ranks":
						setActions["order_ranks"] = action.value
						break
					case "skills":
						//TODO cleanse part 1
						switch (parts[2]) {
							case "ranks":
								setActions[`skills.${parts[1]}.ranks`] = action.value
								break
							default:
								res.status(500)
								return
						}
						break
					case "attributes":
						//TODO cleanse part 1
						switch (parts[2]) {
							case "base":
								setActions[`attributes.${parts[1]}.base`] = action.value
								break
							case "advances":
								setActions[`attributes.${parts[1]}.advances`] = action.value
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
				break
			case "remove_from_array":
				switch (
					parts[0] //TODO validate that there are no extra parts?
				) {
					case "focuses":
						pullActions[`focuses.${parts[1]}`] = action.value
						break
					case "spells":
						pullActions[`spells.${parts[1]}`] = action.value
						break
					case "talents":
						pullActions["talents"] = action.value
						break
					default:
						res.status(500)
						return
				}
				break
			case "add_to_array":
				switch (
					parts[0] //TODO validate that there are no extra parts?
				) {
					case "focuses":
						pushActions[`focuses.${parts[1]}`] = action.value
						break
					case "spells":
						pushActions[`spells.${parts[1]}`] = action.value
						break
					case "talents":
						pushActions["talents"] = action.value
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

	await updateCharacter(id, {
		set: setActions,
		pull: pullActions,
		push: pushActions
	})
	res.status(200)
}

export type UpdateAction = {
	action: "set_value" | "remove_from_array" | "add_to_array"
	property: string
	value: any
}
