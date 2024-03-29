import { MagicSource } from "@core/domain/types/MagicSource"
import { getEntries } from "@core/utils/CacheUtils"

export default async function getMagicSources() {
	return await getEntries<MagicSource>("magic_source")
}
