import { CalculatedAttribute } from "@core/domain/character_sheet/CharacterSheet"
import {
	ActionType,
	useCharacterSheetDispatcher
} from "@web/components/character_sheet/CharacterSheetContext"
import useIsOwner from "@web/components/character_sheet/hooks/useIsOwner"
import theme from "@web/theme/theme"
import { CircularNumberInput, Dots } from "misevi"
import React from "react"
import styled from "styled-components"

export default function CharacterSheetAttribute({
	attribute
}: {
	attribute: CalculatedAttribute
}) {
	const dispatch = useCharacterSheetDispatcher()
	const isOwner = useIsOwner()

	return (
		<Attribute>
			<Name>{attribute.name}</Name>
			<FormsContainer>
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
					disabled={!isOwner}
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
					rows={3}
					aria-label={`${attribute.name} Advances`}
					disabled={!isOwner}
				/>
				<BonusContainer>
					<span>bonus</span>
					<span>{attribute.bonus}</span>
				</BonusContainer>
			</FormsContainer>
		</Attribute>
	)
}

const Attribute = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${theme.spacing.separation};
	align-items: center;
`

const Name = styled.span`
	font-size: 20px;
`

const FormsContainer = styled.div`
	display: flex;
	gap: ${theme.spacing.separation};
	width: 100%;
	justify-content: center;
	align-items: center;
`

const BonusContainer = styled.div`
	display: flex;
	flex-direction: column;
`
