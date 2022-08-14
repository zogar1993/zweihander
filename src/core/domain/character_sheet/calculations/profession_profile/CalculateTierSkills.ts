import {
	classifyExpendituresReducer,
	PROFESSION_EXPENDITURE_DEFAULT
} from "@core/domain/character_sheet/calculations/profession_profile/reducers"
import { ProfessionTech } from "@core/domain/character_sheet/CharacterSheet"
import { SkillCode } from "@core/domain/skill/SkillCode"

export default function calculateTierSkills({ character, professions }: {
	character: CharacterSheet, professions: ReadonlyArray<Profession>
}) {
	return professions
		.map(getProfessionSkills)
		.reduce(classifyExpendituresReducer, {
			...PROFESSION_EXPENDITURE_DEFAULT,
			expenditures: getSkillExpenditures(character)
		})
}

const getSkillExpenditures = (character: CharacterSheet) =>
	Object.entries(character.skills).flatMap(([code, value]) =>
		Array.from(Array(value.ranks), () => code))

const getProfessionSkills = (profession: Profession) =>
	profession.advances.skill_ranks.map(code => code)

type Profession = { advances: Pick<ProfessionTech["advances"], "skill_ranks"> }
type CharacterSheet = { skills: Record<SkillCode, { ranks: number }> }