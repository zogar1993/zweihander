import { ConditionTrack } from "@core/domain/character_sheet/CharacterSheet"
import theme from "@web/theme/theme"
import React from "react"
import styled from "styled-components"

//TODO Fix styling and functionality of these
export default function CharacterSheetConditionTracker({
	conditions,
	condition,
	type
}: {
	conditions: Array<{ name: string; code: number }>
	condition: ConditionTrack
	type: string
}) {
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
								//onChange={condition?.setValue}
								text={x.name}
								key={x.code}
							/>
						)
					})}
				</ConditionStepsContainer>
			</ValuesContainer>
		</ThresholdContainer>
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
		<InputWrapper>
			<input
				type="radio"
				value={value}
				checked={selected}
				onChange={onChange && (() => onChange(value))}
			/>
			<Text>{text}</Text>
		</InputWrapper>
	)
}

const InputWrapper = styled.span`
	display: flex;
	gap: ${theme.spacing.padding};
`
