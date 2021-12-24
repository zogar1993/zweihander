import { MagicSchool } from "@core/domain/MagicSchool"
import { getEntries } from "@core/utils/CacheUtils"

export default async function getMagicSchools() {
	return await getEntries<MagicSchool>("magic_school")
}
