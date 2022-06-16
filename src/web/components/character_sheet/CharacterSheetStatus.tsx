import {
	ConditionTrack,
	Peril
} from "@core/domain/character_sheet/CharacterSheet"
import { useCharacterSheetState } from "@web/components/character_sheet/CharacterSheetContext"
import CharacterSheetAlignment from "@web/components/character_sheet/misc/CharacterSheetAlignment"
import theme from "@web/theme/theme"
import styled from "styled-components"

export default function CharacterSheetStatus() {
	const { character } = useCharacterSheetState()
	return (
		<Wea>
			<ConditionTrackWea
				conditions={PERIL_CONDITIONS}
				condition={character.peril}
				type="Peril"
			/>
			<ConditionTrackWea
				conditions={DAMAGE_CONDITIONS}
				condition={character.damage}
				type="Damage"
			/>
			<Corruption />
		</Wea>
	)
}

function ConditionTrackWea({
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
const Wea = styled.div`
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
