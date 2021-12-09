import { MagicSource } from "../src/MagicSource"
import { getEntries } from "./utils/CacheUtils"

export async function getMagicSources() {
	return await getEntries<MagicSource>("magic_source", {
		links: ["schools"],
		resources: ["icon"],
	})
}
