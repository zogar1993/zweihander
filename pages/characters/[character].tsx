import getAlignments, { Alignment } from "@core/actions/GetAlignments"
import { getAncestries } from "@core/actions/GetAncestries"
import getArchetypes, { Archetype } from "@core/actions/GetArchetypes"
import { getCharacterSheetOfId } from "@core/actions/GetCharacterSheetOfId"
import getMagicSchools from "@core/actions/GetMagicSchools"
import getProfessions from "@core/actions/GetProfessions"
import getTalents from "@core/actions/GetTalents"
import { Ancestry } from "@core/domain/Ancestry"
import { SanitizedCharacterSheet } from "@core/domain/character_sheet/sanitization/SanitizeCharacterSheet"
import { MagicSchool } from "@core/domain/MagicSchool"
import { Profession } from "@core/domain/Profession"
import { Talent } from "@core/domain/Talent"
import CharacterSheetBio from "@web/components/character_sheet/bio/CharacterSheetBio"
import CharacterSheetAttributes from "@web/components/character_sheet/CharacterSheetAttributes"
import {
	ActionType,
	CharacterSheetContext,
	useCharacterSheetReducer
} from "@web/components/character_sheet/CharacterSheetContext"
import CharacterSheetSkills from "@web/components/character_sheet/skills/CharacterSheetSkills"
import theme from "@web/theme/theme"
import { useRouter } from "next/router"
import React, { useEffect } from "react"
import styled from "styled-components"

export default function CharactersScreen(props: {
	character: SanitizedCharacterSheet
	talents: Array<Talent>
	professions: Array<Profession>
	ancestries: Array<Ancestry>
	schools: Array<MagicSchool>
	archetypes: Array<Archetype>
	orderAlignments: Array<Alignment>
	chaosAlignments: Array<Alignment>
}) {
	const router = useRouter()
	const [state, dispatch] = useCharacterSheetReducer()

	useEffect(() => {
		if (router.isFallback) return
		dispatch({
			type: ActionType.Initialize,
			payload: { ...props }
		})
	}, [props])

	return (
		<CharacterSheetContext.Provider value={{ state, dispatch }}>
			<Layout>
				<CharacterSheetBio />
				<CharacterSheetAttributes />
				<CharacterSheetSkills />
			</Layout>
		</CharacterSheetContext.Provider>
	)
}

//TODO may need some more love, maybe even move to csr
export async function getStaticProps({ params: { character: id } }: any) {
	const character = await getCharacterSheetOfId(id)
	const ancestries = await getAncestries()
	const talents = await getTalents()
	const professions = await getProfessions()
	const schools = await getMagicSchools()
	const archetypes = await getArchetypes()
	const alignments = await getAlignments()
	return {
		props: {
			character,
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

export async function getStaticPaths() {
	return {
		paths: [],
		fallback: true
	}
}

export const BLOCK_WIDTH = "255px"
export const DESKTOP_MAX_WIDTH = `calc((${BLOCK_WIDTH} * 4) + (${theme.spacing.separation} * 3))`
//TODO SWR
const Layout = styled.div`
	display: grid;
	width: ${DESKTOP_MAX_WIDTH};
	grid-template-columns: repeat(4, 1fr);
	gap: ${theme.spacing.separation};
	grid-template-areas:
		"bio attributes attributes attributes"
		"bio skills skills skills";

	@media (max-width: 768px) {
		grid-template-columns: minmax(0, 1fr);
		width: 100%;
		grid-template-areas:
			"bio"
			"peril-tracker"
			"damage-tracker"
			"attributes"
			"skills"
			"misc";
	}
`
