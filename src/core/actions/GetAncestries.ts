import { Ancestry } from "@core/domain/Ancestry"
import { getEntries } from "@core/utils/CacheUtils"

export async function getAncestries() {
	return await getEntries<Ancestry>("ancestry")
}
