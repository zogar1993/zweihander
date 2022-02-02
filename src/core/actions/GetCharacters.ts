import getMongoDBClient from "@core/utils/GetMongoDBClient"

export async function getCharacters() {
	const client = await getMongoDBClient()
	const result = await client
		.collection("CHARACTERS")
		.find(
			{},
			{
				projection: {
					name: 1,
					ancestry: 1,
					profession1: 1,
					profession2: 1,
					profession3: 1,
					thumbnail: 1,
					created_by: 1,
					"settings.visibility": 1
				}
			}
		)
		.toArray()

	return result.map(({ _id, thumbnail, ...x }) => ({
		...x,
		id: _id.toString(),
		avatar: thumbnail || null,
		ancestry: toTitle(x.ancestry),
		profession1: toTitle(x.profession1),
		profession2: toTitle(x.profession2),
		profession3: toTitle(x.profession3),
		created_by: x.created_by || null,
		visibility: x.settings?.visibility || null
	}))
}

function toTitle(value: string | null) {
	if (!value) return null
	return value
		.split("_")
		.filter(x => x.length > 0)
		.map(x => x[0].toUpperCase() + x.substring(1))
		.join(" ")
}
