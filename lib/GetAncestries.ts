import { Ancestry } from "../src/Ancestry"
import { getEntries } from "./utils/CacheUtils"

export async function getAncestries() {
	return await getEntries<Ancestry>("ancestry")
}
