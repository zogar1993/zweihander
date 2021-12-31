import { getEntries } from "@core/utils/CacheUtils"

export default async function getAlignments() {
	return getEntries<Alignment>("alignment")
}

export type Alignment = {
	name: string
	code: string
	description: string
	partner: string
	from: number
	to: number
	type: string
}
