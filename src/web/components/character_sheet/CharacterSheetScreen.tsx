import { Alignment } from "@core/actions/GetAlignments"
import { Archetype } from "@core/actions/GetArchetypes"
import { Ancestry } from "@core/domain/Ancestry"
import { SanitizedCharacterSheet } from "@core/domain/character_sheet/sanitization/SanitizeCharacterSheet"
import { MagicSchool } from "@core/domain/MagicSchool"
import { Profession } from "@core/domain/Profession"
import { Talent } from "@core/domain/Talent"
import CharacterSheetBio from "@web/components/character_sheet/bio/CharacterSheetBio"
import CharacterSheetAttributes from "@web/components/character_sheet/CharacterSheetAttributes"
import CharacterSheetConfirmationModal from "@web/components/character_sheet/CharacterSheetConfirmationModal"
import {
	ActionType,
	CharacterSheetContext,
	useCharacterSheetReducer
} from "@web/components/character_sheet/CharacterSheetContext"
import CharacterSheetMisc from "@web/components/character_sheet/misc/CharacterSheetMisc"
import CharacterSheetSkills from "@web/components/character_sheet/skills/CharacterSheetSkills"
import theme from "@web/theme/theme"
import React, { useEffect } from "react"
import styled from "styled-components"

export default function CharacterSheetScreen(props: CharacterSheetScreenProps) {
	const [state, dispatch] = useCharacterSheetReducer(props)

	useEffect(() => {
		const handler = (event: any) => {
			if (event.ctrlKey && event.key === "z")
				dispatch({ type: ActionType.UndoLastAction })
		}
		document.addEventListener("keydown", handler)
		return () => document.removeEventListener("keydown", handler)
	}, [])

	return (
		<CharacterSheetContext.Provider value={{ state, dispatch }}>
			<CharacterSheetConfirmationModal />
			<Layout>
				<CharacterSheetBio />
				<CharacterSheetAttributes />
				<CharacterSheetSkills />
				<CharacterSheetMisc />
			</Layout>
		</CharacterSheetContext.Provider>
	)
}
export const BLOCK_WIDTH = "276px"
export const DESKTOP_MAX_WIDTH = `calc((${BLOCK_WIDTH} * 4) + (${theme.spacing.separation} * 3))`

const Layout = styled.div`
	display: grid;
	width: ${DESKTOP_MAX_WIDTH};
	grid-template-columns: repeat(4, 1fr);
	grid-template-rows: 87px 395px;
	max-height: 486px;
	gap: ${theme.spacing.separation};
	grid-template-areas:
		"bio attributes attributes attributes"
		"bio skills skills misc";

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

export type CharacterSheetScreenProps = {
	character: SanitizedCharacterSheet
	talents: Array<Talent>
	professions: Array<Profession>
	ancestries: Array<Ancestry>
	schools: Array<MagicSchool>
	archetypes: Array<Archetype>
	orderAlignments: Array<Alignment>
	chaosAlignments: Array<Alignment>
}
