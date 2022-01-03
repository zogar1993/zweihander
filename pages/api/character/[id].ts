// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getCharacterSheetOfId } from "@core/actions/GetCharacterSheetOfId"
import getMongoDBClient from "@core/utils/GetMongoDBClient"
import { ObjectId } from "mongodb"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
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
		//TODO sanitize this with business rules
		res.status(200)
	}
}

async function get(req: NextApiRequest, res: NextApiResponse) {
	{
		const { id } = req.query
		if (Array.isArray(id)) {
			res.status(500)
			return
		}
		const client = await getCharacterSheetOfId(id)
		res.status(200).json(client)
	}
}
