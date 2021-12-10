import { MagicSchool } from "@core/domain/MagicSchool"
import { getEntries } from "@core/utils/CacheUtils"

export default async function getMagicSchools() {
	return await getEntries<MagicSchool>("magic_school")
}

//TODO move this elsewhere
//return schools.map(({source, name, code}) => ({source, name, code, spells: spells.filter((x: Spell) => x.school === name).map(({id}: { id: string }) => ({
//		"sys": {
//			"type": "Link",
//			"linkType": "Entry",
//			"id": id
//		}}))}))
