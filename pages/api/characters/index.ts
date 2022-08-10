import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0"
import createCharacter from "@core/actions/CreateCharacter"
import { getCharacters } from "@core/actions/GetCharacters"
import sanitizeCharacterSheet from "@core/domain/character_sheet/sanitization/SanitizeCharacterSheet"
import type { NextApiRequest, NextApiResponse } from "next"

export default withApiAuthRequired(
	async (req: NextApiRequest, res: NextApiResponse) => {
		const session = await getSession(req, res)
		if (!session) return res.status(401).end()
		const username = session.user.email

		if (!req.query.path)
			switch (req.method) {
				case "GET":
					const characters = await getCharacters(username)

					const results = characters.map(character => ({
						...character,
						created_by: username === character.created_by
					}))

					return res.status(200).json(results)
				case "POST":
					const creation_time = new Date().toISOString()
					const id = await createCharacter(
						sanitizeCharacterSheet({
							created_by: username,
							created_at: creation_time,
							updated_at: creation_time
						})
					)
					return res.status(201).json(`/characters/${id}`)
				default:
					return res.status(405).end()
			}
	}
)
