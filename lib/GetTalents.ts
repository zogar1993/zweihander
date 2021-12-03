import {Talent} from "../src/Talent"
import {getEntries} from "./utils/CacheUtils"

export default async function getTalents() {
	return getEntries<Talent>("talent")
}
