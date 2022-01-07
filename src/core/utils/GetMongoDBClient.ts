import { MongoClient } from "mongodb"

const {
	ATLAS_DB_USERNAME,
	ATLAS_DB_PASSWORD,
	ATLAS_CLUSTER_URL,
	ATLAS_DB_NAME
} = process.env
const uri = `mongodb+srv://${ATLAS_DB_USERNAME}:${ATLAS_DB_PASSWORD}@${ATLAS_CLUSTER_URL}?retryWrites=true&w=majority`

const client = new MongoClient(uri)
let connected = false

export default async function getMongoDBClient() {
	if (!connected) {
		await client.connect()
		connected = true
	}
	return client.db(ATLAS_DB_NAME)
}
