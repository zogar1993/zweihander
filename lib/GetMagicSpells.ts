import {Spell} from "../src/Spell"
import {getEntries} from "./utils/CacheUtils"

export default async function getMagicSpells() {
	return await getEntries<Spell>("magic_spell")
}
