import {
	ActionType,
	useCharacterSheetDispatcher,
	useCharacterSheetState
} from "@web/components/character_sheet/CharacterSheetContext"
import theme from "@web/theme/theme"
import { CircularNumberInput, Dots } from "misevi"
import React from "react"
import styled from "styled-components"

export default function CharacterSheetAttributes() {
	const { character } = useCharacterSheetState()
	const dispatch = useCharacterSheetDispatcher()
	return (
		<AttributesSection>
			{character.attributes.map(attribute => (
				<Attribute key={attribute.code}>
					<Name>{attribute.name}</Name>
					<CircularNumberInput
						value={attribute.base}
						onBlur={value =>
							dispatch({
								type: ActionType.SetAttributeBase,
								payload: { attribute: attribute.code, value: value }
							})
						}
						min={28}
						max={55}
						aria-label={`${attribute.name} Base`}
					/>
					<Dots
						value={attribute.advances}
						total={6}
						coloring={({ value, number }) => {
							if (attribute.profession_advances >= number && number > value)
								return "palegreen"
						}}
						onChange={value =>
							dispatch({
								type: ActionType.SetAttributeAdvancements,
								payload: { attribute: attribute.code, value: value }
							})
						}
						aria-label={`${attribute.name} Advances`}
					/>
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
