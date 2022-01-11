import { Alignment } from "@core/actions/GetAlignments"
import { Archetype } from "@core/actions/GetArchetypes"
import { Ancestry } from "@core/domain/Ancestry"
import { MagicSchool } from "@core/domain/MagicSchool"
import { Profession } from "@core/domain/Profession"
import { Talent } from "@core/domain/Talent"
import fetchCharacterOfId from "@web/api_calls/FetchCharacterOfId"
import CharacterSheetBio from "@web/components/character_sheet/bio/CharacterSheetBio"
import CharacterSheetAttributes from "@web/components/character_sheet/CharacterSheetAttributes"
import {
	ActionType,
	CharacterSheetContext,
	useCharacterSheetReducer
} from "@web/components/character_sheet/CharacterSheetContext"
import useEffectAsync from "@web/components/character_sheet/hooks/UseStateAsync"
import CharacterSheetMisc from "@web/components/character_sheet/misc/CharacterSheetMisc"
import CharacterSheetSkills from "@web/components/character_sheet/skills/CharacterSheetSkills"
import theme from "@web/theme/theme"
import { useRouter } from "next/router"
import React, { useEffect } from "react"
import styled from "styled-components"

export default function CharacterSheetScreen({
	characterId,
	...props
}: CharacterSheetScreenProps) {
	const router = useRouter()
	const [state, dispatch] = useCharacterSheetReducer()

	useEffect(() => {
		if (router.isFallback) return
		dispatch({
			type: ActionType.InitializeCollections,
			payload: { ...props }
		})
	}, [router.isFallback])

	useEffectAsync(async () => {
		if (router.isFallback) return
		const character = await fetchCharacterOfId(characterId)

		dispatch({
			type: ActionType.InitializeCharacterSheet,
			payload: character
		})
	}, [characterId])

	return (
		<CharacterSheetContext.Provider value={{ state, dispatch }}>
			<Layout>
				<CharacterSheetBio />
				<CharacterSheetAttributes />
				<CharacterSheetSkills />
				<CharacterSheetMisc />
			</Layout>
		</CharacterSheetContext.Provider>
	)
}

export const BLOCK_WIDTH = "255px"
export const DESKTOP_MAX_WIDTH = `calc((${BLOCK_WIDTH} * 4) + (${theme.spacing.separation} * 3))`

const Layout = styled.div`
  display: grid;
  width: ${DESKTOP_MAX_WIDTH};
  grid-template-columns: repeat(4, 1fr);
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
	characterId: string
	talents: Array<Talent>
	professions: Array<Profession>
	ancestries: Array<Ancestry>
	schools: Array<MagicSchool>
	archetypes: Array<Archetype>
	orderAlignments: Array<Alignment>
	chaosAlignments: Array<Alignment>
}

//TODO fix act warnings