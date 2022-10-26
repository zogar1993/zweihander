import {ConditionTrack} from "@core/domain/character_sheet/CharacterSheet"
import useIsCharacterSheetOwner from "@web/components/character_sheet/hooks/UseIsCharacterSheetOwner"
import theme from "@web/theme/theme"
import {RadioButton} from "misevi"
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
			<Boxes>
				<Box>
					<BoxText>Threshold</BoxText>
					<Threshold>{condition?.threshold}</Threshold>
				</Box>
				<Box>
					<BoxText>+6</BoxText>
					<Threshold>{condition?.threshold + 6}</Threshold>
				</Box>
				<Box>
					<BoxText>+12</BoxText>
					<Threshold>{condition?.threshold + 12}</Threshold>
				</Box>
				<Box>
					<BoxText>+18</BoxText>
					<Threshold>{condition?.threshold + 18}</Threshold>
				</Box>
			</Boxes>
		</ThresholdContainer>
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

const Threshold = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 1px ${theme.colors.border};
  height: 40px;
  width: 40px;
  font-family: ${theme.fonts.handwritten};
`

const BoxText = styled.span`
  font-size: 12px;
`

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Boxes = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`