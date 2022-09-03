import { ConditionTrack } from "@core/domain/character_sheet/CharacterSheet"
import useIsCharacterSheetOwner from "@web/components/character_sheet/hooks/UseIsCharacterSheetOwner"
import theme from "@web/theme/theme"
import { RadioButton } from "misevi"
import React from "react"
import styled from "styled-components"

export default function CharacterSheetConditionTracker({
	conditions,
	condition,
	type,
	onChange
}: {
	conditions: ReadonlyArray<{ name: string; code: number }>
	condition: ConditionTrack
	type: string
	onChange: (value: number) => void
}) {
	return (
		<ThresholdContainer>
			<Title>{type} Condition Track</Title>
			<ValuesContainer>
				<ConditionStepsContainer role="radiogroup" aria-label={`${type} Tracker`}>
					{conditions.map(x => {
						return (
							<ConditionStep
								value={x.code}
								selected={condition?.value === x.code}
								onChange={onChange}
								text={x.name}
								key={x.code}
							/>
						)
					})}
				</ConditionStepsContainer>
			</ValuesContainer>
		</ThresholdContainer>
		//TODO add these boxes
		//TODO make cleaner the dispatch
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
	const isOwner = useIsCharacterSheetOwner()
	return (
		<InputWrapper>
			<RadioButton
				value={value}
				checked={selected}
				onChange={onChange && (() => onChange(value))}
				aria-label={text}
				disabled={!isOwner}
			/>
			<Text>{text}</Text>
		</InputWrapper>
	)
}

const InputWrapper = styled.div`
	display: flex;
	gap: ${theme.spacing.padding};
`
