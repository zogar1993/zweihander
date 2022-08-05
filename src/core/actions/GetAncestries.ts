import { Ancestry } from "@core/domain/types/Ancestry"
import { getEntries } from "@core/utils/CacheUtils"

export default async function getAncestries() {
	return await getEntries<Ancestry>("ancestry")
}
