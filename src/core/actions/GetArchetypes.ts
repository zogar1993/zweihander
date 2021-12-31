import { Talent } from "@core/domain/Talent"
import { getEntries } from "@core/utils/CacheUtils"

export default async function getArchetypes() {
	return getEntries<Talent>("archetype")
}
export type Book = "Zweihänder" | "Main Gauche"
export type Archetype = {
	name: string
	code: string
	from: number
	to: number
	professions: Record<Book, Array<ArchetypeProfession>>
}

export type ArchetypeProfession = {
	profession: string
	from: number
	to: number
}
