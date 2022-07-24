import { ConditionTrack } from "@core/domain/character_sheet/CharacterSheet"
import {
	ActionType,
	useCharacterSheetDispatcher
} from "@web/components/character_sheet/CharacterSheetContext"
import theme from "@web/theme/theme"
import { RadioButton } from "misevi"
import React from "react"
import styled from "styled-components"

export default function CharacterSheetConditionTracker({
	conditions,
	condition,
	type
}: {
	conditions: Array<{ name: string; code: number }>
	condition: ConditionTrack
	type: string
}) {
	const dispatch = useCharacterSheetDispatcher()
	return (
		<ThresholdContainer>
			<Title>{type} Condition Track</Title>
			<ValuesContainer>
				<ConditionStepsContainer>
					{conditions.map(x => {
						return (
							<ConditionStep
								value={x.code}
								selected={condition?.value === x.code}
								onChange={value =>
									dispatch({
										type: ActionType.SetPerilCondition,
										payload: value
									})
								}
								text={x.name}
								key={x.code}
							/>
						)
					})}
				</ConditionStepsContainer>
			</ValuesContainer>
		</ThresholdContainer>
		//TODO add these boxes
		//	<FlexItem>
		//		<Threshold value={condition?.threshold} />
		//	</FlexItem>
	)
}

const ThresholdContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	border: ${theme.spacing.separation} solid ${theme.colors.border};
	padding: ${theme.spacing.padding};
	gap: ${theme.spacing.separation};
	border-radius: ${theme.borders.radius};
`

const Title = styled.span`
	padding: ${theme.spacing.separation};
	font-size: 20px;
	justify-self: center;
`

const ValuesContainer = styled.div`
	width: 100%;
`

const Text = styled.span``
const ConditionStepsContainer = styled.span`
	display: flex;
	flex-direction: column;
	gap: ${theme.spacing.separation};
`

function ConditionStep({
	text,
	onChange,
	selected,
	value
}: {
	value: number
	text: string
	onChange?: (value: number) => void
	selected: boolean
}) {
	return (
		<InputWrapper role="radiogroup">
			<RadioButton
				value={value}
				checked={selected}
				onChange={onChange && (() => onChange(value))}
				aria-label={text}
			/>
			<Text>{text}</Text>
		</InputWrapper>
	)
}

const InputWrapper = styled.div`
	display: flex;
	gap: ${theme.spacing.padding};
`
