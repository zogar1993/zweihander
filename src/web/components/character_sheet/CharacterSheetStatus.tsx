import {
	ConditionTrack,
	Peril
} from "@core/domain/character_sheet/CharacterSheet"
import { useCharacterSheetState } from "@web/components/character_sheet/CharacterSheetContext"
import CharacterSheetAlignment from "@web/components/character_sheet/misc/CharacterSheetAlignment"
import Grid from "@web/components/general/Grid"
import theme from "@web/theme/theme"
import React from "react"
import styled from "styled-components"

export default function CharacterSheetStatus() {
	const { character } = useCharacterSheetState()
	return (
		<StatusContainer>
			<CharacterSheetStats />
			<Corruption />
			<ConditionTracker
				conditions={PERIL_CONDITIONS}
				condition={character.peril}
				type="Peril"
			/>
			<ConditionTracker
				conditions={DAMAGE_CONDITIONS}
				condition={character.damage}
				type="Damage"
			/>
		</StatusContainer>
	)
}

function ConditionTracker({
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

function Corruption() {
	return (
		<ThresholdContainer>
			<CharacterSheetAlignment />
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
const StatusContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${theme.spacing.separation};
`

const ConditionStepsContainer = styled.span`
	display: flex;
	flex-direction: column;
	gap: ${theme.spacing.separation};
`

export function ConditionStep({
	text,
	onChange,
	selected,
	value
}: PropsConditionStep) {
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

interface PropsConditionStep {
	value: number
	text: string
	onChange?: (value: number) => void
	selected: boolean
}

export const PERIL_CONDITIONS = [
	{ code: Peril.Unhindered, name: "UNHINDERED" },
	{ code: Peril.Imperiled, name: "Imperiled" },
	{ code: Peril.Ignore1SkillRank, name: "Ignore 1 Skill Rank" },
	{ code: Peril.Ignore2SkillRank, name: "Ignore 2 Skill Ranks" },
	{ code: Peril.Ignore3SkillRank, name: "Ignore 3 Skill Ranks" },
	{ code: Peril.Incapacitated, name: "INCAPACITATED!" }
]

export const DAMAGE_CONDITIONS = [
	{ code: 0, name: "UNHARMED" },
	{ code: 1, name: "Lightly Wounded" },
	{ code: 2, name: "Moderately Wounded" },
	{ code: 3, name: "Seriously Wounded" },
	{ code: 4, name: "Grievously Wounded" },
	{ code: 5, name: "SLAIN!" }
]

function CharacterSheetStats() {
	const { character } = useCharacterSheetState()
	return (
		<Grid columns={3}>
			<BoxedNumber name="Initiative" value={character.initiative} />
			<BoxedNumber name="Movement" value={character.movement} />
			<BoxedNumber name="Max. Focuses" value={character.maximum_focuses} />
			<BoxedNumber name="Max. Langs." value={character.maximum_languages} />
			<BoxedNumber name="Enc. Limit" value={character.encumbrance_limit} />
			<BoxedNumber name="Experience" value={character.spent_experience} />
		</Grid>
	)
}

const BoxedNumber = ({ name, value }: { name: string; value: number }) => {
	return (
		<Container>
			<BoxText>{name}</BoxText>
			<BoxNumber>{value}</BoxNumber>
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 56px;
	border: solid ${theme.colors.border} ${theme.spacing.separation};
	padding: ${theme.spacing.padding} 0;
	gap: ${theme.spacing.separation};
	border-radius: ${theme.borders.radius};
`

const BoxText = styled.span`
	font-size: 12px;
`

const BoxNumber = styled.span`
	font-family: ${theme.fonts.handwritten};
`
