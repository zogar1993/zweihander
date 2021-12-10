import { MagicSource } from "@core/domain/MagicSource"
import { getEntries } from "@core/utils/CacheUtils"

export async function getMagicSources() {
	return await getEntries<MagicSource>("magic_source")
}
