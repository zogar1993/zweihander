import { Spell } from "../src/Spell"
import { getEntries } from "./utils/CacheUtils"

export default async function getMagicSpells(): Promise<Array<Spell>> {
	return await getEntries<Spell>("magic_spell")
}
