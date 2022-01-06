import { getMagicSources } from "@core/actions/GetMagicSources"

export default async function getMagicSchools() {
	const sources = await getMagicSources()
	const wea = sources.flatMap(source => source.schools)
	console.log("out", sources.length)
	console.log("out flat", wea.length)
	return wea
}
