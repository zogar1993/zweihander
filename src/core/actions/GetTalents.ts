import { Talent } from "@core/domain/types/Talent"
import { getEntries } from "@core/utils/CacheUtils"

export default async function getTalents() {
	return getEntries<Talent>("talent")
}
