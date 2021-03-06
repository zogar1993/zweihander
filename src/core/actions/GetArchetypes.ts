import { getEntries } from "@core/utils/CacheUtils"

export default async function getArchetypes() {
	return getEntries<Archetype>("archetype")
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
