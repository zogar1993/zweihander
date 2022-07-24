import { useCharacterSheetState } from "@web/components/character_sheet/CharacterSheetContext"
import CharacterSheetTier from "@web/components/character_sheet/professions/CharacterSheetTier"
import theme from "@web/theme/theme"
import React from "react"
import styled from "styled-components"

export default function CharacterSheetProfessionProfile() {
	const {
		character: { profession_profile }
	} = useCharacterSheetState()

	return (
		<Container>
			<CharacterSheetTier name="Basic" tier={profession_profile.profession1} />
			<CharacterSheetTier
				name="Intermediate"
				tier={profession_profile.profession2}
			/>
			<CharacterSheetTier
				name="Advanced"
				tier={profession_profile.profession3}
			/>
		</Container>
	)
}

const Container = styled.div`
	grid-area: profession_profile;
	display: grid;
	gap: ${theme.spacing.separation};
	grid-template-columns: repeat(4, 1fr);
`
