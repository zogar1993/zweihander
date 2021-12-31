import { useCharacterSheet } from "@web/components/character_sheet/CharacterSheetContext"
import theme from "@web/theme/theme"
import React from "react"
import styled from "styled-components"

export default function CharacterSheetAttributes() {
	const character = useCharacterSheet()
	return (
		<AttributesSection>
			{character.attributes.map(attribute => (
				<div key={attribute.code}>
					<span>{attribute.name}</span>
					<span>{attribute.base}</span>
					<span>"bonus"</span>
					<span>{attribute.bonus}</span>
				</div>
			))}
		</AttributesSection>
	)
}

const AttributesSection = styled.div`
	grid-area: attributes;
	display: flex;
	flex-direction: column;
	gap: ${theme.spacing.separation};
`
