import CharacterSheetAttribute from "@web/components/character_sheet/CharacterSheetAttribute"
import { useCharacterSheetState } from "@web/components/character_sheet/CharacterSheetContext"
import CharacterSheetSkills from "@web/components/character_sheet/skills/CharacterSheetSkills"
import theme from "@web/theme/theme"
import React from "react"
import styled from "styled-components"

export default function CharacterSheetAttributes() {
	const { character } = useCharacterSheetState()

	return (
		<AttributesBackground>
			<AttributesSection>
				{character.attributes.map(attribute => (
					<React.Fragment key={attribute.code}>
						<CharacterSheetAttribute attribute={attribute} />
						<CharacterSheetSkills skills={attribute.skills} />
					</React.Fragment>
				))}
			</AttributesSection>
		</AttributesBackground>
	)
}

const AttributesSection = styled.div`
	display: grid;
	flex-direction: column;
	justify-content: space-evenly;
	gap: ${theme.spacing.separation};
	grid-template-columns: repeat(2, 1fr);

	div:nth-child(1) {
		border-top-left-radius: ${theme.borders.radius};
	}

	div:nth-child(2) {
		border-top-right-radius: ${theme.borders.radius};
	}

	div:nth-last-child(2) {
		border-bottom-left-radius: ${theme.borders.radius};
	}

	div:nth-last-child(1) {
		border-bottom-right-radius: ${theme.borders.radius};
	}
`

const AttributesBackground = styled.div`
	grid-area: attributes;
	background-color: ${theme.colors.border};
	border: ${theme.spacing.separation} ${theme.colors.border} solid;
	border-radius: ${theme.borders.radius};
`
