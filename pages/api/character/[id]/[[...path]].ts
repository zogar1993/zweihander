// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getCharacterSheetOfId } from "@core/actions/GetCharacterSheetOfId"
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

	if (!req.query.path)
		switch (req.method) {
			case "PATCH":
				return await patch(req, res)
			case "GET":
				return await get(req, res)
			default:
				res.status(404)
		}
	else
		switch (req.query.path[0]) {
			case "name": {
				const name = req.body
				await updateCharacter(id, { name: name })
				res.status(200)
			}
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
		//TODO Handle responses for failures
		res.status(200)
	}
}

async function change(
	id: string,
	patch: Record<string, any>,
	res: NextApiResponse
) {
	await updateCharacter(id, patch)
	//TODO sanitize this with business rules
	//TODO Handle responses for failures
	//TODO how to be atomic on mongodb
	res.status(200)
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
