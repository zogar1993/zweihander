import { useCharacterSheetState } from "@web/components/character_sheet/CharacterSheetContext"
import theme from "@web/theme/theme"
import { CircularNumberInput, Dots } from "misevi"
import React from "react"
import styled from "styled-components"

export default function CharacterSheetAttributes() {
	const { character } = useCharacterSheetState()
	return (
		<AttributesSection>
			{character.attributes.map(attribute => (
				<Attribute key={attribute.code}>
					<Name>{attribute.name}</Name>
					<CircularNumberInput value={attribute.base} />
					<Dots value={attribute.advances} total={6}
								coloring={({ value, number }) => {
									if (attribute.profession_advances >= number && number > value)
										return "palegreen"
								}}/>
					<BonusContainer>
						<span>bonus</span>
						<span>{attribute.bonus}</span>
					</BonusContainer>
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
	align-items: center;
`

const Name = styled.span`
	font-size: 16px;
`

const BonusContainer = styled.div``
