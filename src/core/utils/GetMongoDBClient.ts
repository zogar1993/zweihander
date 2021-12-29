import { MongoClient } from "mongodb"
const {ATLAS_DB_USERNAME, ATLAS_DB_PASSWORD, ATLAS_CLUSTER_URL, ATLAS_DB_NAME} = process.env
const uri = `mongodb+srv://${ATLAS_DB_USERNAME}:${ATLAS_DB_PASSWORD}@${ATLAS_CLUSTER_URL}?retryWrites=true&w=majority`;


export default async function getMongoDBClient() {
	const client = new MongoClient(uri);
	await client.connect()//TODO should this connect everytime or have a global created?
	return client.db(ATLAS_DB_NAME)
}