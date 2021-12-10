import { Spell } from "@core/domain/Spell"
import { getEntries } from "@core/utils/CacheUtils"

export default async function getMagicSpells(): Promise<Array<Spell>> {
	return await getEntries<Spell>("magic_spell")
}
