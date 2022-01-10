import getAlignments, { Alignment } from "@core/actions/GetAlignments"
import { getAncestries } from "@core/actions/GetAncestries"
import getArchetypes, { Archetype } from "@core/actions/GetArchetypes"
import getMagicSchools from "@core/actions/GetMagicSchools"
import getProfessions from "@core/actions/GetProfessions"
import getTalents from "@core/actions/GetTalents"
import { Ancestry } from "@core/domain/Ancestry"
import { MagicSchool } from "@core/domain/MagicSchool"
import { Profession } from "@core/domain/Profession"
import { Talent } from "@core/domain/Talent"
import CharacterSheetScreen from "@web/components/character_sheet/CharacterSheetScreen"
import React from "react"

export default function CharacterScreen(props: {
	characterId: string
	talents: Array<Talent>
	professions: Array<Profession>
	ancestries: Array<Ancestry>
	schools: Array<MagicSchool>
	archetypes: Array<Archetype>
	orderAlignments: Array<Alignment>
	chaosAlignments: Array<Alignment>
}) {
	return <CharacterSheetScreen {...props} />
}

export async function getStaticProps({
	params: { character: characterId }
}: any) {
	const ancestries = await getAncestries()
	const talents = await getTalents()
	const professions = await getProfessions()
	const schools = await getMagicSchools()
	const archetypes = await getArchetypes()
	const alignments = await getAlignments()
	return {
		props: {
			characterId,
			ancestries,
			talents,
			professions,
			schools,
			archetypes,
			orderAlignments: alignments.filter(x => x.type === "order"),
			chaosAlignments: alignments.filter(x => x.type === "chaos")
		}
	}
}

//TODO this fallback may not be best, check how it works in this case
export async function getStaticPaths() {
	return {
		paths: [],
		fallback: true
	}
}
