import { CalculatedSkill } from "@core/domain/character_sheet/CharacterSheet"
import {
	ActionType,
	useCharacterSheetDispatcher
} from "@web/components/character_sheet/CharacterSheetContext"
import { Dots } from "misevi"
import styled from "styled-components"

export default function CharacterSheetSkill({
	skill
}: {
	skill: CalculatedSkill
}) {
	const dispatch = useCharacterSheetDispatcher()
	return (
		<Container>
			<span>{skill.name}</span>
			<Dots
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
			/>
			<span>{skill.chance}</span>
		</Container>
	)
}

const Container = styled.div`
	display: grid;
	grid-template-columns: 1fr 60px 40px;
`
