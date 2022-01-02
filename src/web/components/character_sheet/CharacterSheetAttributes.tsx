import { useCharacterSheetState } from "@web/components/character_sheet/CharacterSheetContext"
import theme from "@web/theme/theme"
import { Dots, Field } from "misevi"
import React from "react"
import styled from "styled-components"

export default function CharacterSheetAttributes() {
	const { character } = useCharacterSheetState()
	//TODO field has broken typescript?
	return (
		<AttributesSection>
			{character.attributes.map(attribute => (
				<Attribute key={attribute.code}>
					<Name>{attribute.name}</Name>
					<Field label="" type="number" value={attribute.base}/>
					<BonusContainer>
						<span>bonus</span>
						<span>{attribute.bonus}</span>
					</BonusContainer>
					<Dots value={attribute.profession_advances} total={6}/>
				</Attribute>
			))}
		</AttributesSection>
	)
}

const AttributesSection = styled.div`
	grid-area: attributes;
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	gap: ${theme.spacing.separation};
`

const Attribute = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.separation};
`

const Name = styled.span`
	font-size: 16px;
`

const BonusContainer = styled.div`
`