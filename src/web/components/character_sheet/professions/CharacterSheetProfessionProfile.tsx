import { useCharacterSheetState } from "@web/components/character_sheet/CharacterSheetContext"
import CharacterSheetTier from "@web/components/character_sheet/professions/CharacterSheetTier"
import UniqueAdvances from "@web/components/character_sheet/professions/UniqueAdvances"
import theme from "@web/theme/theme"
import React from "react"
import styled from "styled-components"

export default function CharacterSheetProfessionProfile() {
	const { character: { profession_profile } } = useCharacterSheetState()

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
			<UniqueAdvances />
		</Container>
	)
}

const Container = styled.div`
  grid-area: profession_profile;
  display: grid;
  gap: ${theme.spacing.separation};
  grid-template-columns: repeat(4, 1fr);

  @media (max-width: 768px) {
    grid-template-columns: minmax(0, 1fr);
    width: 100%;
    grid-template-areas:
			"bio"
			"attributes"
			"skills"
			"status"
			"profession_profile"
			"misc";
    max-height: none;
  }
`
