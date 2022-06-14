import CharacterSheetAttribute from "@web/components/character_sheet/CharacterSheetAttribute"
import { useCharacterSheetState } from "@web/components/character_sheet/CharacterSheetContext"
import CharacterSheetSkills from "@web/components/character_sheet/skills/CharacterSheetSkills"
import theme from "@web/theme/theme"
import React from "react"
import styled from "styled-components"

export default function CharacterSheetAttributes() {
	const { character } = useCharacterSheetState()

	return (
		<AttributesSection>
			{character.attributes.map(attribute => (
				<React.Fragment key={attribute.code}>
					<CharacterSheetAttribute attribute={attribute} />
					<CharacterSheetSkills skills={attribute.skills} />
				</React.Fragment>
			))}
		</AttributesSection>
	)
}

const AttributesSection = styled.div`
	grid-area: attributes;
	display: grid;
	flex-direction: column;
	justify-content: space-evenly;
	gap: ${theme.spacing.separation};
	grid-template-columns: repeat(2, 1fr);
`
