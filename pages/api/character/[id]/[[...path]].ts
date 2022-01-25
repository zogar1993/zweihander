// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import getCharacterSheetOfId from "@core/actions/GetCharacterSheetOfId"
import getMongoDBClient from "@core/utils/GetMongoDBClient"
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

	if (!req.query.path)
		switch (req.method) {
			case "PATCH":
				return await patch(req, res)
			case "GET":
				return await get(req, res)
			default:
				res.status(404)
		}
}

async function patch(req: NextApiRequest, res: NextApiResponse) {
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

//TODO P1 add settings
//TODO P1 add trackers
//TODO P1 do skeleton for characters
//TODO P1 add create character
//TODO P1 add delete character

//TODO P1 visual glitch on css first paint (may be related to https://github.com/styled-components/styled-components/issues/1860)

//TODO P1 talents with ' have a bad name (like Arbalest'S Speed)
//TODO P3 add magic spells modal

//TODO P1 make hierarchies of talents for professions
//TODO P3 Remove used options from tag inputs
//TODO P3 check for strict experience expenditure

//TODO P2 Handle responses for failures
//TODO P2 add authentication
//TODO P3 how to be atomic on mongodb

//TODO P4 check that SWR is used correctly
//TODO P4 check this works correctly https://github.com/vercel/next.js/issues/30802
//TODO P4 check this linting issue https://stackoverflow.com/questions/69061240/nextjs-importing-next-document-outside-of-pages-document-error

async function get(req: NextApiRequest, res: NextApiResponse) {
	const { id } = req.query
	if (Array.isArray(id)) {
		res.status(500)
		return
	}
	const client = await getCharacterSheetOfId(id)
	res.status(200).json(client)
}
