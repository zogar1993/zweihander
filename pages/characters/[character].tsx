import { getAncestries } from "@core/actions/GetAncestries"
import { getCharacterSheetOfId } from "@core/actions/GetCharacterSheetOfId"
import getMagicSchools from "@core/actions/GetMagicSchools"
import getProfessions from "@core/actions/GetProfessions"
import getTalents from "@core/actions/GetTalents"
import { Ancestry } from "@core/domain/Ancestry"
import { SanitizedCharacterSheet } from "@core/domain/character_sheet/sanitization/SanitizeCharacterSheet"
import { MagicSchool } from "@core/domain/MagicSchool"
import { Profession } from "@core/domain/Profession"
import { Talent } from "@core/domain/Talent"
import CharacterSheetAttributes from "@web/components/character_sheet/CharacterSheetAttributes"
import CharacterSheetBio from "@web/components/character_sheet/CharacterSheetBio"
import { CharacterSheetContext, useCharacterSheetReducer } from "@web/components/character_sheet/CharacterSheetContext"
import CharacterSheetSkills from "@web/components/character_sheet/CharacterSheetSkills"
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
}) {
	const router = useRouter()
	const [state, dispatch] = useCharacterSheetReducer()

	useEffect(() => {
		if (router.isFallback) return
		dispatch({
			type: "initialize",
			payload: { ...props }
		})
	}, [props])

	return (
		<CharacterSheetContext.Provider value={{ state, dispatch }}>
			<Layout>
				<CharacterSheetBio />
				<CharacterSheetAttributes/>
				<CharacterSheetSkills/>
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
	return {
		props: {
			character,
			ancestries,
			talents,
			professions,
			schools
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
		"bio peril-tracker damage-tracker misc"
		"attributes skills skills misc";

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
