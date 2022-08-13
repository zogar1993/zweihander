import CharacterSheetTier from "@web/components/character_sheet/professions/CharacterSheetTier"
import UniqueAdvances from "@web/components/character_sheet/professions/UniqueAdvances"
import theme from "@web/theme/theme"
import React from "react"
import styled from "styled-components"

export default function CharacterSheetProfessionProfile() {
	return (
		<Container>
			<CharacterSheetTier i={0} />
			<CharacterSheetTier i={1} />
			<CharacterSheetTier i={2} />
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
