import getMagicSources from "@core/actions/GetMagicSources"

export default async function getMagicSchools() {
	const sources = await getMagicSources()
	return sources.flatMap(source => source.schools)
}
