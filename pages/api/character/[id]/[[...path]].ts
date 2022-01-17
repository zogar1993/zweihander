// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getCharacterSheetOfId } from "@core/actions/GetCharacterSheetOfId"
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

//TODO P1 sanitize this with business rules
//TODO P1 Handle responses for failures
//TODO P1 how to be atomic on mongodb
//TODO P1 add authentication
//TODO P1 add undo redo
//TODO P1 clean and refactor tests
//TODO P1 add trackers
//TODO P1 add journal
//TODO P1 add settings
//TODO P2 config SWC to replace Babel https://github.com/ixartz/Next-js-Boilerplate/issues/20
//TODO P2 do skeleton for characters

async function get(req: NextApiRequest, res: NextApiResponse) {
	const { id } = req.query
	if (Array.isArray(id)) {
		res.status(500)
		return
	}
	const client = await getCharacterSheetOfId(id)
	res.status(200).json(client)
}
