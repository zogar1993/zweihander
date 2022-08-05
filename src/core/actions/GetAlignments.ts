import { Alignment } from "@core/domain/types/Alignment"
import { getEntries } from "@core/utils/CacheUtils"

export default async function getAlignments() {
	return getEntries<Alignment>("alignment")
}

