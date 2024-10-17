import { Weapon } from "@core/domain/types/Weapon"
import { getEntries } from "@core/utils/CacheUtils"

export default async function getWeapons() {
	return getEntries<Weapon>("weapon")
}