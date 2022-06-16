import { CalculatedSkill } from "@core/domain/character_sheet/CharacterSheet"
import {
	ActionType,
	useCharacterSheetDispatcher
} from "@web/components/character_sheet/CharacterSheetContext"
import useIsOwner from "@web/components/character_sheet/hooks/useIsOwner"
import theme from "@web/theme/theme"
import { Dots } from "misevi"
import styled from "styled-components"

export default function CharacterSheetSkill({
	skill
}: {
	skill: CalculatedSkill
}) {
	const dispatch = useCharacterSheetDispatcher()
	const isOwner = useIsOwner()

	return (
		<Container>
			<SkillName>{skill.name}</SkillName>
			<CenteredDots
				total={3}
				value={skill.ranks}
				onChange={value =>
					dispatch({
						type: ActionType.SetSkillRanks,
						payload: { skill: skill.code, value: value }
					})
				}
				coloring={({ value, number }) => {
					if (skill.profession_ranks >= number && number > value)
						return "palegreen"
				}}
				aria-label={`${skill.name} Ranks`}
				disabled={!isOwner}
			/>
			<span>{skill.chance}</span>
		</Container>
	)
}

const Container = styled.div`
	display: grid;
	grid-template-columns: 110px 1fr 18px;
	gap: ${theme.spacing.padding};

	@media (max-width: 768px) {
		div:nth-child(2) {
			visibility: hidden;
		}
	}
`

const SkillName = styled.span`
	white-space: pre;
`

const CenteredDots = styled(Dots)`
	justify-self: center;
`
