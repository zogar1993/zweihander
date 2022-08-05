import { getSession } from "@auth0/nextjs-auth0"
import getCharacterSheetOfId from "@core/actions/GetCharacterSheetOfId"
import { flattenResults } from "@core/api/FlattenResults"
import { getActionResult, InternalError } from "@core/api/GetActionResult"
import { UpdateActionCode } from "@core/api/UpdateActionCode"
import { validateArrayErrors } from "@core/api/ValidateArrayErrors"
import { validateModel } from "@core/api/ValidateModel"
import applyActionsToCharacter from "@core/utils/ApplyActionsToCharacter"
import now from "@core/utils/Now"
import updateCharacter, {
	UpdateCharacterProps
} from "@core/utils/UpdateCharacter"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
): Promise<any> {
	const session = await getSession(req, res)
	if (!session) return res.status(401).end()

	const id = req.query.id
	if (Array.isArray(id)) return res.status(500).end()

	const last_modified = req.headers["if-unmodified-since"]
	if (!last_modified) return res.status(400).end()

	const actions = JSON.parse(req.body) as Array<UpdateAction>
	if (!Array.isArray(actions) || actions.length === 0)
		return res.status(400).end()

	const incompatible_actions = getIncompatibleActions(actions)
	if (incompatible_actions.length > 0)
		return res.status(400).json([`there can only be one action per property, received ${JSON.stringify(incompatible_actions)}`])

	const client_errors: Array<[UpdateAction, string]> = []
	const results: Array<UpdateCharacterProps> = []

	for (const action of actions) {
		try {
			results.push(await getActionResult(action))
		} catch (e: any) {
			if (!Array.isArray(e)) throw e
			client_errors.push(e as InternalError)
		}
	}

	if (client_errors.length > 0) return res.status(400).json(client_errors)

	const character = await getCharacterSheetOfId(id)

	if (session.user.email !== character.created_by)
		return res.status(403).json({})

	const preexisting_errors = await validateModel(character)
	if (preexisting_errors.length > 0)
		return res.status(500).json(preexisting_errors)

	const array_errors = validateArrayErrors(character, actions)
	if (array_errors.length > 0) return res.status(409).json(array_errors)

	const changed = applyActionsToCharacter(character, actions)

	const conflict_errors = await validateModel(changed)
	if (conflict_errors.length > 0) return res.status(409).json(conflict_errors)

	const new_update_time = now()
	results.push({ set: { updated_at: new_update_time } })

	try {
		await updateCharacter(id, last_modified, flattenResults(results))
	} catch (e) {
		const error = e as Error
		return res.status(500).json(error.message)
	}
	res.status(204).setHeader("last-modified", new_update_time).end()
}

function getIncompatibleActions(actions: Array<UpdateAction>) {
	const properties = [...new Set(actions.map(x => x.property))]
	//We group actions by property name
	let results = properties.map(property => actions.filter(action => action.property === property))
	//We exclude properties with one action
	results = results.filter(actions => actions.length > 1)
	//We exclude properties which just combine "add_to_array" and "remove_from_array"
	return results.filter(actions => !(
		actions.length === 2 &&
		actions.some(action => action.action === "add_to_array") &&
		actions.some(action => action.action === "remove_from_array")
	))
}

export type UpdateAction = Readonly<{
	action: UpdateActionCode
	property: string
	value?: any
}>
