import { getSession } from "@auth0/nextjs-auth0"
import getCharacterSheetOfId from "@core/actions/GetCharacterSheetOfId"
import { flattenResults } from "@core/api/FlattenResults"
import { getActionResult, InternalError } from "@core/api/GetActionResult"
import { UpdateActionCode } from "@core/api/UpdateActionCode"
import { validateArrayErrors } from "@core/api/ValidateArrayErrors"
import { validateModel } from "@core/api/ValidateModel"
import applyActionsToCharacter from "@core/utils/ApplyActionsToCharacter"
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

	const actions = JSON.parse(req.body) as Array<UpdateAction>
	if (!Array.isArray(actions) || actions.length === 0)
		return res.status(400).end()

	const client_errors: Array<[UpdateAction, string]> = []
	const results: Array<UpdateCharacterProps> = []

	if (new Set(actions.map(x => x.property)).size < actions.length)
		return res.status(400).json(["there can only be one action per property"])

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

	if (session.user.nickname !== character.created_by)
		return res.status(403).json({})

	const preexisting_errors = await validateModel(character)
	if (preexisting_errors.length > 0)
		return res.status(500).json(preexisting_errors)

	const array_errors = validateArrayErrors(character, actions)
	if (array_errors.length > 0) return res.status(409).json(array_errors)

	const changed = applyActionsToCharacter(character, actions)

	const conflict_errors = await validateModel(changed)
	if (conflict_errors.length > 0) return res.status(409).json(conflict_errors)

	await updateCharacter(id, null, flattenResults(results))
	res.status(200).json({})
}

export type UpdateAction = Readonly<{
	action: UpdateActionCode
	property: string
	value?: any
}>
