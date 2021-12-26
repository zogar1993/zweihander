// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
const {MongoClient} = require('mongodb');

const {ATLAS_DB_USERNAME, ATLAS_DB_PASSWORD, ATLAS_CLUSTER_URL, ATLAS_DB_NAME} = process.env
const uri = `mongodb+srv://${ATLAS_DB_USERNAME}:${ATLAS_DB_PASSWORD}@${ATLAS_CLUSTER_URL}?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Array<any>>
) {
	await client.connect();
	const result = await client.db(ATLAS_DB_NAME).collection("CHARACTERS")
		.find({}, {projection: {name: 1, ancestry: 1, profession1: 1, thumbnail: 1}}).toArray()

	res.status(200).json(result)
}
