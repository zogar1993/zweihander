// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import getMongoDBClient from "@core/utils/GetMongoDBClient"
import { ObjectId } from "mongodb"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "PATCH") {
		res.status(404)
		return
	}
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
