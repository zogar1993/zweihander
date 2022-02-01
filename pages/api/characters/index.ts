// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0"
import createCharacter from "@core/actions/CreateCharacter"
import { getCharacters } from "@core/actions/GetCharacters"
import sanitizeCharacterSheet from "@core/domain/character_sheet/sanitization/SanitizeCharacterSheet"
import type { NextApiRequest, NextApiResponse } from "next"

export default withApiAuthRequired(async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const username = await getSession(req, res)!.user.nickname

	if (!req.query.path)
		switch (req.method) {
			case "GET":
				return await getHandler(username, res)
			case "POST":
				return await postHandler(username, res)
			default:
				res.status(405)
		}
})

async function postHandler(user: string, res: NextApiResponse) {
	const id = await createCharacter(sanitizeCharacterSheet({ created_by: user }))
	res.status(201).json(`"/characters/${id}"`)
}

async function getHandler(user: string, res: NextApiResponse) {
	const characters = await getCharacters()
	res.status(200).json(characters)
}
