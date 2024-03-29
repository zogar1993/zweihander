import { Profession } from "@core/domain/types/Profession"
import { getEntries } from "@core/utils/CacheUtils"

export default async function getProfessions() {
	return getEntries<Profession>("profession")
}
